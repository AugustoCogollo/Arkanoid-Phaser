import Paddle from "../Features/paddle";
import Ball from "../Features/ball";

export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super();
        this.config = config;
        this.player = null;
        this.ball = null;
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
    }

    create(){
        this.add.image(0, 0, "background").setOrigin(0);
        this.player = new Paddle(this, this.config.width / 2, 450, "yellow_full");
        this.ball = new Ball(this, this.config.width / 2, 420, "red_ball");
        this.physics.add.collider(this.player, this.ball, this.changeVelocity, null, this);
    }

    update(){
        if(this.ball.body.touching.down){
            this.ball.velY = this.ball.velY * -1;
        }
    }

    changeVelocity(){
        this.ball.velX *= -1;
    }

    gameOver(){
        alert("You lose");
        this.scene.restart();
      }
}