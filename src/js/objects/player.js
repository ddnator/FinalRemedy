import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType, linear, ParallaxComponent } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'
import { Zombie } from './zombie.js'
import { Injection } from "./injection.js"
import { UI } from './ui.js'
import { BulletPickup } from './bulletpickup.js'
import { InjectionPickup } from './injectionpickup.js'

export class Player extends Actor {
    health = 100
    sanity = 100
    bulletReady = true
    injectionHeld = false
    inventory = ['bullet', 'injection']
    hitOnCooldown = false
    knockbackspeed = 0
    selectedItem = 'bullet'
    spacePressed = false
    injection = new Injection()


    x
    y


    constructor(xpos, ypos) {
        super({
            width: Resources.Player.width,
            height: Resources.Player.height,
        })
        this.body.collisionType = CollisionType.Active
        this.body.bounciness = 0
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)

        this.pos = new Vector(xpos, ypos)
    }



    onInitialize(engine) {
        const sprite = Resources.Player.toSprite()
        this.graphics.use(sprite)
        //this.pos = new Vector(engine.drawWidth - 1600, 850)

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
            xVel = 1200
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

        if (engine.input.keyboard.wasPressed(Keys.Key2) && !this.injectionHeld && this.inventory.includes('injection')) {
            this.selectedItem = 'injection'
            this.inject()
            console.log(`selected item is ${this.selectedItem}`)
        }

        if (engine.input.keyboard.wasPressed(Keys.Key3)) {
            this.selectedItem = 'key'
            console.log(`selected item is ${this.selectedItem}`)
            this.injectionHeld = false
            this.removeChild(this.injection)
        }

        if (engine.input.keyboard.isHeld(Keys.Space)) {
            if (this.bulletReady && this.selectedItem === 'bullet' && this.inventory.includes('bullet')) {
                this.shoot()
            } else if (!this.injectionHeld && this.selectedItem === 'injection' && this.inventory.includes('injection')) {
                this.inject()
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
            this.injection.pos.x = -Resources.Player.width / 2 - Resources.Injection.width / 6
            this.injection.graphics.flipHorizontal = true
        } else {
            this.injection.pos.x = Resources.Player.width / 2 + Resources.Injection.width / 6
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

        const bulletIndex = this.inventory.indexOf("bullet")
        this.inventory.splice(bulletIndex, 1)

        this.bulletReady = false

        this.scene.engine.clock.schedule(() => {
            this.bulletReady = true
        }, 500)
    }

    inject() {
        this.injectionHeld = true
        this.addChild(this.injection)
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

        if (e.other.owner instanceof BulletPickup) {
            this.pickUpItem('bullet', e.other.owner)
        } else if (e.other.owner instanceof InjectionPickup) {
            this.pickUpItem('injection', e.other.owner)
        }
    }

    pickUpItem(inventoryItem, pickUpItem) {
        if (this.inventory.length < 6) {
            this.inventory.push(inventoryItem)
            pickUpItem.kill()
        } else {
            console.log('inventory full')
        }
    }

    knockback(direction) {
        this.knockbackspeed = -400 * direction
    }






}