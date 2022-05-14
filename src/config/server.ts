import express from "express";
import router from "../routes/index";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "../docs/swagger";

const server = express();
server.use(morgan("dev"));
server.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use("/api", router);

export default server;
