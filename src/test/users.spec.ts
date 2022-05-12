import { ListUsers } from "./utils/usersHelper";
import { PrismaClient } from "@prisma/client";
import request from "supertest";
import server from "../config/server";

const supertest = request(server);
const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.user.deleteMany({});
});

describe("POST /users", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  test("Should return new User", async () => {
    const response = await supertest.post("/api/users").send(ListUsers[0]);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body.content).toEqual(
      expect.objectContaining({
        name: ListUsers[0].name,
        username: ListUsers[0].username,
      })
    );
    expect(response.body.error).toEqual(null);
  });

  test("Should return a error in the body and null in content if missing data",async()=>{
    const response=await supertest.post("/api/users").send({
        name:"Dreck" //missing data 🤷‍♂️
    });
    expect(response.body.error).toEqual("Missing data or incorrect data");
    expect(response.body.content).toEqual(null);
  });

  test("Should return error if already exist",async()=>{
    await supertest.post("/api/users").send(ListUsers[0]);
    const responseTwo=await supertest.post("/api/users").send(ListUsers[0]);
    expect(responseTwo.body.error).toBe("User already exists");
  });
});
