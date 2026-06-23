import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, ParallaxComponent, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../../resources.js'
import { PressE } from "../../objects/prompts/pressE.js"
import { Player } from '../../objects/player.js'

export class Door2 extends Actor {

    locked = true

    constructor(player) {
        super({
            width: Resources.Scene1Door2.width,
            height: Resources.Scene1Door2.height
        })
        this.player = player


    }

    onInitialize(engine) {
        this.graphics.use(Resources.Scene1Door2.toSprite())
        this.pos = new Vector(4800, 941)
        this.addComponent(new ParallaxComponent(new Vector(0, 0)))

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
        if (this.playerInRange && engine.input.keyboard.wasPressed(Keys.E) && this.locked && this.player.selectedItem == 'injection') {
            this.locked = false
        }
        if (!this.locked) {
            this.scene.engine.goToScene('scenethree')
        }
    }

}