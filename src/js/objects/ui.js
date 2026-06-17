import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType, linear, ScreenElement, Sprite } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'
import { Zombie } from './zombie.js'
import { Injection } from "./injection.js"




export class UI extends ScreenElement {

    healthbar


    constructor(player) {
        super({})


        this.player = player

    }

    onInitialize(engine) {
        this.pos = new Vector(200, 100)
        console.log(this.player.health)

        this.healthbar = new Actor()
        this.healthbar.pos = new Vector(0, 0)
        this.addChild(this.healthbar)


    }

    onPostUpdate(engine) {
        if (this.player.health > 70) {
            let sprite = Resources.HealthbarFine.toSprite()
            this.healthbar.graphics.use(sprite)
        } else if (this.player.health > 40 && this.player.health < 70) {
            let sprite = Resources.HealthbarCaution.toSprite()
            this.healthbar.graphics.use(sprite)
        } else {
            let sprite = Resources.HealthbarDanger.toSprite()
            sprite.scale = new Vector(3, 3)
            this.healthbar.graphics.use(sprite)
        }

    }


}