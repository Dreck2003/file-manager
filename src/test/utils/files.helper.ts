import request from "supertest";
import server from "../../config/server";
export const supertest = request(server);

export const createUsersForToken = async (user: any) => {
  const response = await supertest.post("/api/users").send(user);
  console.log("respuesta: ", response.body);

  return response.body.content.token;
};

// const request = {};
