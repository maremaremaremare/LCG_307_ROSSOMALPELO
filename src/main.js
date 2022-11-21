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
    backgroundColor: 0x000000, // sfondo nero
    scene: [ SceneWelcome, SceneCutscene, ScenePaese, SceneMiniera, SceneMinatore1, SceneMinatore2, SceneMinatore2, SceneMinatoreOstile, UI, PauseMenu ],
    pixelArt: true,
    parent: "game_area" // Specifica il div contenitore
};

