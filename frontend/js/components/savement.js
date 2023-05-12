import { createHighscoreList } from "./highscore.js";

let amountTopXPlayer = getComputedStyle(document.documentElement).getPropertyValue("--top-player-amount");
amountTopXPlayer = Number(amountTopXPlayer.match(/\d{1,}/).join());

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

export async function getHighscores({ amount = amountTopXPlayer, dir = -1, showOnly = "points name date color -_id" } = {}) {
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

    deleteHighscoresNotInTopX({ amount: amountTopXPlayer });

  } catch (error) {
    console.error(error);
  }
}

export async function deleteHighscoresNotInTopX({ amount = amountTopXPlayer, showOnly = "_id" } = {}) {
  await fetch(url, { 
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount,
      showOnly,
    })
  });
}