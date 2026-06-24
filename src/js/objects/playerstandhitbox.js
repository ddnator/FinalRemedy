import { Actor, Engine, Vector, CollisionType, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Wall } from './wall.js'

export class PlayerStandHitbox extends Actor {
    constructor(w, h, x, y) {
        super({
            width: w,
            height: h
        })
        this.pos = new Vector(x, y)
        this.body.collisionType = CollisionType.Passive

    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Wall) {
            this.parent.canStandUp = false
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Wall) {
            this.parent.canStandUp = true
        }
    }
}