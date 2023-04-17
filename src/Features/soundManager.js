const HIT_WALL_BALL_SOUND = "hit_wall_ball";
const HIT_LOSE_LIFE_SOUND = "hit_lose_life";
const HIT_PLAYER_BALL_SOUND = "hit_player_ball";
const HIT_BRICK_BALL_SOUND_1 = "hit_brick_player_1";
const HIT_BRICK_BALL_SOUND_2 = "hit_brick_player_2";

export default class soundManager {
    constructor(scene){
        this.scene = scene;

        this.hit_wall_sound = scene.sound.add(HIT_WALL_BALL_SOUND);
        this.loselife_sound =   scene.sound.add(HIT_LOSE_LIFE_SOUND);
        this.hit_player_ball =  scene.sound.add(HIT_PLAYER_BALL_SOUND);
        this.hit_brick_sound_1 = scene.sound.add(HIT_BRICK_BALL_SOUND_1);
        this.hit_brick_sound_2 = scene.sound.add(HIT_BRICK_BALL_SOUND_2);
    }

    ballHitPlayer(){
        this.hit_player_ball.play();
    }

    ballHitBrick(){
        var randNum = Phaser.Math.Between(0, 10);
        if(randNum <= 3)
            this.hit_player_ball.play();
        if(randNum > 4)
            this.hit_brick_sound_1.play();
    }

    ballHitWall(){
        this.hit_wall_sound.play();
    }

    ballHitBottom(){
        this.loselife_sound.play();
    }
}