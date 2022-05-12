import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
	DB: {
		PORT: process.env.DB_PORT,
		NAME: process.env.DB_NAME,
		USER: process.env.DB_USER,
	},
	PORT: process.env.PORT,
	AWS: {
		KEY: process.env.AWS_KEY,
		SECRET: process.env.AWS_SECRET,
		BUCKET: process.env.AWS_BUCKET,
	},
	EMAIL:{
		FROM:process.env.EMAIL_FROM,
		USER:process.env.EMAIL_USER,
		PASSWORD:process.env.EMAIL_PASSWORD
	}
};
