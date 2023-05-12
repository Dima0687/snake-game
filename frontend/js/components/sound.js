import { soundIsMuted } from "./speaker.js";

const soundList = {
  'during-game-music': './assets/sounds/during-game-music.mp3',
  'game-speed-red-music': './assets/sounds/game-speed-red-music.mp3',
  'game-start-sound': './assets/sounds/game-start-sound.mp3',
  'game-over-sound': './assets/sounds/game-over-sound.mp3',
  'game-win-sound': './assets/sounds/game-win-sound.mp3',
  'snake-crash-sound': './assets/sounds/snake-crash-sound.wav',
  'snake-eaten-fruit-sound': './assets/sounds/snake-eaten-fruit-sound.mp3',
  'snake-level-up-sound': './assets/sounds/snake-level-up-sound.mp3',
}


let musicVolume = 0.15;
let soundVolume = 0.5;
let musicObj = null;
let soundObj = null;

export function stopSound(sound) {
  if(sound) {
    sound.pause();
    sound.currentTime = 0;
  }
}

export function playSound(key) {
  if(!soundIsMuted) {
    stopSound(soundObj);
    soundObj = new Audio( soundList[key] );
    soundObj.volume = soundVolume;
    soundObj.play();
  }
}

export function playGameMusic(key) {
  stopSound(musicObj);
  musicObj = new Audio( soundList[key] );
  musicObj.loop = true;
  if(soundIsMuted) {
    musicObj.volume = 0;
    musicObj.pause();
    return;
  }

  musicObj.volume = musicVolume;
  musicObj.play();
}

export function stopSoundOnMute() {
  stopSound(soundObj);
}

export function toggleMusicObjVolume() {
  if(!musicObj) return;

  if(soundIsMuted) {
    musicObj.volume = 0;
    return
  }

  musicObj.volume = musicVolume;
}

export function stopMusicObj() {
  stopSound(musicObj);
}