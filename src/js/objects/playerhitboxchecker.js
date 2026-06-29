import { Actor, Engine, Vector, CollisionType, Keys, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from './player.js'
import { Wall } from './wall.js'

export class PlayerHitboxChecker extends Actor {
    isFence = false

    constructor(w, h, x, y) {
        super({
            width: w,
            height: h
        })
        this.pos = new Vector(x, y)
        this.body.collisionType = CollisionType.Passive

    }

    onCollisionStart(event, other) {
        if (this.scene.engine.player.crouched && other.owner instanceof Player) {
            this.scene.engine.player.canStandUp = false
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Player) {
            this.scene.engine.player.canStandUp = true
        }
    }
}