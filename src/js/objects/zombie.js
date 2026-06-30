import { Actor, Engine, Vector, CollisionType, DegreeOfFreedom, Scene, Sound, SpriteSheet, Sprite, range, AnimationStrategy, Animation } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from "./player.js"
import { Quest } from "./quest.js"
import { UI } from './ui.js'
import { Bullet } from "./bullet.js"

export class Zombie extends Actor {
    health = 100
    healed = false
    x
    y
    quest
    animBusy

    constructor(player, x, y, quest) {
        super({
            width: 35,
            height: Resources.ZombieWalk.height
        })
        this.player = player
        this.body.collisionType = CollisionType.Active
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation)
        this.x = x
        this.y = y

        this.quest = quest


        this.scale = new Vector(0.9, 0.9)


    }

    onInitialize(engine) {

        this.setupAnimations();

        this.graphics.use('walk')
        this.scale = new Vector(4.5, 4.5)
        this.pos = new Vector(this.x, this.y)
    }

    onPostUpdate(engine) {
        if (this.health <= 0 && this.animBusy == false) {
            this.kill()
            this.lowerSanity()

            if (this.quest == 'tutorial zombie') {
                const entityList = this.scene.world.entityManager.entities

                entityList.forEach(element => {
                    if (element instanceof Quest) {
                        this.quest = element
                    }
                })
                this.quest.updateQuest()
            }
        }
        this.healChecker()
    }

    lowerSanity() {
        const entityList = this.scene.world.entityManager.entities

        const player = entityList.find((entity) => entity instanceof Player)
        const ui = entityList.find((entity) => entity instanceof UI)
        player.sanity -= 10
        ui.sanitybrain.pos = new Vector((player.sanity - 50) * 0.7, 0)
    }

    healChecker() {
        if (this.healed === false) {
            this.walkToPlayer()

            // const sprite = Resources.Zombie.toSprite()
            // this.scale = new Vector(0.9, 0.9)

            // this.graphics.use(sprite)

        } else {

            if (this.quest == 'tutorial injection zombie') {
                const entityList = this.scene.world.entityManager.entities

                entityList.forEach(element => {
                    if (element instanceof Quest) {
                        this.quest = element
                    }
                })
                this.quest.updateQuest()
            }
            const sprite = Resources.Player.toSprite()
            Resources.zombieHeal.play()

            this.scale = new Vector(4.5, 4.5)
            this.graphics.use(sprite)

            this.body.collisionType = CollisionType.PreventCollision

            this.walkAway()
            // this.vel = new Vector(700, 0)
            this.health = 500
            this.events.on("exitviewport", (e) => this.kill())

        }
    }

    walkAway() {
        if (this.player.pos.x > this.pos.x) {
            this.vel = new Vector(-700, 0)
            this.graphics.flipHorizontal = true

        } else {

            this.vel = new Vector(700, 0)
            this.graphics.flipHorizontal = false

        }


    }

    onCollisionStart(event, other) {
        if (other.owner instanceof Player) {
            this.attackPlayer()
        } else if (other.owner instanceof Bullet) {
            this.hitAnim.reset();
            this.graphics.use("hit");
            this.animBusy = true
            this.hitAnim.events.once("end", () => {
                console.log("Hit animation ended");
                this.graphics.use("walk");
                this.animBusy = false
            });
        }
    }

    attackPlayer() {
        // hier de image van hit player
        if (!this.healed) {
            this.player.health = this.player.health - 25
        }
    }

    getHit() {


        this.health -= 50;
        Resources.zombieHit.play();


    }

    walkToPlayer() {
        if (!this.player || this.animBusy) {
            this.vel = Vector.Zero;
            return;
        }

        const direction = this.player.pos.sub(this.pos).normalize()

        this.vel = new Vector(direction.x * 110, this.vel.y)

        if (direction.x < 0) {
            this.graphics.flipHorizontal = true
        } else if (direction.x > 0) {
            this.graphics.flipHorizontal = false
        }



    }

    setupAnimations() {
        const configGrid1 = {
            rows: 1,
            columns: 6,
            spriteWidth: 73,
            spriteHeight: 102
        };

        const configGrid2 = {
            rows: 1,
            columns: 3,
            spriteWidth: 73,
            spriteHeight: 102
        };

        const ZombieWalkSheet = SpriteSheet.fromImageSource({
            image: Resources.ZombieWalk,
            grid: configGrid1
        });

        const ZombieHitSheet = SpriteSheet.fromImageSource({
            image: Resources.ZombieHit,
            grid: configGrid2
        });


        this.walkAnim = Animation.fromSpriteSheet(ZombieWalkSheet, range(0, 5), 120, AnimationStrategy.Loop);
        this.walkAnim.scale = new Vector(1, 1)

        this.hitAnim = Animation.fromSpriteSheet(ZombieHitSheet, range(0, 2), 120, AnimationStrategy.End);
        this.hitAnim.scale = new Vector(1, 1)

        this.graphics.add('hit', this.hitAnim)
        this.graphics.add('walk', this.walkAnim)

    }




}

