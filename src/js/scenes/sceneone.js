import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from '../objects/player.js'
import { Zombie } from '../objects/zombie.js'
import { Injection } from '../objects/injection.js'
import { Floor } from '../objects/floor.js'
import { Background1 } from '../objects/background1.js'
import { UI } from "../objects/ui.js"

export class SceneOne extends Scene {

    onInitialize(engine) {

        const background1 = new Background1()
        this.add(background1)

        const player = new Player()
        this.add(player)

        const zombie = new Zombie(player)
        this.add(zombie)





        const floor = new Floor()
        this.add(floor)



        const ui = new UI(player)
        this.add(ui)

    }



}
