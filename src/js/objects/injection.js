import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"

export class Injection extends Actor {



    constructor() {
        super({
            width: Resources.Injection.width / 3,
            height: Resources.Injection.height / 3
        })

        // this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {
        const sprite = Resources.Injection.toSprite()
        sprite.scale = new Vector(0.5, 0.5)
        this.graphics.use(sprite)

        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)
    }

}