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



export class Game extends Engine {

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

        this.goToScene('sceneone')




    }
}

new Game()
