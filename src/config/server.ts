import express from "express";
import router from "../routes/index";
import morgan from "morgan";

const server = express();
server.use(morgan("dev"));
server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use("/api", router);

export default server;
