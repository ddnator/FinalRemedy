import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Floor extends Actor {
    constructor() {
        super({
            width: 1980,
            height: 100
        })

        this.body.collisionType = CollisionType.Fixed
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {

        this.pos = new Vector(engine.drawWidth / 2, 850)
        console.log(this.pos.y)
    }

}