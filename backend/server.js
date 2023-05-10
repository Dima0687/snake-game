import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./utils/db.js";
import * as url from "url";
import path from "path";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// import { highscoreRouter } from './route/highscoreRouter.js';


// env variables
const MONGO_DB_USER = process.env.MONGO_DB_USER_NAME;
const MONGO_DB_PW = process.env.MONGO_DB_USER_PW;
const MONGO_DB_CLUSTER = process.env.MONGO_DB_CLUSTER;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
// create server
const app = express();
// port on which the server runs
const port = process.env.PORT ?? 3000;
// path to frontend
const frontend = path.join(__dirname, "..", "frontend");

// allow using json data
app.use(express.json());

// use static web site as view
app.use(express.static(frontend));

// use router for routing
// app.use(highscoreRouter);

export function startServer() {

db.connect(MONGO_DB_USER, MONGO_DB_PW, MONGO_DB_CLUSTER, MONGO_DB_NAME);
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}