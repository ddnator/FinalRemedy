import { Actor, Engine, Vector, DisplayMode, CollisionType, DegreeOfFreedom, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Background1 extends Actor {
    constructor() {
        super({

            displayMode: DisplayMode.FitScreen,
        })


    }

    onInitialize(engine) {
        const sprite = Resources.Background1.toSprite()
        this.graphics.use(sprite)

        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 3.5)
        sprite.scale = new Vector(1.5, 1.5)
    }

}