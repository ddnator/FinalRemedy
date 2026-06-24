import { Actor, Engine, Vector, CollisionType, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Wall extends Actor {
    constructor(w, h, x, y) {
        super({
            width: w,
            height: h
        })
        this.pos = new Vector(x, y)
        this.body.collisionType = CollisionType.Fixed

    }

    onCollisionStart(event, other) {
        console.log(`i am hit by ${other}`)
    }


}