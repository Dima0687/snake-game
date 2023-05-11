import { createHighscoreList } from "./highscore.js";

let sessionKeyForSound = "snake-sound";

// session storage for muted or not
export function setSessionData(data) {
  sessionStorage.setItem(sessionKeyForSound, data);
}

export function getSessionData() {
  let muted = sessionStorage.getItem(sessionKeyForSound);
  muted = muted === "true" ? true : false;
  return muted;
}


// save highscore on backend
const url = "/highscores";

export async function getHighscores({ amount = 10, dir = -1, showOnly = "points name date color -_id" } = {}) {
  try {
    const res = await fetch(url, {
      method: "POST",
      cors: "same-origin",
      cache: "no-cache",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        dir,
        showOnly
      })
    });

    if(!res.ok) {
      throw new Error("Couldn't fetch the highscore data, sorry!");
    }

    const highscoreJSON = await res.json();

    createHighscoreList(highscoreJSON);
  } catch (error) {
    console.error(error);
  }
}


export async function createHighscore({ name = "", date = "", points = 0, color = "" } = {}) {
  try {
    const res = await fetch(url, {
      method: "PUT",
      mode: "same-origin",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        date,
        points,
        color
      })
    });

    if(!res.ok) {
      throw new Error("Couldn't create a new highscore!");
    }

    deleteHighscoresNotInTopX();

  } catch (error) {
    console.error(error);
  }
}

export async function deleteHighscoresNotInTopX() {
  await fetch(url, { method: "DELETE" });
}