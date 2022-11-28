var map;
var player;
var cursors;
var groundLayer, coinLayer;


export default class SceneMiniera extends Phaser.Scene {

      constructor() {
          // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
          super("SceneMiniera");
      }

      init() {
          console.log("SceneMiniera - Executing init()");
          // Definiamo l'altezza del terreno pari all'altezza del riquadro
          // di gioco, per posizionare il giocatore sul fondo della schermata.
          this.floorHeight = this.game.config.height - 30;
          this.worldWidth = 10000;
      }

      preload() {
          console.log("SceneMiniera- Executing preload()");
          // map made with Tiled in JSON format
          this.load.tilemapTiledJSON('map', 'assets/map2.JSON');
          // tiles in spritesheet
          this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
          // player animations
          this.load.atlas('player', 'assets/player.png', 'assets/player.json');
      }

      create() {
        // carica mappa
        map = this.make.tilemap({key: 'map'});

        // tile dell terreno
        var groundTiles = map.addTilesetImage('tiles');
        // crea livello terreno
        groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        // il player collide
        groundLayer.setCollisionByExclusion([-1]);


        // confini mondo come terreno
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // creo lo sprite del player
        player = this.physics.add.sprite(10, 0, 'player');
        player.setBounce(0); // bounce dalle piattafomr
        player.setCollideWorldBounds(true); // collide coi confini del mondo

        // collide con le tile
        this.physics.add.collider(groundLayer, player);

        // animazione di cammino
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
            frameRate: 10,
            repeat: -1
        });
        // non animazione immobile
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'p1_stand'}],
            frameRate: 10,
        });


        cursors = this.input.keyboard.createCursorKeys();

        // confini mondo
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // la camera segue il player
        this.cameras.main.startFollow(player);
      }


      update() {
        if (cursors.left.isDown)
        {
            player.body.setVelocityX(-200);
            player.anims.play('walk', true); // walk left
            player.flipX = true; // flip the sprite to the left
        }
        else if (cursors.right.isDown)
        {
            player.body.setVelocityX(200);
            player.anims.play('walk', true);
            player.flipX = false; // use the original sprite looking to the right
        } else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
        // jump
        if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.setVelocityY(-350);
        }
      }




}
