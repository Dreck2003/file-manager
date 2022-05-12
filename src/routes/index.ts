/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from "express";
import fs from "fs";

const skip = ["index"];
const pathDir = `${__dirname}`;

const router = Router();

fs.readdirSync(pathDir).forEach((file) => {
	const nameFile = file.split(".").shift();
	if (!skip.includes(nameFile as string)) {
		const familyRoutes = require(`./${nameFile}`);
		router.use(`/${nameFile}`, familyRoutes);
	}
});

export default router;
