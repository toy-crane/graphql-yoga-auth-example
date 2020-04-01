import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });
const PORT = process.env.PORT;
console.log(PORT);
