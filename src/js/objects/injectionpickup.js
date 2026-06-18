import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, Keys } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"
import { Zombie } from "./zombie.js"

export class InjectionPickup extends Actor {



    constructor() {
        super({
            width: Resources.Injection.width / 2,
            height: Resources.Injection.height / 2
        })

        this.body.collisionType = CollisionType.Passive
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)




    }

    onInitialize(engine) {
        const sprite = Resources.InjectionPickUp.toSprite()
        sprite.scale = new Vector(0.25, 0.25)
        this.graphics.use(sprite)

        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 1.25)


    }




    onPostUpdate(engine) {

    }


}