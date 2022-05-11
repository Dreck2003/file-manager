import express from "express";
// import router from "../routes/index";

const server = express();
server.use(express.json());
// server.use("/api", router);

export default server;
