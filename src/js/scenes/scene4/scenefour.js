import { Actor, Engine, Vector, DisplayMode, ParallaxComponent, SolverStrategy, Scene, CollisionType, EdgeCollider } from "excalibur"
import { Resources, ResourceLoader } from '../../resources.js'
import { Player } from '../../objects/player.js'
import { Zombie } from '../../objects/zombie.js'
import { Injection } from '../../objects/injection.js'
import { Floor } from '../../objects/floor.js'
import { UI } from "../../objects/ui.js"
import { InjectionPickup } from "../../objects/injectionpickup.js"
import { BulletPickup } from "../../objects/bulletpickup.js"
import { Quest } from '../../objects/quest.js'
import { Wall } from "../../objects/wall.js"



export class Scenefour extends Scene {

    player
    music = Resources.track4
    onInitialize(engine) {





        const floor = new Floor(10000, 100, 540, 1100)
        this.add(floor)

        const wall1 = new Wall(330, 2000, -470, 1100)
        this.add(wall1)

        const wall2 = new Wall(330, 1000, 3700, 1100)
        this.add(wall2)

        const box = new Floor(250, 200, 2464, 900)
        this.add(box)

        const slope1 = new Actor({
            pos: new Vector(0, 0) // adjust position to match your scene
        })
        slope1.name = 'slope'
        slope1.body.collisionType = CollisionType.Fixed
        slope1.collider.set(new EdgeCollider({
            begin: new Vector(2754, 520),    // bottom left point
            end: new Vector(3004, 450)  // top right point
        }))
        this.add(slope1)

        const slope2 = new Actor({
            pos: new Vector(0, 0) // adjust position to match your scene

        })
        slope2.name = 'slope'
        slope2.body.collisionType = CollisionType.Fixed
        slope2.collider.set(new EdgeCollider({
            begin: new Vector(3004, 450),    // bottom left point
            end: new Vector(3404, 100)  // top right point
        }))
        this.add(slope2)

        const slope3 = new Actor({
            pos: new Vector(0, 0) // adjust position to match your scene
        })
        slope3.name = 'slope'
        slope3.body.collisionType = CollisionType.Fixed
        slope3.collider.set(new EdgeCollider({
            begin: new Vector(3404, 100),    // bottom left point
            end: new Vector(3704, 0)  // top right point
        }))
        this.add(slope3)

        const slope4 = new Actor({
            pos: new Vector(0, 0) // adjust position to match your scene
        })
        slope4.name = 'slope'
        slope4.body.collisionType = CollisionType.Fixed
        slope4.collider.set(new EdgeCollider({
            begin: new Vector(3704, 0),    // bottom left point
            end: new Vector(4000, 0)  // top right point
        }))
        this.add(slope4)


        //Background


        const sky = new Actor()
        sky.graphics.use(Resources.Scene3Sky.toSprite())
        sky.scale = new Vector(0.8, 0.8)
        sky.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 7)
        sky.addComponent(new ParallaxComponent(new Vector(0.5, .9)))
        this.add(sky)

        const wall = new Actor()
        wall.graphics.use(Resources.Scene3Wall.toSprite())
        wall.scale = new Vector(0.8, 0.8)
        wall.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 7)
        wall.addComponent(new ParallaxComponent(new Vector(.51, .9)))
        this.add(wall)


        const ground = new Actor()
        ground.graphics.use(Resources.Scene3Floor.toSprite())
        ground.scale = new Vector(0.8, 0.8)
        ground.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 7)
        ground.addComponent(new ParallaxComponent(new Vector(0.5, .9)))
        this.add(ground)

        const objects = new Actor()
        objects.graphics.use(Resources.Scene3Objects.toSprite())
        objects.scale = new Vector(0.8, 0.8)
        objects.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 7)
        objects.addComponent(new ParallaxComponent(new Vector(0.5, .9)))
        this.add(objects)
        //interactable objects




        this.player = new Player(-200, 850)
        this.add(this.player)
        //pickup items



        //cam on player
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        cam.strategy.elasticToActor(this.player, 0.2, 0.6)


        const shadows = new Actor()
        shadows.graphics.use(Resources.Scene3Shadows.toSprite())
        shadows.scale = new Vector(0.8, 0.8)
        shadows.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 7)
        shadows.addComponent(new ParallaxComponent(new Vector(0.52, 1)))
        this.add(shadows)

        const foreground = new Actor()
        foreground.graphics.use(Resources.Scene3Foreground.toSprite())
        foreground.scale = new Vector(0.8, 0.8)
        foreground.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 7)
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

        // if (Resources.track2.getPlaybackPosition) {
        //     Resources.track2.play()
        // }


    }
    onActivate() {
        this.music.loop = true
        this.music.play()
    }

    onDeactivate() {
        this.music.pause()
    }


}
