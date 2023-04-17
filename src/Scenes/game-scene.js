import Paddle from "../Features/paddle";
import Ball from "../Features/ball";
import GameOverBar from "../Features/gameoverBar";
import { Game } from "phaser";
import Score from "../Features/score";
import soundManager from "../Features/soundManager";

const BACKGROUND_IMAGE_KEY = "background";
const PADDLE_IMAGE_KEY = "paddle";

const BALL_BLACK_IMAGE_KEY = "ball";
const BALL_RED_IMAGE_KEY = "red_ball";

const BRICK_BLUE_FULL_KEY = "blue_full";
const BRICK_BLUE_MID_KEY =  "blue_mid";
const BRICK_BLUE_LOW_KEY =  "blue_low";

const BRICK_GREEN_FULL_KEY = "green_full";
const BRICK_GREEN_MID_KEY =  "green_mid";
const BRICK_GREEN_LOW_KEY =  "green_low";

const BRICK_ORANGE_FULL_KEY = "orange_full";
const BRICK_ORANGE_MID_KEY =  "orange_mid";
const BRICK_ORANGE_LOW_KEY =  "orange_low";

const BRICK_PURPLE_FULL_KEY = "purple_full";
const BRICK_PURPLE_MID_KEY =  "purple_mid";
const BRICK_PURPLE_LOW_KEY =  "purple_low";

const BRICK_RED_FULL_KEY = "red_full";
const BRICK_RED_MID_KEY =  "red_mid";
const BRICK_RED_LOW_KEY =  "red_low";

const BRICK_YELLOW_FULL_KEY = "yellow_full";
const BRICK_YELLOW_MID_KEY =  "yellow_mid";
const BRICK_YELLOW_LOW_KEY =  "yellow_low";

const TELETACTILE_FONT_KEY = "teletactile_font";

const HIT_WALL_BALL_SOUND = "hit_wall_ball";
const HIT_LOSE_LIFE_SOUND = "hit_lose_life";
const HIT_PLAYER_BALL_SOUND = "hit_player_ball";
const HIT_BRICK_BALL_SOUND_1 = "hit_brick_player_1";
const HIT_BRICK_BALL_SOUND_2 = "hit_brick_player_2";

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

        this.hit_wall_sound = null;
        this.loselife_sound = null;
        this.hit_player_ball = null;
        this.hit_brick_sound_1 = null;
        this.hit_brick_sound_2 = null;
    }

    //Awake
    preload(){
        this.load.image(BACKGROUND_IMAGE_KEY, "assets/Backgrounds/final_01.png");
        this.load.image(PADDLE_IMAGE_KEY, "assets/main_paddle.png");
        this.load.image(BALL_BLACK_IMAGE_KEY, "assets/ball.png");
        this.load.image(BALL_RED_IMAGE_KEY, "assets/red_ball.png");

        this.load.image(BRICK_BLUE_FULL_KEY, "assets/Blue_Brick/blue_brick_full.png");
        this.load.image(BRICK_BLUE_MID_KEY, "assets/Blue_Brick/blue_brick_mid.png");
        this.load.image(BRICK_BLUE_LOW_KEY, "assets/Blue_Brick/blue_brick_low.png");

        this.load.image(BRICK_GREEN_FULL_KEY,"assets/Green_Brick/green_brick_full.png");
        this.load.image(BRICK_GREEN_MID_KEY, "assets/Green_Brick/green_brick_mid.png");
        this.load.image(BRICK_GREEN_LOW_KEY, "assets/Green_Brick/green_brick_low.png");

        this.load.image(BRICK_ORANGE_FULL_KEY,"assets/Orange_Brick/orange_brick_full.png");
        this.load.image(BRICK_ORANGE_MID_KEY, "assets/Orange_Brick/orange_brick_mid.png");
        this.load.image(BRICK_ORANGE_LOW_KEY, "assets/Orange_Brick/orange_brick_low.png");

        this.load.image(BRICK_PURPLE_FULL_KEY,"assets/Purple_Brick/purple_brick_full.png");
        this.load.image(BRICK_PURPLE_MID_KEY, "assets/Purple_Brick/purple_brick_mid.png");
        this.load.image(BRICK_PURPLE_LOW_KEY, "assets/Purple_Brick/purple_brick_low.png");

        this.load.image(BRICK_RED_FULL_KEY,"assets/Red_Brick/red_brick_full.png");
        this.load.image(BRICK_RED_MID_KEY, "assets/Red_Brick/red_brick_mid.png");
        this.load.image(BRICK_RED_LOW_KEY, "assets/Red_Brick/red_brick_low.png");

        this.load.image(BRICK_YELLOW_FULL_KEY,"assets/Yellow_Brick/yellow_brick_full.png");
        this.load.image(BRICK_YELLOW_MID_KEY, "assets/Yellow_Brick/yellow_brick_mid.png");
        this.load.image(BRICK_YELLOW_LOW_KEY, "assets/Yellow_Brick/yellow_brick_low.png");

        this.load.bitmapFont({
            key: TELETACTILE_FONT_KEY,
            textureURL: "/assets/Fonts/teletactile_0.png",
            fontDataURL: "/assets/Fonts/teletactile.fnt"
        });

        this.load.audio(HIT_WALL_BALL_SOUND, "assets/Audio/Arkanoid_SFX_(1).wav");
        this.load.audio(HIT_LOSE_LIFE_SOUND, "assets/Audio/Arkanoid_SFX_(3).wav");
        this.load.audio(HIT_PLAYER_BALL_SOUND, "assets/Audio/Arkanoid_SFX_(6).wav");
        this.load.audio(HIT_BRICK_BALL_SOUND_1, "assets/Audio/Arkanoid_SFX_(7).wav");
        this.load.audio(HIT_BRICK_BALL_SOUND_2, "assets/Audio/Arkanoid_SFX_(8).wav");
    }

    create(){
        this.add.image(0, 0, BACKGROUND_IMAGE_KEY).setOrigin(0);
        this.player = new Paddle(this, this.config.width / 2, 450, PADDLE_IMAGE_KEY);
        this.ball = new Ball(this, this.config.width / 2, 420, BALL_RED_IMAGE_KEY);
        this.score = new Score(this, this.config.width / 2, 32, TELETACTILE_FONT_KEY);
        this.sounds = new soundManager(this);
        
        this.gameOverText = this.add.bitmapText(this.config.width / 2 - 250, this.config.height / 2, TELETACTILE_FONT_KEY, 'GAME OVER\n\nPress R to restart');
        this.gameOverText.setCenterAlign();
        this.gameOverText.visible = false;

        this.physics.add.collider(this.player, this.ball, this.ballCollidesWithPlayer, null, this);

        this.input.keyboard.on("keydown-R", function(){
            this.scene.restart();
        }, this);

        this.physics.world.on('worldbounds', (body, up, down, left, right) =>
        {
            const { gameObject } = body;

            if (up) { this.sounds.ballHitWall(); }
            else if (down) { this.gameOver(); }
            else if (left) { this.sounds.ballHitWall(); }
            else if (right) { this.sounds.ballHitWall(); }
        });
    }

    update(){

    }

    ballCollidesWithPlayer(){
        this.sounds.ballHitPlayer();
    }

    gameOver(){
        if(this.player.lifes > 0){
            this.player.lifes -= 1;
            this.sounds.ballHitBottom();
        }

        if(this.player.lifes == 0){
            this.player.canMove = false;
            this.ball.reset();
            this.gameOverText.visible = true;
        }
    }
}