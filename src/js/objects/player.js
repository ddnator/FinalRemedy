import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType, linear } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'
import { Zombie } from './zombie.js'
import { Injection } from "./injection.js"

export class Player extends Actor {
    health = 100
    sanity = 100
    bulletReady = true
    injectionHeld = false
    inventory = ['bullet', 'injection']
    hitOnCooldown = false
    knockbackspeed = 0
    selectedItem = 0
    spacePressed = false
    injection = new Injection()

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
        this.pos = new Vector(engine.drawWidth - 1600, 850)
        this.on('collisionstart', (e) => this.hitSomething(e))
        this.scale = new Vector(0.6, 0.6)
        this.injection.pos = new Vector(80, 0)
    }


    onPostUpdate(engine, delta) {
        let yVel = 0
        let xVel = 0

        if (engine.input.keyboard.isHeld(Keys.A) && this.knockbackspeed === 0) {
            xVel = -600
            this.graphics.flipHorizontal = true
        }

        if (engine.input.keyboard.isHeld(Keys.D) && this.knockbackspeed === 0) {
            xVel = 600
            this.graphics.flipHorizontal = false
        }

        if (engine.input.keyboard.wasPressed(Keys.C) || engine.input.keyboard.wasPressed(Keys.ControlLeft)) {
            //Crouch controls
        }

        if (engine.input.keyboard.wasPressed(Keys.Key1)) {
            this.selectedItem = 'bullet'
            console.log(`selected item is ${this.selectedItem}`)
            this.injectionHeld = false
            this.removeChild(this.injection)
        }

        if (engine.input.keyboard.wasPressed(Keys.Key2) && !this.injectionHeld) {
            this.injectionHeld = true
            this.selectedItem = 'injection'

            this.addChild(this.injection)
            console.log(`selected item is ${this.selectedItem}`)
        }

        if (engine.input.keyboard.wasPressed(Keys.Key3)) {
            this.selectedItem = 'key'
            console.log(`selected item is ${this.selectedItem}`)
            this.injectionHeld = false
            this.removeChild(this.injection)
        }

        if (engine.input.keyboard.isHeld(Keys.Space)) {

            if (this.bulletReady && this.selectedItem === 'bullet') {
                this.shoot()
            }
        }

        this.vel = new Vector(xVel + this.knockbackspeed, this.vel.y)

        if (this.knockbackspeed >= 10) {
            this.knockbackspeed -= 10
        } else if (this.knockbackspeed <= -10) {
            this.knockbackspeed += 10
        } else {
            this.knockbackspeed = 0
        }

        if (this.health <= 0) {
            this.kill()
        }

        if (this.graphics.flipHorizontal) {
            this.injection.pos.x = -80
            this.injection.graphics.flipHorizontal = true
        } else {
            this.injection.pos.x = 80
            this.injection.graphics.flipHorizontal = false
        }
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

        if (flip) {
            this.knockback(-1)
        } else {
            this.knockback(1)
        }

        bullet.events.on("exitviewport", (e) => bullet.kill())
        this.scene.add(bullet)

        this.bulletReady = false

        this.scene.engine.clock.schedule(() => {
            this.bulletReady = true
        }, 500)
    }

    inject() {
        const injection = new Injection()
        injection.pos = new Vector(300, 0)
        this.injectionReady = false
        this.addChild(injection)
    }

    hitSomething(e) {
        if (e.other.owner instanceof Zombie && !this.hitOnCooldown) {
            this.hitOnCooldown = true
            const direction = e.other.owner.pos.sub(this.pos).normalize().x
            this.knockback(direction)

            this.scene.engine.clock.schedule(() => {
                this.hitOnCooldown = false
            }, 400)

        }
    }

    pickUpItem() {
        if (!this.inventory.length < 6) {
            console.log('inventory is full')
            console.log(this.inventory)
        } else {
            console.log(this.inventory)
            this.inventory.add('gvergoo')
        }
    }

    knockback(direction) {
        this.knockbackspeed = -400 * direction
    }
}