
class GameOver extends Phaser.Scene {
    constructor() {
        super({key: 'GameOver'});
var chronoText;
    }

    init(data) {
      this.chrono = data.chrono;
    }

    create () {
        this.add.image(600, 350, 'deathScreen');

        this.add.sprite(600, 520, 'startBtn')
            .setInteractive().on('pointerdown', () => {
                this.scene.start('Game');
            });


        this.chronoText = this.add.text(200, 200, "Chrono: " + this.chrono , {
          fontSize: "24px",
          fill: "#FFFFFF" //Couleur de l'écriture
        });
        this.chronoText.setScrollFactor(0);


    }
}

export { GameOver };
