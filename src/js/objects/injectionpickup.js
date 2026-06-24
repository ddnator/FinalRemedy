import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"
import { Zombie } from "./zombie.js"
import { Quest } from './quest.js'
import { PressE } from './prompts/pressE.js'
import { UI } from './ui.js'

export class InjectionPickup extends Actor {
    x
    y
    quest
    player
    playerInRange
    UI

    constructor(x, y, quest) {
        super({
            width: Resources.Injection.width / 2,
            height: Resources.Injection.height / 2
        })

        this.body.collisionType = CollisionType.Passive
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.x = x
        this.y = y
        this.quest = quest
    }

    onInitialize(engine) {
        const sprite = Resources.InjectionPickUp.toSprite()
        sprite.scale = new Vector(0.25, 0.25)
        this.graphics.use(sprite)

        this.pos = new Vector(this.x, this.y)
    }

    onCollisionStart(event, other) {
        const collider = other ?? event.other
        if (collider?.owner instanceof Player) {
            this.playerInRange = true
            if (!this.pressE) {
                this.pressE = new PressE(0, -120)
                this.pressE.scale = new Vector(1,1)
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
            this.player.pickUpItem('injection', this)
            this.UI.updateInventory()
            if (this.quest === 'Injection pickup tutorial') {
                this.quest.updateQuest()
            }
        }
    }
}