import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"
import { Zombie } from "./zombie.js"
import { Quest } from './quest.js'
import { PressE } from './prompts/pressE.js'
import { UI } from './ui.js'

export class KeyPickup extends Actor {
    x
    y
    quest
    player
    playerInRange
    UI

    constructor(x, y, quest) {
        super({
            width: Resources.KeyPickup.width * 4,
            height: Resources.KeyPickup.height * 4
        })

        this.body.collisionType = CollisionType.Passive
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.x = x
        this.y = y
        this.quest = quest
        this.scale = new Vector(0.25, 0.25)
    }

    onInitialize(engine) {
        const sprite = Resources.KeyPickup.toSprite()

        this.graphics.use(sprite)

        this.pos = new Vector(this.x, this.y)
    }

    onCollisionStart(event, other) {

        const entityList = this.scene.world.entityManager.entities

        entityList.forEach(element => {
            if (element instanceof Player) {
                this.player = element
            }
        });
    }

    onCollisionStart(event, other) {
        const collider = other ?? event.other
        if (collider?.owner instanceof Player) {
            this.playerInRange = true
            if (!this.pressE) {
                this.pressE = new PressE(0, -620)
                this.pressE.scale = new Vector(4, 4)
                this.addChild(this.pressE)
            }
        }

        const entityList = this.scene.world.entityManager.entities

        entityList.forEach(element => {
            if (element instanceof Player) {
                this.player = element
            } else if (element instanceof Quest) {
                this.quest = element
            } else if (element instanceof UI) {
                this.UI = element
            }
        });
    }

    onCollisionEnd(event, other) {
        const collider = other ?? event.other
        if (collider?.owner instanceof Player) {
            this.playerInRange = false
            if (this.pressE) {
                this.removeChild(this.pressE)
                this.pressE = null
            }
        }
    }

    onPostUpdate(engine) {
        if (this.playerInRange && engine.input.keyboard.wasPressed(Keys.E)) {
            const entityList = this.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof Quest) {
                    this.quest = element
                }
            })

            this.player.key = true
            this.UI.updateInventory()

            if (this.quest && this.quest.currentQuest === 'Keyfinder') {
                this.quest.updateQuest()
            }

            this.kill()
        }
    }



}