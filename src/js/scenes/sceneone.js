import { Actor, Engine, Vector, DisplayMode, ParallaxComponent, SolverStrategy, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from '../objects/player.js'
import { Zombie } from '../objects/zombie.js'
import { Injection } from '../objects/injection.js'
import { Floor } from '../objects/floor.js'
import { Background1 } from '../objects/background1.js'
import { UI } from "../objects/ui.js"
import { InjectionPickup } from "../objects/injectionpickup.js"
import { BulletPickup } from "../objects/bulletpickup.js"

export class SceneOne extends Scene {

    onInitialize(engine) {

        //Background
        const sky = new Actor()
        sky.graphics.use(Resources.Scene1Sky.toSprite())
        sky.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 4)
        sky.addComponent(new ParallaxComponent(new Vector(0.5, 1)))
        this.add(sky)

        const back = new Actor()
        back.graphics.use(Resources.Scene1Back.toSprite())
        back.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 4)
        back.addComponent(new ParallaxComponent(new Vector(.51, 1)))
        this.add(back)

        const build2 = new Actor()
        build2.graphics.use(Resources.Scene1Buildings2.toSprite())
        build2.pos = new Vector(engine.screen.resolution.width / 1.7, engine.screen.resolution.height / 4)
        build2.addComponent(new ParallaxComponent(new Vector(0.53, 1)))
        this.add(build2)

        const build1 = new Actor()
        build1.graphics.use(Resources.Scene1Buildings1.toSprite())
        build1.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 4)
        build1.addComponent(new ParallaxComponent(new Vector(0.52, 1)))
        this.add(build1)

        const street = new Actor()
        street.graphics.use(Resources.Scene1Street.toSprite())

        street.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 4)
        street.addComponent(new ParallaxComponent(new Vector(0.5, 1)))
        this.add(street)



        const player = new Player()
        this.add(player)

        const zombie = new Zombie(player)
        this.add(zombie)


        const floor = new Floor()
        this.add(floor)

        const bulletpickup = new BulletPickup()
        this.add(bulletpickup)

        const injectionpickup = new InjectionPickup()
        this.add(injectionpickup)


        //cam on player
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        cam.strategy.elasticToActor(player, 0.2, 0.6)




        const ui = new UI(player)
        this.add(ui)




    }

    onPostUpdate() {
        //cam offset 
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        const offset = 24
        if (cam && cam.strategy) {
            cam.pos = cam.pos.add(new Vector(0, -offset))
        }

        //cam bounds
        const minX = -8000
        const maxX = 15000


        if (cam) {
            cam.pos.x = Math.min(Math.max(cam.pos.x, minX), maxX)

        }
    }


}
