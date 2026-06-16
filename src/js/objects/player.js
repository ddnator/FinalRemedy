import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'
import { Zombie } from './zombie.js'

export class Player extends Actor {
    health = 100
    sanity = 100
    bulletReady = true
    inventory = []
    hitOnCooldown = false

    constructor() {
        super({
            width: Resources.Player.width,
            height: Resources.Player.height,
        })
        this.body.collisionType = CollisionType.Active
        this.body.bounciness = 0
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {
        const sprite = Resources.Player.toSprite()
        this.graphics.use(sprite)
        this.pos = new Vector(engine.drawWidth, engine.drawHeight / 2)
        this.on('collisionstart', (e) => this.hitSomething(e))
    }
collis
    onPreUpdate(engine, delta) {
        let yVel = 0
        let xVel = 0

        if (engine.input.keyboard.isHeld(Keys.A)) {
            xVel -= 600
            this.graphics.flipHorizontal = true
        }

        if (engine.input.keyboard.isHeld(Keys.D)) {
            xVel += 600
            this.graphics.flipHorizontal = false
        }

        if (engine.input.keyboard.wasPressed(Keys.Space) && this.bulletReady) {
            this.shoot()
        }

        this.vel = new Vector(xVel, yVel)
    }

    shoot() {
        let flip
        if (this.graphics.flipHorizontal) {
            flip = true
        }
        const bullet = new Bullet(this.pos.x, this.pos.y, flip)

        if (flip) {
            bullet.graphics.flipHorizontal = true
        }

        bullet.events.on("exitviewport", (e) => bullet.kill())
        this.scene.add(bullet)

        this.bulletReady = false

        this.scene.engine.clock.schedule(() => {
            this.bulletReady = true
        }, 200)

    }

    hitSomething(e) {
        if (e.other.owner instanceof Zombie && !this.hitOnCooldown) {
            console.log('hit')
            this.health -= 25
            this.hitOnCooldown = true
            
           
            this.scene.engine.clock.schedule(() => {
                this.hitOnCooldown = false
            }, 1000)

        }
    }

    inventory
}