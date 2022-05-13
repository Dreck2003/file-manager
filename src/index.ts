import { CONFIG } from "./config/process";
import server from "./config/server";

const PORT = CONFIG.PORT || 3001;
console.log(PORT);

server.listen(PORT, () => {
  console.log("Server is running in: ", PORT);
});
