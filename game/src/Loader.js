class Loader extends Phaser.Scene {
    constructor() {
        super({key: 'Loader'});
    }

    preload() {
        this.load.image('startScreen', 'assets/startscreen.png');
        this.load.image('deathScreen', 'assets/deathscreen.png');

        this.load.image('startBtn', 'assets/startBtn.png');

        this.load.image('grass', 'assets/land_grass11.png');

        this.load.image('car1', 'assets/car_black_small_5.png');
        this.load.image('car2', 'assets/car_red_small_5.png');

        this.load.image('man1', 'assets/character_black_blue.png');
        this.load.image('man2', 'assets/character_black_red.png');

        this.load.image('cone1', 'assets/cone_straight.png');
        this.load.image('cone2', 'assets/cone_down.png');

        this.load.image('tire1', 'assets/tires_red_alt.png');
        this.load.image('tire2', 'assets/tires_red.png');
        this.load.image('tire3', 'assets/tires_white_alt.png');
        this.load.image('tire4', 'assets/tires_white.png');

        this.load.image('box', 'assets/box-item-boxed.png');
        this.load.image('blood', 'assets/blood.png');

    }

    create() {
        this.scene.start('Menu');
    }
}

export { Loader };
