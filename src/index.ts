import server from "./config/server";

const PORT = process.env.PORT || 3001;
console.log(PORT);


server.listen(PORT, () => {
  console.log("Server is running in: ", PORT);
});
