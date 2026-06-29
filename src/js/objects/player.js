import { Actor, Engine, Vector, Keys, EdgeCollider, DegreeOfFreedom, CollisionType, linear, ParallaxComponent, SpriteSheet, Sprite, range, AnimationStrategy, Animation } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'
import { Zombie } from './zombie.js'
import { Injection } from "./injection.js"
import { UI } from './ui.js'
import { BulletPickup } from './bulletpickup.js'
import { InjectionPickup } from './injectionpickup.js'
import { Quest } from "./quest.js"
import { Floor } from './floor.js'
import { Wall } from './wall.js'
import { PlayerStandHitbox } from './playerstandhitbox.js'
import { KillBox } from "./killbox.js"
import { Dialogue } from "./dialogue.js"



export class Player extends Actor {
    health = 100
    sanity = 50
    bulletReady = true
    injectionHeld = false
    inventory = ['bullet', 'bullet']
    inventoryShown = false
    hitOnCooldown = false
    knockbackspeed = 0
    selectedItem = 'none'
    spacePressed = false
    injection = new Injection()
    stuck = false
    key = false
    canStandUp = true
    playerStandHitbox
    engine
    UI
    quest
    grounded = false
    jumpReady = true
    crouched = false
    x
    y
    dialogue = new Dialogue()


    constructor(xpos, ypos) {
        super({
            width: Resources.Player.width,
            height: Resources.Player.height,
        })
        this.body.collisionType = CollisionType.Active
        this.body.bounciness = 0
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.body.friction = 100
        this.pos = new Vector(xpos, ypos)
    }



    onInitialize(engine) {
        this.setupAnimations();
        const sprite = Resources.Player.toSprite()
        this.graphics.use('idle')
        //this.pos = new Vector(engine.drawWidth - 1600, 850)

        this.on('collisionstart', (e) => this.hitSomething(e))
        this.scale = new Vector(4.5, 4.5)
        this.injection.pos = new Vector(80, 0)

        this.engine = engine
    }


    onPostUpdate(engine, delta) {
        this.checkMovement(engine, delta)
        this.checkInventory(engine)
        this.switchPickedItem(engine)
        this.useSelectedItem(engine)
        this.checkInjectionPosition()
        this.checkQuest(engine, delta)
        this.healthChecker()
        this.questKeyChecker()
        //this.checkQuest(engine, delta)
    }



    healthChecker() {
        if (this.health <= 0) {
            this.kill()
        }
    }

    checkMovement(engine, delta) {
        let xAccel = 0;
        let yAccel = 300;

        if (engine.input.keyboard.isHeld(Keys.A) && !this.stuck && this.graphics._current !== 'shoot') {
            if(this.graphics._current !== 'crouch') {
                this.graphics.use('walk')
            }
            xAccel = -20; // Use an acceleration value instead of a massive direct velocity
            this.graphics.flipHorizontal = true;
        } else if (engine.input.keyboard.isHeld(Keys.D) && !this.stuck && this.graphics._current !== 'shoot') {
            if(this.graphics._current !== 'crouch') {
                this.graphics.use('walk')
            }
            xAccel = 20;
            this.graphics.flipHorizontal = false;
        } else if (this.grounded) {
            this.vel = new Vector(this.vel.x * 0.8, this.vel.y)
        }

        if (engine.input.keyboard.wasPressed(Keys.W) && this.grounded && this.jumpReady && !this.stuck && !this.crouched) {
            this.body.applyLinearImpulse(new Vector(0, -yAccel * delta))
            this.jumpReady = false

            this.scene.engine.clock.schedule(() => {
                this.jumpReady = true
            }, 500)
        }

        if (engine.input.keyboard.wasPressed(Keys.C) && !this.stuck && !this.crouched) {
            const oldHeight = this.height
            const oldWidth = this.width

            this.graphics.use('crouch')

            const newHeight = this.height
            const newWidth = this.width

            this.playerStandHitbox = new PlayerStandHitbox((oldWidth - newWidth), (oldHeight - newHeight) / 2, 0, -newHeight / 2)
            
            // this.height = 200
            this.addChild(this.playerStandHitbox)

            this.pos.y += (oldHeight - newHeight) / 2
            this.crouched = true

        } else if (engine.input.keyboard.wasPressed(Keys.C) && !this.stuck && this.crouched && this.canStandUp) {
            const oldHeight = this.height

            this.graphics.use('idle')

            this.crouched = false
            
            const newHeight = this.height


            this.removeChild(this.playerStandHitbox)
            this.pos.y += (oldHeight - newHeight) / 2
            //change sprite
        }

        if (xAccel !== 0) {
            if (this.vel.x < 1000 && this.vel.x > -1000) {
                this.body.applyLinearImpulse(new Vector(xAccel * delta, 0));
            }
        } else if (xAccel <= 1 && this.graphics._current !== 'shoot' && this.graphics._current !== 'crouch') {
            this.graphics.use('idle')
        }

    }

    checkQuest(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            const entityList = this.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof Quest) {
                    this.quest = element
                }
            });

            if (this.quest.currentQuest === 'Sanity tutorial') {
                this.quest.updateQuest()
            } else if (this.quest.currentQuest === 'Compliment') {
                this.quest.updateQuest()
            }
        }
    }

    checkInjectionPosition() {
        if (this.graphics.flipHorizontal) {
            this.injection.pos.x = -Resources.Player.width / 2 - Resources.Injection.width / 6
            this.injection.graphics.flipHorizontal = true
        } else {
            this.injection.pos.x = Resources.Player.width / 2 + Resources.Injection.width / 6
            this.injection.graphics.flipHorizontal = false
        }
    }

    checkInventory(engine) {
        if (engine.input.keyboard.wasPressed(Keys.KeyB)) {
            const entityList = this.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof Quest) {
                    this.quest = element
                } else if (element instanceof UI) {
                    this.UI = element
                }
            });

            if (!this.inventoryShown) {
                this.UI.showInventory()
            } else {
                this.UI.hideInventory()
            }

            if (this.quest.currentQuest == 'Inventorian') {
                this.quest.updateQuest()
            }
        }
    }

    switchPickedItem(engine) {
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
        } else if (engine.input.keyboard.wasPressed(Keys.Key2) && !this.injectionHeld && this.inventory.includes('injection')) {
            this.selectedItem = 'injection'
            this.inject()
            console.log(`selected item is ${this.selectedItem}`)


            const entityList = this.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof Quest) {
                    this.quest = element
                }
            });

            if (this.quest.currentQuest === 'Cure the zombie') {
                this.quest.updateQuest()
            }
        }
    }

    useSelectedItem(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            if (this.bulletReady && this.selectedItem === 'bullet' && this.inventory.includes('bullet') && this.vel.x < 5 && this.vel.x > -5) {
                this.shoot()
                this.shootAnim.events.on('end', (a) => {
                    this.shootAnim.reset()
                    this.graphics.use('idle')
                })

            } else if (!this.injectionHeld && this.selectedItem === 'injection' && this.inventory.includes('injection')) {
                this.inject()
            }
        }
    }

    shoot() {
        this.graphics.use('shoot')

        let flip
        if (this.graphics.flipHorizontal) {
            flip = true
        } else {
            flip = false
        }
        const bullet = new Bullet(this.pos.x, this.pos.y - 80, flip)

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

        const entityList = this.scene.world.entityManager.entities

        entityList.forEach(element => {
            if (element instanceof UI) {
                this.UI = element
            }
        })

        this.UI.updateInventory()

        this.scene.engine.clock.schedule(() => {
            this.bulletReady = true
        }, 500)

        Resources.shoot.play()
    }

    inject() {
        this.injectionHeld = true
        this.addChild(this.injection)
    }

    questKeyChecker() {
        if (this.quest && this.quest.currentQuest === 'Keyfinder' && this.key === true) {
            this.quest.updateQuest()
        }
    }

    hitSomething(e) {
        if (e.other.owner instanceof Zombie && !this.hitOnCooldown) {
            this.hitOnCooldown = true
            const direction = e.other.owner.pos.sub(this.pos).normalize().x
            this.knockback(direction)

            this.scene.engine.clock.schedule(() => {
                this.hitOnCooldown = false
            }, 200)
        } else if (e.other.owner instanceof KillBox) {
            this.health = 0
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
        this.knockbackspeed = -300 * direction
    }

    /// animations get made

    setupAnimations() {
        const configGrid = {
            rows: 1,
            columns: 6,
            spriteWidth: 73,
            spriteHeight: 102
        }

        const configGrid2 = {
            rows: 1,
            columns: 16,
            spriteWidth: 73,
            spriteHeight: 102
        }

        const configGrid3 = {
            rows: 1,
            columns: 9,
            spriteWidth: 73,
            spriteHeight: 102
        }

        const configGrid4 = {
            rows: 1,
            columns: 5,
            spriteWidth: 73,
            spriteHeight: 102
        }

        const frameSpeed = 60;

        const playerShootSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerShoot,
            grid: configGrid
        });

        const playerIdleSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerIdle,
            grid: configGrid2
        });

        const playerWalkSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerWalk,
            grid: configGrid3
        });

        const playerCrouchSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerCrouch,
            grid: configGrid4
        });


        this.shootAnim = Animation.fromSpriteSheet(playerShootSheet, range(0, 5), frameSpeed, AnimationStrategy.End);
        this.shootAnim.scale = new Vector(1, 1)

        this.idleAnim = Animation.fromSpriteSheet(playerIdleSheet, range(0, 15), 120, AnimationStrategy.Loop);
        this.idleAnim.scale = new Vector(1, 1)

        this.walkAnim = Animation.fromSpriteSheet(playerWalkSheet, range(0, 8), 120, AnimationStrategy.Loop);
        this.walkAnim.scale = new Vector(1, 1)

        this.crouchAnim = Animation.fromSpriteSheet(playerCrouchSheet, range(0, 4), 90, AnimationStrategy.Loop);
        this.crouchAnim.scale = new Vector(1, 1)

        this.graphics.add('shoot', this.shootAnim)
        this.graphics.add('idle', this.idleAnim)
        this.graphics.add('walk', this.walkAnim)
        this.graphics.add('crouch', this.crouchAnim)

    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Floor || other.owner.name === 'slope') {
            this.scene.engine.clock.schedule(() => {
                this.grounded = true
            }, 500)
        }
    }

    onCollisionEnd(event, other) {
        if (other.owner instanceof Floor || other.owner.name === 'slope') {
            this.grounded = false
        }
    }



    
}