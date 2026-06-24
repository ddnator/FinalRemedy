import { Actor, Engine, Vector, DisplayMode, ParallaxComponent, SolverStrategy, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../../resources.js'
import { Player } from '../../objects/player.js'
import { Zombie } from '../../objects/zombie.js'
import { Injection } from '../../objects/injection.js'
import { Floor } from '../../objects/floor.js'
import { Background1 } from '../../objects/background1.js'
import { UI } from "../../objects/ui.js"
import { InjectionPickup } from "../../objects/injectionpickup.js"
import { BulletPickup } from "../../objects/bulletpickup.js"
import { Quest } from '../../objects/quest.js'
import { Wall } from "../../objects/wall.js"



export class SceneTwo extends Scene {

    player

    onInitialize(engine) {


        Resources.track2.play()
        Resources.track2.loop

        const floor = new Floor(10000, 100, 540, 1100)
        this.add(floor)

        const wall1 = new Wall(330, 2000, 880, 1100)
        this.add(wall1)


        //Background
        const sky = new Actor()
        sky.graphics.use(Resources.Scene2Sky.toSprite())
        sky.scale = new Vector(0.8, 0.8)
        sky.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        sky.addComponent(new ParallaxComponent(new Vector(0.5, 1)))
        this.add(sky)

        const wall = new Actor()
        wall.graphics.use(Resources.Scene2Wall.toSprite())
        wall.scale = new Vector(0.8, 0.8)
        wall.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 1.8)
        wall.addComponent(new ParallaxComponent(new Vector(.51, 1)))
        this.add(wall)

        const ground = new Actor()
        ground.graphics.use(Resources.Scene2Floor.toSprite())
        ground.scale = new Vector(0.8, 0.8)
        ground.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 1.8)
        ground.addComponent(new ParallaxComponent(new Vector(0.5, 1)))
        this.add(ground)

        //interactable objects




        this.player = new Player(-200, 850)
        this.add(this.player)
        //pickup items



        //cam on player
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        cam.strategy.elasticToActor(this.player, 0.2, 0.6)

        const foreground = new Actor()
        foreground.graphics.use(Resources.Scene2Foreground.toSprite())
        foreground.scale = new Vector(0.8, 0.8)
        foreground.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        foreground.addComponent(new ParallaxComponent(new Vector(0.52, 1)))
        this.add(foreground)


        const ui = new UI()
        this.add(ui)


    }

    onPostUpdate() {
        //cam offset 
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        const offset = 24
        if (cam && cam.strategy) {
            cam.pos = cam.pos.add(new Vector(50, -offset))
        }

        //cam bounds
        const minX = 800
        const maxX = 2700

        if (cam) {
            cam.pos.x = Math.min(Math.max(cam.pos.x, minX), maxX)
        }
    }


}
