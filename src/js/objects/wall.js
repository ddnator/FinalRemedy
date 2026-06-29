import { Actor, Engine, Vector, CollisionType, Keys, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from './player.js'

export class Wall extends Actor {
    isFence = false

    constructor(w, h, x, y) {
        super({
            width: w,
            height: h
        })
        this.pos = new Vector(x, y)
        this.body.collisionType = CollisionType.Fixed

    }

    onPostUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.C) && this.scene.engine.player.canStandUp) {
            this.body.collisionType = CollisionType.Fixed
            this.scale = new Vector(1, 1)

        }
    }

    onCollisionStart(event, other) {
        if (this.isFence && this.scene.engine.player.crouched && other.owner instanceof Player) {
            this.body.collisionType = CollisionType.PreventCollision
            this.scale = new Vector(0.9, 0.9)
        }
    }

}