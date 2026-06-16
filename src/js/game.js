import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Zombie } from './objects/zombie.js'
import { Player } from './objects/player.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1980,
            height: 1080,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {


        const player = new Player()
        this.add(player)

        const zombie = new Zombie(player)
        this.add(zombie)
    }
}

new Game()
