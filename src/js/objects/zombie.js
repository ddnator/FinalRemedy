import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"

export class Zombie extends Actor {
    health = 100
    healed = false


    constructor(player) {
        super({
            width: Resources.Zombie.width / 3,
            height: Resources.Zombie.height / 3
        })
        this.player = player
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {

        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)
    }

    onPostUpdate(engine) {
        if (this.health === 0) {
            this.kill()
        }
        this.healChecker()


    }

    healChecker() {
        if (this.healed === false) {
            this.walkToPlayer()

            const sprite = Resources.Zombie.toSprite()
            sprite.scale = new Vector(0.5, 0.5)
            this.graphics.use(sprite)

        } else {
            const sprite = Resources.Player.toSprite()
            sprite.scale = new Vector(0.5, 0.5)
            this.graphics.use(sprite)

            this.vel = new Vector(300, 0)

        }
    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Player) {
            this.attackPlayer()
        }
    }

    attackPlayer() {
        // hier de image van hit player
        this.player.health = this.player.health - 25
        console.log(this.player.health)
    }

    getHit() {
        this.health = this.health - 50


    }

    walkToPlayer() {
        if (!this.player) {
            return
        }
        const direction = this.player.pos.sub(this.pos).normalize()
        this.vel = direction.scale(110)

        if (direction.x == -1) {
            this.graphics.flipHorizontal = true
        } else if (direction.x == 1) {
            this.graphics.flipHorizontal = false
        }





    }

}
