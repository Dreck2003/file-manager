// import { ListUsers } from "./utils/usersHelper";
import { PrismaClient } from "@prisma/client";
import { supertest } from "./utils/files.helper";

const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.user.deleteMany({});
});

describe("GET /files", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  test("Should return error if we want create File without a token", async () => {
    const response = await supertest.post("/api/files");
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Not token");
  });

  //   test("Should return a error if ");
});
