import { Router } from "express";
import fs from "fs";

const skip = ["index"];
let pathDir = `${__dirname}`;

const router = Router();

fs.readdirSync(pathDir).forEach((file) => {
  let nameFile = file.split(".").shift();

  if (!skip.includes(nameFile as string)) {
    let familyRoutes = require(`./${nameFile}`);
    router.use(`/${nameFile}`, familyRoutes);
  }
});

export default router;
