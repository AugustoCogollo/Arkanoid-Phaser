const HORIZONTAL_VELOCITY = 300;

export default class Paddle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.input.keyboard.on("keydown-A", this.moveLeft, this);
        scene.input.keyboard.on("keydown-D", this.moveRight, this);
        scene.input.keyboard.on("keyup", this.resetSpeed, this);
    }

    moveLeft(){
        this.body.velocity.x = -HORIZONTAL_VELOCITY;
    }

    moveRight(){
        this.body.velocity.x = HORIZONTAL_VELOCITY;
    }

    resetSpeed(){
        this.body.velocity.x = 0;
    }
}