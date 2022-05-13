import { response } from "express";

export const handleError = (
  res = response,
  error: string | any,
  code = 403
) => {
  res.status(code);
  return res.json({ error: error, content: null });
};
