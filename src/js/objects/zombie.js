import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Zombie extends Actor {

    health = 100


    constructor() {
        super({ width: Resources.ZombiePlaceholder.width, height: Resources.ZombiePlaceholder.height })
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {
        const sprite = Resources.ZombiePlaceholder.toSprite()
        sprite.scale = new Vector(0.5, 0.5)
        this.graphics.use(sprite)
    }
}