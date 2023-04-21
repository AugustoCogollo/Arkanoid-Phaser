const SCORE_LABEL = "1UP\n ";
const HIGH_SCORE_LABEL = "High Score\n ";
const HIGH_SCORE_SAVE_KEY = "high_score";

export default class Score {
    constructor(scene, x, y, font, layer) {
        this.scene = scene;
        this.currentScoreValue = 0;

        var loadedHighScore = parseInt(localStorage.getItem(HIGH_SCORE_SAVE_KEY));
        this.highScoreValue = isNaN(loadedHighScore) ? 0 : loadedHighScore;

        this.currentScoreText = scene.add.bitmapText(x - 100, y, font, SCORE_LABEL + this.currentScoreValue);
        this.currentScoreText.setCenterAlign();
        this.currentScoreText.setScale(0.5);

        this.highScoreText = scene.add.bitmapText(x,y, font, HIGH_SCORE_LABEL + this.highScoreValue);
        this.highScoreText.setCenterAlign();
        this.highScoreText.setScale(0.5);

        //layer.add(this.currentScoreText);
        //layer.add(this.highScoreText);
    }

    addScore(score){
        this.currentScoreValue += score;
        this.currentScoreText.setText(SCORE_LABEL + this.currentScoreValue);
    }

    checkHighScore(){
        if(this.currentScoreValue > this.highScoreValue){
            localStorage.setItem(HIGH_SCORE_SAVE_KEY, this.currentScoreValue);
        }
    }
}