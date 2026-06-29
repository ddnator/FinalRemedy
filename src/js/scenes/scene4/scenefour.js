import { Actor, Engine, Vector, DisplayMode, ParallaxComponent, SolverStrategy, Scene, CollisionType, EdgeCollider } from "excalibur"
import { Resources, ResourceLoader } from '../../resources.js'
import { Player } from '../../objects/player.js'
import { Zombie } from '../../objects/zombie.js'
import { Injection } from '../../objects/injection.js'
import { UI } from "../../objects/ui.js"
import { InjectionPickup } from "../../objects/injectionpickup.js"
import { BulletPickup } from "../../objects/bulletpickup.js"
import { Quest } from '../../objects/quest.js'
import { Wall } from "../../objects/wall.js"
import { Floor } from "../../objects/floor.js"
import { KillBox } from "../../objects/killbox.js"
import { SceneOne } from "../scene1/sceneone.js"



export class Scenefour extends Scene {
    playerPosition = new Vector(-78, 835)
    player
    music = Resources.track4
    ui


    onInitialize(engine) {



        const roof1 = new Floor(1000, 100, 35, 1100)
        this.add(roof1)

        const wall1 = new Wall(330, 2000, -470, 1100)
        this.add(wall1)

        const slope1 = new Actor({
            pos: new Vector(0, 0) // adjust position to match your scene
        })
        slope1.name = 'slope'
        slope1.body.collisionType = CollisionType.Fixed
        slope1.collider.set(new EdgeCollider({
            begin: new Vector(535, 1050),    // bottom left point
            end: new Vector(1100, 920)  // top right point
        }))
        this.add(slope1)

        const roof2 = new Floor(2300, 100, 2400, 970)
        this.add(roof2)

        const roof3 = new Floor(1900, 100, 5500, 890)
        this.add(roof3)

        const killbox = new KillBox(10000, 100, 540, 1500)
        this.add(killbox)


        //Background


        const sky = new Actor()
        sky.graphics.use(Resources.Scene4Sky.toSprite())
        sky.scale = new Vector(0.8, 0.8)
        sky.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 5)
        sky.addComponent(new ParallaxComponent(new Vector(0.5, .4)))
        this.add(sky)

        const buildings1 = new Actor()
        buildings1.graphics.use(Resources.Scene4Buildings1.toSprite())
        buildings1.scale = new Vector(0.8, 0.8)
        buildings1.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        buildings1.addComponent(new ParallaxComponent(new Vector(0.5, .5)))
        this.add(buildings1)

        const buildings2 = new Actor()
        buildings2.graphics.use(Resources.Scene4Buildings2.toSprite())
        buildings2.scale = new Vector(0.8, 0.8)
        buildings2.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        buildings2.addComponent(new ParallaxComponent(new Vector(0.5, .5)))
        this.add(buildings2)

        const back = new Actor()
        back.graphics.use(Resources.Scene4Back.toSprite())
        back.scale = new Vector(0.8, 0.8)
        back.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 1.5)
        back.addComponent(new ParallaxComponent(new Vector(0.5, .9)))
        this.add(back)



        //interactable objects



        this.player = engine.player
        this.player.pos = this.playerPosition
        this.add(this.player)
        //pickup items



        //cam on player
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        cam.strategy.elasticToActor(this.player, 0.2, 0.6)


        const buildings = new Actor()
        buildings.graphics.use(Resources.Scene4Buidings.toSprite())
        buildings.scale = new Vector(0.8, 0.8)
        buildings.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 1.5)
        buildings.addComponent(new ParallaxComponent(new Vector(.51, .9)))
        this.add(buildings)

        this.ui = engine.ui
        // this.ui.z = 9999
        this.add(this.ui)


        for (let i = 0; i < 5; i++) {
            const bullet = new BulletPickup(108, 950)
            this.add(bullet)
        }


        for (let i = 0; i < 2; i++) {
            const injection = new InjectionPickup(25, 950)
            this.add(injection)
        }

        // const zombie1 = new Zombie(this.player, 1020, 840)
        // this.add(zombie1)
        // const zombie2 = new Zombie(this.player, 1200, 860)
        // this.add(zombie2)

        // const zombie3 = new Zombie(this.player, 3600, 700)
        // this.add(zombie3)



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
        const maxX = 5300

        if (cam) {
            cam.pos.x = Math.min(Math.max(cam.pos.x, minX), maxX)
        }

        if (this.player.pos.x > 5900) {

            this.engine.goToScene('sceneone')
            this.player.cutscene = true

        }
        // if (Resources.track2.getPlaybackPosition) {
        //     Resources.track2.play()
        // }


    }



    onActivate() {
        this.music.loop = true
        this.music.play()

        if (this.ui && this.ui.currentquest && this.ui.currentquest.currentQuest === 'Climb') {
            this.ui.currentquest.updateQuest()
        }
    }

    onDeactivate() {
        this.music.pause()
    }


}
