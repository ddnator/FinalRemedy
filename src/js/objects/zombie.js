import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"

export class Zombie extends Actor {
    health = 100
    healed = false
    x
    y

    constructor(player, x, y) {
        super({
            width: Resources.Zombie.width,
            height: Resources.Zombie.height
        })
        this.player = player
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.x = x
        this.y = y
    }

    onInitialize(engine) {

        this.pos = new Vector(this.x, this.y)
    }

    onPostUpdate(engine) {
        if (this.health == 0) {
            this.kill()
            this.lowerSanity()
        }
        this.healChecker()
    }

    lowerSanity() {
        const entityList = this.scene.world.entityManager.entities

        const player = entityList.find((entity) => entity instanceof Player)
        player.sanity -= 25
    }

    healChecker() {
        if (this.healed === false) {
            this.walkToPlayer()

            const sprite = Resources.Zombie.toSprite()
            this.scale = new Vector(0.55, 0.55)

            this.graphics.use(sprite)

        } else {
            const sprite = Resources.Player.toSprite()
            this.scale = new Vector(0.65, 0.65)
            this.graphics.use(sprite)
            this.body.collisionType = CollisionType.Passive

            this.walkAway()
            // this.vel = new Vector(700, 0)
            this.health = 500
            this.events.on("exitviewport", (e) => this.kill())

        }
    }

    walkAway() {
        if (this.player.pos.x > this.pos.x) {
            this.vel = new Vector(-700, 0)
            this.graphics.flipHorizontal = true
        } else {

            this.vel = new Vector(700, 0)
            this.graphics.flipHorizontal = false
        }


    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Player) {
            this.attackPlayer()
        }
    }

    attackPlayer() {
        // hier de image van hit player
        if (!this.healed) {
            this.player.health = this.player.health - 25
            console.log(this.player.health)
        }

    }

    getHit() {
        this.health = this.health - 50


    }

    walkToPlayer() {
        if (!this.player) {
            return
        }

        const direction = this.player.pos.sub(this.pos).normalize()

        this.vel = new Vector(direction.x * 110, this.vel.y)

        if (direction.x < 0) {
            this.graphics.flipHorizontal = true
        } else if (direction.x > 0) {
            this.graphics.flipHorizontal = false
        }
    }





}

