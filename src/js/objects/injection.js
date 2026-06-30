import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"
import { Zombie } from "./zombie.js"
import { UI } from './ui.js'
export class Injection extends Actor {

    player
    UI

    constructor(player) {
        super({
            width: Resources.Injection.width / 3,
            height: Resources.Injection.height / 3
        })

        this.body.collisionType = CollisionType.Passive
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)

        this.player = player
    }

    onInitialize(engine) {
        const sprite = Resources.Injection.toSprite()
        sprite.scale = new Vector(0.5, 0.5)
        this.graphics.use(sprite)

        // this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 1.25)
        const entityList = this.scene.world.entityManager.entities

        entityList.forEach(element => {
            if (element instanceof Player) {
                this.player = element
            }
        })
    }


    onCollisionStart(event, other) {
        if (other.owner instanceof Zombie && !other.owner.healed) {
            Resources.zombieHeal.play()

            other.owner.healed = true
            this.kill()
            const injectionIndex = this.player.inventory.indexOf("injection")
            this.player.inventory.splice(injectionIndex, 1)
            this.player.injectionHeld = false

            const entityList = this.player.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof UI) {
                    this.UI = element
                } else if (element instanceof Player) {
                    this.player = element
                }
            })

            this.player.sanity += 15
            this.UI.sanitybrain.pos = new Vector((this.player.sanity - 50) * 0.7, 0)
            this.UI.updateInventory()
            console.log
        }
    }


    onPostUpdate(engine) {

    }


}