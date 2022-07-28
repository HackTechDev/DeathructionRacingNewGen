class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textures, callback) {
        super(scene, x, y, textures.out);

        this.scene = scene;

        this.setInteractive()
            .on('pointerdown', () => callback());
    }

};


class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    create() {
        this.add.image(600, 350, 'startScreen');

        this.add.existing(new Button(
            this, 600, 520,
            {
                out: 'startBtn'
            },
            () => { this.scene.start('Game') })
        );
    }
}

export { Menu };
