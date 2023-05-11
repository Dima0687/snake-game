import { Router } from 'express';
import { 
  getTopXHighscores, 
  createHighscore,
  deleteHighscoresNotInTopX
} from '../controller/highscore.controller.js';
const router = Router();

router.route("/highscores")
  .post(getTopXHighscores)
  .put(createHighscore)
  .delete(deleteHighscoresNotInTopX)

export default router;