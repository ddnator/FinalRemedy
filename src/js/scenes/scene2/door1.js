import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, ParallaxComponent, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../../resources.js'
import { PressE } from "../../objects/prompts/pressE.js"
import { Player } from '../../objects/player.js'

export class Door1 extends Actor {
    constructor(x, y) {
        super({
            width: Resources.Scene1Door1.width / 2,
            height: Resources.Scene1Door1.height
        })

        // this.pos = new Vector(15350, 762)
        this.pos = new Vector(x, y)
    }

    onInitialize(engine) {


        this.addComponent(new ParallaxComponent(new Vector(0.52, 1)))

        this.playerInRange = false
        this.engine = engine
    }



    onCollisionStart(event, other) {
        const collider = other ?? event.other
        if (collider?.owner instanceof Player) {
            this.playerInRange = true
            if (!this.pressE) {
                this.pressE = new PressE(0, -80)
                this.addChild(this.pressE)
            }
        }
    }

    onCollisionEnd(event, other) {
        const collider = other ?? event.other
        if (collider?.owner instanceof Player) {
            this.playerInRange = false
            if (this.pressE) {
                this.removeChild(this.pressE)
                this.pressE = null
            }
        }
    }

    onPostUpdate(engine) {
        if (this.playerInRange && engine.input.keyboard.wasPressed(Keys.E)) {
            this.scene.engine.goToScene('sceneone')
        }
    }

}