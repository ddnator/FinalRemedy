import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, ParallaxComponent } from "excalibur"
import { Resources, ResourceLoader } from '../../resources.js'

export class Door1 extends Actor {
    constructor() {
        super({
            width: Resources.Scene1Door1.width,
            height: Resources.Scene1Door1.height
        })



    }

    onInitialize(engine,) {
        this.graphics.use(Resources.Scene1Door1.toSprite())
        this.pos = new Vector(15350, 762)
        this.addComponent(new ParallaxComponent(new Vector(0.52, 1)))

    }
}