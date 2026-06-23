import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"
import { Zombie } from "./zombie.js"
import { UI } from './ui.js'
export class Key extends Actor {

    player
    UI

    constructor(player) {
        super({
            width: Resources.Key.width / 3,
            height: Resources.key.height / 3
        })

        this.body.collisionType = CollisionType.Passive
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)

        this.player = player
    }

    onInitialize(engine) {
        const sprite = Resources.Key.toSprite()
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

        const entityList = this.player.scene.world.entityManager.entities

        entityList.forEach(element => {
            if (element instanceof UI) {
                this.UI = element
            }
        })

        this.UI.updateInventory()
    }
}





