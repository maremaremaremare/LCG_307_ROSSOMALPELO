export default class SceneMinatoreOstile extends Phaser.Scene {

        background_finale;        // oggetto relativo all'elemento "sfondo"

        constructor(){
    		super("SceneMinatoreOstile");
        }

        init(){
            console.log("SceneMinatoreOstile - Executing init()");
        }

        preload() {
            console.log("SceneMinatoreOstile - Executing preload()");

            this.load.image("background_finale", "assets/background_finale.png"); // carica l'immagine di sfond
            this.load.image("playButton", "assets/play_button.png");// Carica bottone
        }

        create() {
            console.log("scene_welcome - Executing create()");

            // Posizioniamo gli elementi nella scena
            this.background_finale = this.add.image(0, 0, "background_finale");
            this.background_finale.setOrigin(0,0);

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
