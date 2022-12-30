var map;
var player;
var cursors;
var groundLayer, oroLayer, zuppaLayer, minatorelayer;







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

          // MAPPA JSON TILED
          this.load.tilemapTiledJSON('map', 'assets/map2.JSON');
          // TILES DALLO SPRITESHEET: DA FIXARE
          this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
          //this.load.spritesheet('tiles', 'assets/TILE_PROVA.png', {frameWidth: 70, frameHeight: 70});
          // ATLAS CON ANIMAZIONI PLAYER
          this.load.atlas('player', 'assets/SpriteSheet.png', 'assets/sprites.json');


          this.load.image('MINATORE', 'assets/MINATORE.png');
          this.load.image("finale1", "assets/finale1.png");// BOTTONE FINALE 1
          this.load.image('ORO', 'assets/ORO.png');
          this.load.image('ZUPPA', 'assets/ZUPPA.png');
          //HUD
          this.load.image('ITEM_0', 'assets/ITEM_0.png');
          this.load.image('ITEM_1', 'assets/ITEM_1.png');
          this.load.image('ITEM_2', 'assets/ITEM_2.png');
          this.load.image('CASCO_0', 'assets/CASCO_0.png');
          this.load.image('CASCO_1', 'assets/CASCO_1.png');
          this.load.image('CASCO_2', 'assets/CASCO_2.png');
      }

      create() {
        //BOTTONI PER FINALE DELETE
        //creo una immagine per il bottone. NB NON SEGUITE I TUTORIAL PER PHASER2, è stata completamente cambiata e non funzionano più
        this.playbutton = this.add.image(this.game.config.width/3, this.game.config.height/3, "finale1");
        this.playbutton.setOrigin(0, 0);
        this.playbutton.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.playbutton.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            console.log("BOTTONE FINALE PREMUTO");
            this.scene.start("SceneMinatoreOstile");
        });


        console.log("SceneMiniera- Executing create()");
        // carica mappa
        map = this.make.tilemap({key: 'map'});
        console.log("SceneMiniera- Executing create()");
        // tile dell terreno
        var groundTiles = map.addTilesetImage('tiles');
        // crea livello terreno
        groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        // il player collide
        groundLayer.setCollisionByExclusion([-1]);

        // faccio tile oro
        var oroTile = map.addTilesetImage('ORO');
        oroLayer = map.createDynamicLayer('ORO', oroTile, 0, 0);
        // faccio tile zuppa
        var zuppaTile = map.addTilesetImage('ZUPPA');
        zuppaLayer = map.createLayer('ZUPPA', zuppaTile, 0, 0);

        var minatoreTile = map.addTilesetImage('MINATORE');
        minatorelayer = map.createDynamicLayer('MINATORE', minatoreTile, 0, 0);


        //FINE
        this.item = this.add.image(1100, 10, "ITEM_0");
        this.item.setOrigin(0,0);
        this.item.setScale(0.08);
        this.item.setScrollFactor(0);

        this.caschi = this.add.image(0, 10, "CASCO_0");
        this.caschi.setOrigin(0,0);
        this.caschi.setScale(0.08);
        this.caschi.setScrollFactor(0);
        // confini mondo come terreno
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // creo lo sprite del player
        player = this.physics.add.sprite(100, 400, 'player');
        player.setBounce(0); // bounce dalle piattafomr
        player.setCollideWorldBounds(true); // collide coi confini del mondo

        // collide con le tile
        this.physics.add.collider(groundLayer, player);
        this.physics.add.collider(zuppaLayer, player, ()=> {
          this.scene.start("SceneMinatoreOstile");
        }
        );
        // per farlo più basso della tile
        player.body.setSize(player.width, player.height-8);






        // animazione di cammino
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {prefix: 'sprite', start: 1, end: 4, zeroPad: 1}),
            frameRate: 10,
            repeat: -1
        });
        // non animazione immobile
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'sprite1'}],
            frameRate: 10,
        });


        cursors = this.input.keyboard.createCursorKeys();

        // confini mondo
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // la camera segue il player
        this.cameras.main.startFollow(player);
      }
      // QUANDO IL PLAYER TOCCA ORO




      update() {
        if (cursors.left.isDown)
        {
            player.body.setVelocityX(-200);
            player.anims.play('walk', true); // cammina a sx
            player.flipX = true; // simmetria
        }
        else if (cursors.right.isDown)
        {
            player.body.setVelocityX(200);
            player.anims.play('walk', true);
            player.flipX = false; // cammina a destra
        } else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
        // salta
        if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.setVelocityY(-400);
        }
      }


      }
