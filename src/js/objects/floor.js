import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Floor extends Actor {
    constructor(w, h, x, y) {
        super({
            width: w,
            height: h
        })
        this.pos = new Vector(x, y)
        this.body.collisionType = CollisionType.Fixed
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }


}