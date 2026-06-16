import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"

export class Zombie extends Actor {



    constructor(player) {
        super({
            width: Resources.Zombie.width,
            height: Resources.Zombie.height
        })
        this.player = player
        // this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {
        const sprite = Resources.Zombie.toSprite()
        sprite.scale = new Vector(0.5, 0.5)
        this.graphics.use(sprite)

        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)
    }

    onPostUpdate(engine) {
        this.AttackPlayer()
        this.WalkToPlayer()
    }


    AttackPlayer() {

    }

    GetHit() {
        this.health = this.health - 50

        if (this.health === 0) {
            this.kill()
        }
    }

    WalkToPlayer() {
        if (!this.player) {
            return
        }
        const direction = this.player.pos.sub(this.pos).normalize()
        this.vel = direction.scale(110)

    }
}