import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import candidates from "./routes/candidates.routes.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());

server.use(candidates);

const port = process.env.PORT
console.log(port, 'PORT')
server.listen(port, () => { console.log(`Listening on port ${port}`) });