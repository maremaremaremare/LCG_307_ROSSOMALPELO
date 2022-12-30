export default class SceneWelcome extends Phaser.Scene {

      background;        // oggetto relativo all'elemento "sfondo"

      constructor(){
  		super("SceneWelcome");
      }

      init(){
          console.log("scene_welcome - Executing init()");
      }

      preload() {
          console.log("scene_welcome - Executing preload()");

          this.load.image("background_base", "assets/background.png"); // carica l'immagine di sfond
          this.load.image("playButton", "assets/play_button.png");// Carica bottone


      }

      create() {
          console.log("scene_welcome - Executing create()");

          // Posizioniamo gli elementi nella scena
          this.background = this.add.image(0, 0, "background_base");
          this.background.setOrigin(0,0);

          //creo una immagine per il bottone. NB NON SEGUITE I TUTORIAL PER PHASER2, è stata completamente cambiata e non funzionano più
          this.playbutton = this.add.image(this.game.config.width/2, this.game.config.height/2, "playButton");
          this.playbutton.setOrigin(0.5, 0.5);
          this.playbutton.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

          this.playbutton.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
              console.log("BOTTONE START PREMUTO");
              this.scene.start("SceneMiniera");
          });
      }

      update(){
      }




}
