import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, ParallaxComponent } from "excalibur"
import { Resources, ResourceLoader } from "../../resources"


export class PressE extends Actor {
    constructor(x, y) {
        super({
            width: Resources.PressE.width,
            height: Resources.PressE.height,
            pos: new Vector(x, y)
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.PressE.toSprite())

    }
}
