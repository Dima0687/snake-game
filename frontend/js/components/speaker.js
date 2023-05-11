import { getSessionData, setSessionData } from './savement.js';
import { toggleMusicObjVolume } from './sound.js';

export let soundIsMuted = getSessionData() ?? false;

const speaker = document.querySelector('[data-speaker]');

// check on reload
soundIsMuted ? speaker.classList.add("mute") : speaker.classList.remove("mute");

speaker.addEventListener("pointerdown", toggleMute);

function toggleMute() {
  this.classList.toggle("mute");
  soundIsMuted = !soundIsMuted;
  
  setSessionData(soundIsMuted);
  toggleMusicObjVolume();
}