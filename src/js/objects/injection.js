import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"
import { Zombie } from "./zombie.js"

export class Injection extends Actor {



    constructor(zombie, player, x, y) {
        super({
            width: Resources.Injection.width / 4,
            height: Resources.Injection.height / 4
        })

        this.body.collisionType = CollisionType.Passive
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.zombie = zombie
        this.player = player
    }

    onInitialize(engine) {
        const sprite = Resources.Injection.toSprite()
        sprite.scale = new Vector(0.5, 0.5)
        this.graphics.use(sprite)

        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 1.25)


    }

    onCollisionStart(event, other, engine) {
        if (other.owner instanceof Zombie && this.zombie.healed == false) {
            this.zombie.healed = true
            this.kill()
        } else {
            return
        }
    }

    onPostUpdate(engine) {

    }

    zombieCollisionChecker() {


    }

}