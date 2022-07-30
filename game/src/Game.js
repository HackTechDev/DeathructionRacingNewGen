class Car {
    constructor(scene, x, y) {
        this.ANGLE_DELTA = 0.1;

        this.SPEED = 0.1;

        this.scene = scene;

        const kind = Phaser.Math.RND.pick(['car1', 'car2']);
        this.body = this.scene.matter.add.image(x, y, kind);

        this.body.setFrictionAir(0.15)
            .setMass(30)
            .setScale(0.9)
            .setFixedRotation()
            .setAngularVelocity(0)
            .setVelocity(0, 0);

        this.body.body.label = 'car';
    }

    rotate(delta) {
        this.body.setAngularVelocity(delta);
    }

    rotateClockwise() {
        this.rotate(this.ANGLE_DELTA);
    }

    rotateCounterclockwise() {
        this.rotate(-this.ANGLE_DELTA);
    }

    goForward() {
        this.body.thrust(this.SPEED);
    }

    goBackward() {
        this.body.thrust(-this.SPEED);
    }
};

class Tire {
    constructor(scene, x, y) {
        this.scene = scene;

        const kind = Phaser.Math.RND.pick(
            ['tire1', 'tire2', 'tire3', 'tire4']);
        this.body = this.scene.matter.add.image(x, y, kind);

        this.body.body.label = 'tire';
        this.body.setBounce(0.3)
            .setMass(20)
            .setScale(0.5, 0.5)
            .setBody({type: 'circle', radius: 56 / 2 * 0.5});
    }
};


class Man {
    constructor(scene, x, y) {
        this.SPEED = 0.003;

        this.ANGLE_DELTA = 0.1;

        this.TURN_PAUSE = Phaser.Math.Between(1000, 3000);

        this.time = 0;

        this.scene = scene;

        this.isDead = false;

        const kind = Phaser.Math.RND.pick(['man1', 'man2']);
        this.body = this.scene.matter.add.image(x, y, kind);

        this.body.body.label = 'man';
  
        this.body.body.man = this;

        this.body.setBounce(1)
            .setMass(Phaser.Math.Between(7, 15))
            .setFrictionAir(0.1)
            .setScale(0.5, 0.5)
            .setAngle(Phaser.Math.Between(0, 360));
    }
    
    update(timeDelta) {
        this.body.thrust(this.SPEED);

        this.time += timeDelta;

        if (this.time > this.TURN_PAUSE) {
            this.time = 0;

            const i = Phaser.Math.Between(0, 100);
      
            if(!this.isDead) {
              if (i > 70) {
                  this.body.setAngle(Phaser.Math.Between(0, 360));
              }
              else if (i > 40) {
                  this.body.setAngle(Phaser.Math.Between(0, 360));
              }
            }
        }
    }


    dead () {
      console.log("Dead!");
      this.body.setTexture('blood');
      this.body.setStatic(true);
      this.isDead = true;
      this.body.enable = false;
      this.body.setCollisionCategory(0);
    }

};

class Cone {
    constructor(scene, x, y) {
        this.UP = 'cone1';
        this.DOWN = 'cone2';

        this.isUp = true;

        this.scene = scene;

        this.body = this.scene.matter.add.image(x, y, this.UP);

        this.body.body.label = 'cone';

        this.body.body.cone = this;

        this.body.setScale(0.5);
    }

    up () {
        this.isUp = true;
        this.body.setTexture('cone1');
    }

    down () {
        this.isUp = false;
        this.body.setTexture('cone2');
    }
};

class Game extends Phaser.Scene {
    constructor() {
        super({key: 'Game'});
    }

    create() {
        this.setBounds();


        this.createTexture();
        this.createTires();
        this.createMen();
        this.createCones();
        this.createCollisions();

        this.createWall();
        this.createCar();
        this.createInput();
    }

    setBounds() {
        this.matter.world.setBounds(0, 0, 1200, 700);
    }

    createWall() {
      this.matter.add.image(100, 100, 'box', null, { isStatic: true });
      this.matter.add.image(200, 200, 'box', null, { isStatic: true });
      this.matter.add.image(300, 300, 'box', null, { isStatic: true });   
    }

    createTexture() {
        this.add.tileSprite(600, 350, 1200, 700, 'grass');
    }

    createCar() {
        this.car = new Car(this, 600, 350);
    }

    createRandomObjects(ObjectClass, min, max) {
        const number = Phaser.Math.Between(min, max);

        let container = []; 
        for (let i = 0; i < number; i++) {
            const x = Phaser.Math.Between(30, 1170);
            const y = Phaser.Math.Between(30, 670);

            container.push(new ObjectClass(this, x, y));
        }

        return container;
    }

    createTires() {
        this.tires = this.createRandomObjects(Tire, 1, 10);
    }

    createMen() {
        this.men = this.createRandomObjects(Man, 10, 10);
    }

    createCones() {
        this.cones = this.createRandomObjects(Cone, 1, 10);
    }
    
    createCollisions() {
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach(pair => {
                const { bodyA, bodyB  } = pair;

                if (bodyA.label === 'car' && bodyB.label === 'cone') {
                    bodyB.cone.down();
                }
                else if (bodyA.label === 'cone' && bodyB.label === 'car') {
                    bodyA.cone.down();
                }

                else if (bodyA.label === 'man' && bodyB.label === 'cone') {
                    bodyB.cone.up();
                }
                else if (bodyA.label === 'cone' && bodyB.label === 'man') {
                    bodyA.cone.up();
                }
                
                else if (bodyA.label === 'car' && bodyB.label === 'man') {
                    bodyB.man.dead();
                }
                else if (bodyA.label === 'man' && bodyB.label === 'car') {
                    bodyA.man.dead();
                }
                



            });

            if (this.cones.filter(cone => cone.isUp).length === 0) {
                this.scene.start('GameOver');
            }
          
            if (this.men.filter(man => man.isDead).length === 10) {
                this.scene.start('GameOver');
            }
 

            console.log(this.men.filter(man => man.isDead).length);

        });
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.counterclockwise = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q);

        this.clockwise = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D);

        this.forward = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Z);

        this.backward = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S);

        [
            this.cursors.up, this.cursors.down, this.cursors.left,
            this.cursors.right, this.counterclockwise, this.clockwise,
            this.forward, this.backward,
        ].forEach(key => {
            key.reset();
        });
    }

    update(time, delta) {

        if (this.clockwise.isDown || this.cursors.right.isDown) {
            this.car.rotateClockwise();
        }
        else if (this.counterclockwise.isDown || this.cursors.left.isDown) {
            this.car.rotateCounterclockwise();
        }

        if (this.forward.isDown || this.cursors.up.isDown) {
            this.car.goForward();
        }
        else if (this.backward.isDown || this.cursors.down.isDown) {
            this.car.goBackward();
        }

        this.men.forEach(man => {
            man.update(delta)
        });
    }
}

export { Game };
