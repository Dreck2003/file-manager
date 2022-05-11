import { response } from "express";

export const handleError = (res = response, message: string, code = 403) => {
	res.status(code);
	return res.json({ error: message, content: null });
};
