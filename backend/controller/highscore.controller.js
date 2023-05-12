import { StatusCodes } from 'http-status-codes';
import HighscoreModel from '../model/Highscore.model.js'

export async function getTopXHighscores(req, res, next) {
  try {
    const topXPlayerArray = await HighscoreModel.getTopXPlayer(req.body);
    
    res.status(StatusCodes.OK).send(topXPlayerArray);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
}

export async function createHighscore(req, res, next) {
  try {
    if(
      !Object.keys(req.body).length ||
      !req.body.hasOwnProperty("name") ||
      !req.body.hasOwnProperty("date") ||
      !req.body.hasOwnProperty("color") ||
      !req.body.hasOwnProperty("points")
    ) {
      throw new Error("Please provide necessary information about highscore!");
    }

    await HighscoreModel.create(req.body);
   
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
}

export async function deleteHighscoresNotInTopX(req, res, next) {
  try {
    const { acknowledged } = await HighscoreModel.delPlayerNotInTopX(req.body);

    if(acknowledged) {
      res.sendStatus(StatusCodes.OK);
      return;
    }
    res.sendStatus(StatusCodes.BAD_REQUEST);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
}