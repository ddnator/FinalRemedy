import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
//import { Bullet } from './bullet.js'

export class Bullet extends Actor {
    xPos
    yPos
    xSpeed = 2000
    ySpeed = 0

    constructor(givenX, givenY) {
        super({
            width: Resources.Bullet.width,
            height: Resources.Bullet.height,
        })
        this.xPos = givenX
        this.yPos = givenY
        //this.body.collisionType = CollisionType.Active
        this.body.bounciness = 0
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
    }

    onInitialize(engine) {
        const sprite = Resources.Bullet.toSprite()
        this.graphics.use(sprite)
        this.pos = new Vector(this.xPos, this.yPos)
        this.vel = new Vector(this.xSpeed, this.ySpeed)
    }
}