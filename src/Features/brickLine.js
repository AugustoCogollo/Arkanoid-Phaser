

export default class BrickLine {
    constructor(scene, xPos, yPos, stepInX, stepInY, score, brickImage, layer){
        this.scene = scene;
        this.group = this.scene.physics.add.group({
            key: brickImage,
            repeat: 10,
            setXY: {
                x: xPos,
                y: yPos,
                stepX: stepInX,
                stepY: stepInY,
            },
            "setScale.x": 2,
            "setScale.y": 1,
            immovable: true,
            allowGravity: false,
            
        });
        this.score = score;
        //layer.add(this.group);
    }

    getGroup(){
        return this.group;
    }
}
