const INITIAL_VELOCITY = 100;

export default class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setBounce(1);

        this.velX = INITIAL_VELOCITY;
        this.velY = INITIAL_VELOCITY;
        this.body.setVelocity(this.velX, this.velY);
        
    }
}