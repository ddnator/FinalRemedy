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
import { Door1 } from "./door1.js"

import { KeyPickup } from "../../objects/keypickup.js"



export class SceneTwo extends Scene {

    player
    music = Resources.track2
    onInitialize(engine) {





        const floor = new Floor(10000, 100, 540, 1100)
        this.add(floor)

        const wall1 = new Wall(330, 2000, -470, 1100)
        this.add(wall1)

        const wall2 = new Wall(330, 2000, 4000, 1100)
        this.add(wall2)

        const wall3 = new Wall(500, 700, 2664, 400)
        this.add(wall3)

        //Background


        const back = new Actor()
        back.graphics.use(Resources.Scene2Background.toSprite())
        back.scale = new Vector(2, 2)
        back.pos = new Vector(engine.screen.resolution.width / 2, engine.screen.resolution.height / 2)
        back.addComponent(new ParallaxComponent(new Vector(0.5, 1)))
        this.add(back)



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

        const door1 = new Door1(200, 640)
        this.add(door1)

        this.player = engine.player
        this.player.pos = new Vector(0,750)
        this.add(this.player)


        // const key1 = new KeyPickup(3300, 500, 'key1')
        const key1 = new KeyPickup(1500, 500, 'key1')
        this.add(key1)
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

        // if (Resources.track2.getPlaybackPosition) {
        //     Resources.track2.play()
        // }


    }
    onActivate() {
        this.music.loop = true
        this.music.play()
        this.fadeIn()
    }

    onDeactivate() {
        this.fadeOut().then(() => this.music.pause())
    }

    fadeIn() {
        this.music.volume = 0
        const fade = setInterval(() => {
            if (this.music.volume < 0.9) {
                this.music.volume += 0.1
            } else {
                this.music.volume = 1
                clearInterval(fade)
            }
        }, 100)
    }

    fadeOut() {
        return new Promise(resolve => {
            const fade = setInterval(() => {
                if (this.music.volume > 0.1) {
                    this.music.volume -= 0.1
                } else {
                    this.music.volume = 0
                    clearInterval(fade)
                    resolve()
                }
            }, 100)
        })
    }
}
