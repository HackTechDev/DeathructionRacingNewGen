import 'phaser';

import { Loader } from './Loader.js';
import { Menu } from './Menu.js';
import { Game } from './Game.js';
import { GameOver } from './GameOver.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1200,
    height: 700,
    backgroundColor: '#838796',
    physics: {

        default: 'matter',
        matter: {
            debug: false,
            gravity: {
                x: 0,
                y: 0,
            }
        }
    },
    scene: [
        Loader,
        Menu,
        Game,
        GameOver,
    ]
}

new Phaser.Game(config);
