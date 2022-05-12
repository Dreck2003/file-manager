import { response } from "express";

export const handleError = (res = response, error: string, code = 403) => {	
	res.status(code);
	return res.json({ error: error, content: null });
};
