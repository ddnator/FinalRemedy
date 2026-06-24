import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, ParallaxComponent, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../../resources.js'
import { PressE } from "../../objects/prompts/pressE.js"
import { Player } from '../../objects/player.js'
import { Quest } from "../../objects/quest.js"

export class Door2 extends Actor {

    locked = true
    quest

    constructor(player, quest) {
        super({
            width: Resources.Scene1Door2.width,
            height: Resources.Scene1Door2.height
        })
        this.player = player
        this.quest = quest

    }

    onInitialize(engine) {
        this.pos = new Vector(4800, 741)
        this.addComponent(new ParallaxComponent(new Vector(0.52, 1)))
        this.playerInRange = false
        this.engine = engine
    }



    onCollisionStart(event, other) {
        const collider = other ?? event.other
        if (collider?.owner instanceof Player) {
            this.playerInRange = true
            if (!this.pressE) {
                this.pressE = new PressE(0, -180)
                this.addChild(this.pressE)
            }
        }
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
        if (this.playerInRange && engine.input.keyboard.wasPressed(Keys.E) && this.locked == true) {
            if (this.quest == 'door2locked') {
                const entityList = this.scene.world.entityManager.entities

                entityList.forEach(element => {
                    if (element instanceof Quest) {
                        this.quest = element
                    }
                })
                this.quest.updateQuest()
                console.log('door locked')
            }

        }
        if (this.playerInRange && engine.input.keyboard.wasPressed(Keys.E)) {
            this.lockChecker()

        }

    }
    lockChecker() {
        if (this.player.key == true) {
            this.locked = false
            this.scene.engine.goToScene('scenethree')
        }
    }
}