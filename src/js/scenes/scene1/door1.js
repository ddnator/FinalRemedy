import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Floor extends Actor {
    constructor() {
        super({
            width: Resources.Scene1Door1.width,
            height: Resources.Scene1Door1.height
        })



    }

    onInitialize(engine,) {
        const door1 = new Actor()
        door1.graphics.use(Resources.Scene1Door1.toSprite())
        door1.pos = new Vector(15350, 942)

    }
}