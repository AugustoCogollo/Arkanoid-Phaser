import Phaser, { Game, Scene } from "phaser";
import GameScene from "./Scenes/game-scene";

const SHARED_CONFIG = {
  width: 800,
  height: 480,
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade",
    arcade:{
      gravity: {y: 0},
      debug: true
    }
    },
    scene: [new GameScene(SHARED_CONFIG)]
  }

var game = new Phaser.Game(config);