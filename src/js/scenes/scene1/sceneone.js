import { Actor, Engine, Vector, DisplayMode, ParallaxComponent, SolverStrategy, Scene } from "excalibur"
import { Resources, ResourceLoader } from '../../resources.js'
import { Player } from '../../objects/player.js'
import { Zombie } from '../../objects/zombie.js'
import { Injection } from '../../objects/injection.js'
import { Floor } from '../../objects/floor.js'
import { UI } from "../../objects/ui.js"
import { InjectionPickup } from "../../objects/injectionpickup.js"
import { BulletPickup } from "../../objects/bulletpickup.js"
import { Door1 } from "./door1.js"
import { Quest } from '../../objects/quest.js'
import { Door2 } from "./door2.js"


export class SceneOne extends Scene {
    playerPosition = new Vector(-7800, 800)
    player
    music = Resources.track3
    zombieSpawned = false

    onInitialize(engine) {







        const floor = new Floor(40000, 100, 540, 1100)
        this.add(floor)



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

        //interactable door
        const door1 = new Door1()

        this.add(door1)

        this.player = engine.player


        //pickup items
        const bulletPickupQuest = new BulletPickup(-7000, 1025, true)
        this.add(bulletPickupQuest)


        //cam on player
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        cam.strategy.elasticToActor(this.player, 0.2, 0.6)


        const injection = new InjectionPickup(15000, 1025)
        this.add(injection)


        this.add(engine.ui)


    }



    onPostUpdate() {
        //cam offset 
        const cam = this.currentScene && this.currentScene.camera ? this.currentScene.camera : this.camera
        const offset = 24
        if (cam && cam.strategy) {
            cam.pos = cam.pos.add(new Vector(50, -offset))
        }

        //cam bounds
        const minX = -8000
        const maxX = 15000

        if (cam) {
            cam.pos.x = Math.min(Math.max(cam.pos.x, minX), maxX)
        }
    }

    onActivate() {
        this.add(this.player)
        this.music.loop = true
        this.music.play()
        this.fadeIn()
        this.player.pos = this.playerPosition
        console.log(this.engine.player)

        if (this.player.key == true && this.zombieSpawned == false) {
            const zombie1 = new Zombie(this.player, 12000, 1025)
            this.add(zombie1)
            const zombie2 = new Zombie(this.player, 7000, 1025)
            this.add(zombie2)
            this.zombieSpawned = true
        }

        this.engine.removeScene('gameover');
    }

    onDeactivate() {
        this.fadeOut().then(() => this.music.pause())
        this.player.kill()
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


