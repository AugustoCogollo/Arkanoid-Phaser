export default class GameOver extends Phaser.GameObjects.Sprite {   
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(24, 1);
        this.body.immovable = true;
    }
}