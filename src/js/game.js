import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './objects/player.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1980,
            height: 1080,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                    solver: SolverStrategy.Realistic,
                    gravity: new Vector(0, 800),
            }
        })

        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const player = new Player()
        this.add(player)

    }
}

new Game()
