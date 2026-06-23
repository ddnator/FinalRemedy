import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType, linear, ParallaxComponent } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'
import { Zombie } from './zombie.js'
import { Injection } from "./injection.js"
import { UI } from './ui.js'
import { BulletPickup } from './bulletpickup.js'
import { InjectionPickup } from './injectionpickup.js'
import { Quest } from "./quest.js"
import { Floor } from './floor.js'

export class Player extends Actor {
    health = 100
    sanity = 100
    bulletReady = true
    injectionHeld = false
    inventory = ['bullet']
    inventoryShown = false
    hitOnCooldown = false
    knockbackspeed = 0
    selectedItem = 'none'
    spacePressed = false
    injection = new Injection()
    stuck = false
    UI
    quest
    grounded
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


        if (engine.input.keyboard.isHeld(Keys.A) && this.knockbackspeed === 0 && !this.stuck) {
            xVel = -600
            this.graphics.flipHorizontal = true

        }

        if (engine.input.keyboard.isHeld(Keys.D) && this.knockbackspeed === 0 && !this.stuck) {
            xVel = 1200
            this.graphics.flipHorizontal = false
        }

        if (engine.input.keyboard.isHeld(Keys.W) && this.knockbackspeed === 0 && this.grounded && !this.stuck) {
            this.body.applyLinearImpulse(new Vector(0, -300 * delta))
        }

        if (engine.input.keyboard.wasPressed(Keys.C) || engine.input.keyboard.wasPressed(Keys.ControlLeft) && !this.stuck) {
            //Crouch controls
        }

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            const entityList = this.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof Quest) {
                    this.quest = element
                }
            });

            if (this.quest.currentQuest === 'Sanity tutorial') {
                this.quest.updateQuest()
            }
        }

        if (engine.input.keyboard.wasPressed(Keys.B)) {
            const entityList = this.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof UI) {
                    this.UI = element
                }
            });
            if (!this.inventoryShown) {
                this.UI.showInventory()
            } else {
                this.UI.hideInventory()
            }
        }

        if (engine.input.keyboard.wasPressed(Keys.Key1)) {
            const entityList = this.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof Quest) {
                    this.quest = element
                }
            });

            if (this.quest.currentQuest === 'Pistol tutorial') {
                this.quest.updateQuest()
            }

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

    onCollisionStart(event, other) {
        if (other.owner instanceof Floor) {
            this.grounded = true
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Floor) {
            this.grounded = false
        }
    }




}