import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType, linear, ScreenElement, Sprite, range, vec, DefaultLoader, SpriteSheet, AnimationStrategy, Animation } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'
import { Zombie } from './zombie.js'
import { Injection } from "./injection.js"
import { Quest } from './quest.js'



export class UI extends ScreenElement {

    healthbar
    player
    currentquest

    constructor(player) {
        super({})




    }

    onInitialize(engine) {
        this.pos = new Vector(250, 150)


        this.healthbar = new Actor()
        this.healthbar.pos = new Vector(0, 0)
        this.addChild(this.healthbar)
        this.setupAnimations();
        this.firstUpdate = false;
        this.player = engine.currentScene.player

        this.currentquest = new Quest()
        this.addChild(this.currentquest)
    }

    onPostUpdate(engine) {


        if (this.player.health > 60) {
            ///let sprite = Resources.HealthbarFine.load()
            ///this.healthbar.graphics.use(sprite)

            this.healthbar.graphics.use('fine')


        } else if (this.player.health > 30 && this.player.health < 60) {
            this.healthbar.graphics.use('caution')
        } else {
            this.healthbar.graphics.use('danger')
        }


    }

    setupAnimations() {
        const configGrid = {
            rows: 1,
            columns: 42,
            spriteWidth: 320,
            spriteHeight: 160
        }

        const frameSpeed = 60;

        const healthFineSheet = SpriteSheet.fromImageSource({
            image: Resources.HealthbarFine,
            grid: configGrid
        });


        const fineAnim = Animation.fromSpriteSheet(healthFineSheet, range(0, 41), frameSpeed, AnimationStrategy.Loop);
        fineAnim.scale = new Vector(2, 2)

        const healthCautionSheet = SpriteSheet.fromImageSource({
            image: Resources.HealthbarCaution,
            grid: configGrid
        });

        const cautionAnim = Animation.fromSpriteSheet(healthCautionSheet, range(0, 41), frameSpeed, AnimationStrategy.Loop);
        cautionAnim.scale = new Vector(2, 2)

        const healthDangerSheet = SpriteSheet.fromImageSource({
            image: Resources.HealthbarDanger,
            grid: configGrid
        });

        const dangerAnim = Animation.fromSpriteSheet(healthDangerSheet, range(0, 41), frameSpeed, AnimationStrategy.Loop);
        dangerAnim.scale = new Vector(2, 2)


        this.healthbar.graphics.add('fine', fineAnim)



        this.healthbar.graphics.add('caution', cautionAnim)
        this.healthbar.graphics.add('danger', dangerAnim)

        this.healthbar.graphics.use('fine')




    }

    // healthStatus() {
    //     this.healthbar.graphics.use('fine') 
    //     switch(this.player.health)
    // }
}