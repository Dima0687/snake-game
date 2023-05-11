import { isGameRunning, stopMovement } from './input.js';
import {
  gameEndMenu as gameWinGUI,
  toggleMenuVisibility,
  roundEnded,
} from './interface.js';

const gameWinTitle = document.querySelector('[data-game-win-title]');

export function showWinGUI() {
  if(isGameRunning()) {
    toggleMenuVisibility({ 
      elem: gameWinGUI
    });
    toggleMenuVisibility({
      elem: gameWinTitle,
      title: true,
    })
  }
  roundEnded();
  stopMovement();
}