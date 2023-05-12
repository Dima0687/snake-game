import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors';
import corsOptions from './config/cors.config.js'
import db from "./utils/db.js";
import highscoreRouter from './routes/highscore.routes.js';

// env variables
const MONGO_DB_USER = process.env.MONGO_DB_USER_NAME;
const MONGO_DB_PW = process.env.MONGO_DB_USER_PW;
const MONGO_DB_CLUSTER = process.env.MONGO_DB_CLUSTER;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

// port on which the server runs
const port = process.env.PORT ?? 3000;

// create server
const app = express();

// cross origin 
app.use(cors(corsOptions));

// allow using json data
app.use(express.json());

// use router for routing
app.use(highscoreRouter);

// simple route for checking the server
app.use("/", (req, res) => {
  res.send("Server is running!")
})


// connect to database
db.connect(MONGO_DB_USER, MONGO_DB_PW, MONGO_DB_CLUSTER, MONGO_DB_NAME);

// start server and response on which port it runs
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});