import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"
import { Zombie } from "./zombie.js"
import { PressE } from './prompts/pressE.js'
import { Quest } from './quest.js'
import { UI } from './ui.js'

export class BulletPickup extends Actor {
    playerInRange = false
    player
    quest
    UI

    constructor(x, y, quest) {
        super({
            width: Resources.BulletPickUp.width,
            height: Resources.BulletPickUp.height
        })

        this.body.collisionType = CollisionType.Passive
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)

        this.pos = new Vector(x, y)
        this.quest = quest

    }

    onInitialize(engine) {
        const sprite = Resources.BulletPickUp.toSprite()
        this.scale = new Vector(0.2, 0.2)
        this.graphics.use(sprite)
    }

    onCollisionStart(event, other) {
        const collider = other ?? event.other
        if (collider?.owner instanceof Player) {
            this.playerInRange = true
            if (!this.pressE) {
                this.pressE = new PressE(0, -400)
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
            } else if (element instanceof UI)
                this.UI = element
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
            this.player.pickUpItem('bullet', this)
            this.UI.updateInventory()
            if (this.quest != null) {
                this.quest.updateQuest()
            }
        }
    }
}