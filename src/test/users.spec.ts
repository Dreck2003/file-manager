import { ListUsers } from "./utils/usersHelper";
import { PrismaClient } from "@prisma/client";
import request from "supertest";
import server from "../config/server";

const supertest = request(server);
const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.user.deleteMany({});
});

xdescribe("POST /users", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  test("Should return new User and token", async () => {
    const response = await supertest.post("/api/users").send(ListUsers[0]);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(Object.keys(response.body.content)).toEqual(
      expect.arrayContaining(["name", "username", "token"])
    );
    expect(response.body.error).toEqual(null);
  });

  test("Should return a error in the body and null in content if missing data", async () => {
    const response = await supertest.post("/api/users").send({
      name: "Dreck", //missing data 🤷‍♂️
    });
    expect(response.body.error).toEqual("Missing data or incorrect data");
    expect(response.body.content).toEqual(null);
  });

  test("Should return error if already exist", async () => {
    await supertest.post("/api/users").send(ListUsers[0]);
    const responseTwo = await supertest.post("/api/users").send(ListUsers[0]);
    expect(responseTwo.body.error).toBe("User already exists");
  });
});

xdescribe("LOGIN /users/login", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  test("Should return error if a user is not exist in database", async () => {
    const response = await supertest
      .post("/api/users/login")
      .send(ListUsers[0]);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body.error).toBe("User not exists");
    expect(response.body.content).toEqual(null);
  });

  test("Should return token if all is well", async () => {
    await supertest.post("/api/users").send(ListUsers[0]);
    const response = await supertest
      .post("/api/users/login")
      .send(ListUsers[0]);

    expect(response.body.error).toEqual(null);
    expect(typeof response.body.content.token).toBe("string");
  });
});
