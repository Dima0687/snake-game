import { playSound, playGameMusic } from "./sound.js";

const SPEED_UPS = [ 0, 50, 900, 15300, 168300, 1346400];
const COLOR_INDICATORS = [ "#0f0", "#33CCFF", "#ff0", "#f40", "#f00", "#90f"];
const pointsDisplays = document.querySelectorAll("[data-player-points]");

let hardGamePlayMusic = false;

export let pointsSetup = {
  currentSummend: 1,
  lastSummand: 1,
  speedFactor: 1,
  currentPoints: 0,
  newColor: COLOR_INDICATORS.at(0),
}

export function getCurrentPoints() {
  return pointsSetup.currentPoints;
}

export function getSpeedMultiplier() {
  return pointsSetup.speedFactor;
}

export function resetPoints() {
  resetHardPlayGameMusic();
  resetPointsSetup();
}

function resetPointsSetup() {
  pointsSetup = {
    currentSummend: 1,
    lastSummand: 1,
    speedFactor: 1,
    currentPoints: 0,
    newColor: COLOR_INDICATORS.at(0)
  }
}

function resetHardPlayGameMusic() {
  hardGamePlayMusic = false;
}

export function changeColor() {
  pointsSetup = SPEED_UPS.reduce((pointsSetup, val, index) => {
    const { currentPoints } = pointsSetup;
    if(currentPoints >= SPEED_UPS.at(-1)) {
      pointsSetup.newColor = COLOR_INDICATORS.at(-1);
      changePointsWeGet(SPEED_UPS.at(-1));
      return pointsSetup;
    }

    if(currentPoints >= val && currentPoints < SPEED_UPS.at(index + 1)){
      pointsSetup.newColor = COLOR_INDICATORS.at(index);
      if(index !== 0) changePointsWeGet(SPEED_UPS.at(index));
      return pointsSetup;
    };
    return pointsSetup;
  }, pointsSetup);

  document.documentElement.style.setProperty("--player-points-color", pointsSetup.newColor);

  return pointsSetup;
}


function changePointsWeGet(newBasisPoints) {
  pointsSetup.currentSummend = Math.floor(newBasisPoints / 10);
  if( pointsSetup.currentSummend !== pointsSetup.lastSummand ) {
    increaseSpeedFactor();
    pointsSetup.lastSummand = pointsSetup.currentSummend;
  }
  return pointsSetup;
}

function increaseSpeedFactor() {
  pointsSetup.speedFactor += 0.10;
  playSound("snake-level-up-sound");
}


export function increaseCurrentPoints() {
  pointsSetup.currentPoints += pointsSetup.currentSummend;

  if(pointsSetup.currentPoints >= SPEED_UPS.at(-2) && !hardGamePlayMusic) {
    hardGamePlayMusic = true;
    playGameMusic("game-speed-red-music");
  }
  playSound("snake-eaten-fruit-sound");

  pointsDisplays.forEach(pointsDisplay => pointsDisplay.textContent = getCurrentPoints());
}

export function update() {
  pointsSetup = changeColor();
}