import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
//import { Bullet } from './bullet.js'

export class Player extends Actor {
    health = 100
    sanity = 100

    inventory = []

    constructor() {
        super({
            width: Resources.Player.width,
            height: Resources.Player.height,
        })
        //this.body.collisionType = CollisionType.Active
        this.body.bounciness = 0
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {
        const sprite = Resources.Player.toSprite()
        this.graphics.use(sprite)
        this.pos = new Vector(engine.drawWidth / 3, engine.drawHeight / 3)
    }

    shoot() { }

    inventory
}