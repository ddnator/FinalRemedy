import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'

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
        this.pos = new Vector(engine.drawWidth/2, engine.drawHeight/2)
    }

    onPreUpdate(engine, delta){
        let yVel = 0
        let xVel = 0

        if (engine.input.keyboard.isHeld(Keys.A)) {
            xVel  -= 300
            this.graphics.flipHorizontal = true
        }

        if (engine.input.keyboard.isHeld(Keys.D)) {
            xVel  += 300
            this.graphics.flipHorizontal = false
        }

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot()
        }

        this.vel = new Vector(xVel, yVel)
    }
    
    shoot(){
        const bullet = new Bullet(this.pos.x, this.pos.y)
        this.on('collisionstart', (e) => this.hitSomething(e))
        this.events.on("exitviewport", (e) => this.kill())
        this.scene.add(bullet)
        console.log('shoot')

    }

    hitSomething(e){

    }
    inventory
}