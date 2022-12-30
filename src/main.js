// Importo le scene
import SceneWelcome from "./scenes/00_welcome.js";
import SceneCutscene from "./scenes/S_Cutscene_1.js";
import ScenePaese from "./scenes/01_paese.js";
import SceneMiniera from "./scenes/02_miniera.js";
import SceneMinatore1 from "./scenes/03_minatore_1.js"
import SceneMinatore2 from "./scenes/04_minatore_2.js"
import SceneMinatoreOstile from "./scenes/05_minatore_Ostile.js"
import UI from "./scenes/S_UI.js"
import PauseMenu from "./scenes/P_pause.js";

// Definiamo la configurazione di lancio del gioco
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    //fisica arcade
    physics: {
        default: 'arcade',
            arcade: {
              gravity: {y: 500},
              debug: false
              }
            },

    backgroundColor: 0xFFFFFF, // sfondo nero
    scene: [SceneWelcome,SceneMiniera,SceneMinatoreOstile],
    pixelArt: false,
    parent: "game_area" // Specifica il div contenitore
};

let game = new Phaser.Game(config);
game.gameState = {
    playTime: 30,
    score: 0,
    lives: 3
}
