import Paddle from "../Features/paddle";
import Ball from "../Features/ball";
import GameOverBar from "../Features/gameoverBar";
import { Game } from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super();
        this.config = config;
        this.player = null;
        this.ball = null;
        this.score = null;
        //This is just the text that displays the player's lifes 
        this.lifeScore = null;
        this.gameOverText = null;
    }

    //Awake
    preload(){
        this.load.image("background", "assets/Backgrounds/final_01.png");
        this.load.image("paddle", "assets/main_paddle.png");
        this.load.image("ball", "assets/ball.png");
        this.load.image("red_ball", "assets/red_ball.png");

        this.load.image("blue_full", "assets/Blue_Brick/blue_brick_full.png");
        this.load.image("blue_mid", "assets/Blue_Brick/blue_brick_mid.png");
        this.load.image("blue_low", "assets/Blue_Brick/blue_brick_low.png");

        this.load.image("green_full","assets/Green_Brick/green_brick_full.png");
        this.load.image("green_mid", "assets/Green_Brick/green_brick_mid.png");
        this.load.image("green_low", "assets/Green_Brick/green_brick_low.png");

        this.load.image("orange_full","assets/Orange_Brick/orange_brick_full.png");
        this.load.image("orange_mid", "assets/Orange_Brick/orange_brick_mid.png");
        this.load.image("orange_low", "assets/Orange_Brick/orange_brick_low.png");

        this.load.image("purple_full","assets/Purple_Brick/purple_brick_full.png");
        this.load.image("purple_mid", "assets/Purple_Brick/purple_brick_mid.png");
        this.load.image("purple_low", "assets/Purple_Brick/purple_brick_low.png");

        this.load.image("red_full","assets/Red_Brick/red_brick_full.png");
        this.load.image("red_mid", "assets/Red_Brick/red_brick_mid.png");
        this.load.image("red_low", "assets/Red_Brick/red_brick_low.png");

        this.load.image("yellow_full","assets/Yellow_Brick/yellow_brick_full.png");
        this.load.image("yellow_mid", "assets/Yellow_Brick/yellow_brick_mid.png");
        this.load.image("yellow_low", "assets/Yellow_Brick/yellow_brick_low.png");

        this.load.bitmapFont("tl_font", 'assets/Fonts/Teletactile_file_0.png', 'assets/Fonts/Teletactile_file.fnt');
    }

    create(){
        this.add.image(0, 0, "background").setOrigin(0);
        this.player = new Paddle(this, this.config.width / 2, 450, "yellow_full");
        this.ball = new Ball(this, this.config.width / 2, 420, "red_ball");
        this.gameOverBar = new GameOverBar(this, this.config.width / 2, 495, "ball");

        this.lifeScore = this.add.bitmapText(30,440, "tl_font", '');
        this.lifeScore.setScale(0.5);

        this.score = this.add.bitmapText(360,20, 'tl_font', '');
        this.score.setScale(0.5);

        this.gameOverText = this.add.bitmapText(this.config.width / 2 - 200, this.config.height / 2, 'tl_font', 'GAME OVER\n\nPress R to restart');
        this.gameOverText.setCenterAlign();
        this.gameOverText.visible = false;

        this.physics.add.collider(this.player, this.ball, this.changeVelocity, null, this);
        this.physics.add.collider(this.ball, this.gameOverBar, this.gameOver, null, this);

        this.input.keyboard.on("keydown-R", function(){
            console.log("restart scene");
            this.scene.restart();
        }, this);
    }

    update(){
        this.lifeScore.text = `LIFES: ${this.player.lifes.toFixed(0)}`;
        this.score.text = `SCORE: ${this.player.points.toFixed(0)}`;
    }

    gameOver(){
        if(this.player.lifes > 0){
            this.player.lifes -= 1;
            console.log("Player lost a life");
            console.log("Remaining lifes: " + this.player.lifes);
        }
        if(this.player.lifes == 0){
            this.player.canMove = false;
            this.ball.reset();
            this.gameOverText.visible = true;
            console.log("Player lost");
        }
    }
}