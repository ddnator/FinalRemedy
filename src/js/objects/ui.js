import { Actor, Engine, Vector, Keys, DegreeOfFreedom, CollisionType, linear, Label, Font, FontUnit, Color, ScreenElement, Sprite, range, vec, DefaultLoader, SpriteSheet, AnimationStrategy, Animation } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Bullet } from './bullet.js'
import { Zombie } from './zombie.js'
import { Injection } from "./injection.js"
import { Quest } from './quest.js'
import { Player } from './player.js'



export class UI extends ScreenElement {

    healthbar
    player
    currentquest
    inventoryPopup = false
    bulletsLabel
    injectionsLabel
    sanitybar
    sanitybrain

    constructor(player) {
        super({})
    }

    onInitialize(engine) {
        this.pos = new Vector(200, 125)


        this.healthbar = new Actor()
        this.healthbar.pos = new Vector(0, 0)
        this.healthbar.scale = new Vector(0.75, 0.75)
        this.addChild(this.healthbar)
        this.setupAnimations();
        this.firstUpdate = false;
        this.player = engine.currentScene.player

        this.currentquest = new Quest()
        this.addChild(this.currentquest)

        this.sanitybar = new Actor()
        this.sanitybar.graphics.use(Resources.SanityBar.toSprite())
        this.sanitybar.scale = new Vector(2, 2)
        this.sanitybar.pos = new Vector(0, 165)
        this.addChild(this.sanitybar)

        this.sanitybrain = new Actor()
        this.sanitybrain.graphics.use(Resources.SanityBrain.toSprite())
        this.sanitybrain.scale = new Vector(1.5, 1.5)
        this.sanitybrain.pos = new Vector(0, 0)
        this.sanitybar.addChild(this.sanitybrain)

        this.bulletsLabel = new Label({
            text: '0',
            pos: new Vector(700, 800),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.injectionsLabel = new Label({
            text: '0',
            pos: new Vector(500, 800),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
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

    showInventory() {
        const entityList = this.scene.world.entityManager.entities

        entityList.forEach(element => {
            if (element instanceof Player) {
                this.player = element
            }
        });
        this.updateInventory()

        this.addChild(this.bulletsLabel)
        this.addChild(this.injectionsLabel)

        this.player.inventoryShown = true
    }

    updateInventory() {
        let bullets = 0
        let injections = 0
        this.player.inventory.forEach(element => {
            switch (element) {
                case 'bullet':
                    bullets++
                    break
                case 'injection':
                    injections++
                    break
            }
        });
        this.bulletsLabel.text = `Bullets: ${bullets}`
        this.injectionsLabel.text = `Injections: ${injections}`
    }

    hideInventory() {
        this.removeChild(this.bulletsLabel)
        this.removeChild(this.injectionsLabel)
        this.player.inventoryShown = false
    }
    // healthStatus() {
    //     this.healthbar.graphics.use('fine') 
    //     switch(this.player.health)
    // }
}