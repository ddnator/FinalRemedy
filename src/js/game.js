import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Scene, Sound } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './objects/player.js'
import { Zombie } from './objects/zombie.js'
import { Injection } from './objects/injection.js'
import { Floor } from './objects/floor.js'
import { SceneOne } from './scenes/scene1/sceneone.js'
import { SceneTwo } from './scenes/scene2/scenetwo.js'
import { SceneThree } from './scenes/scene3/scenethree.js'
import { Scenefour } from './scenes/scene4/scenefour.js'
import { UI } from './objects/ui.js'
import { Dialogue } from './objects/dialogue.js'



export class Game extends Engine {
    player
    constructor() {
        super({
            width: 1980,
            height: 1080,
            maxFps: 60,
            suppressHiDPIScaling: true,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 800),
            }
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const sceneOne = new SceneOne()
        this.add('sceneone', SceneOne)

        const scenetwo = new SceneTwo()
        this.add('scenetwo', SceneTwo)

        const scenethree = new SceneThree()
        this.add('scenethree', SceneThree)

        const scenefour = new Scenefour()
        this.add('scenefour', Scenefour)

        this.goToScene('sceneone')

        this.player = new Player(-7800, 800)
        this.ui = new UI()
        this.dialogue = new Dialogue()

    }
}

new Game()
