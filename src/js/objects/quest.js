import { Label, FontUnit, Font, Color, ScreenElement, Vector, TextAlign } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { UI } from './ui.js'
import { SceneOne } from '../scenes/scene1/sceneone.js'
import { Zombie } from '../objects/zombie.js'
import { Player } from '../objects/player.js'
import { InjectionPickup } from "./injectionpickup.js"
import { Door2 } from "../scenes/scene1/door2.js"
import { KeyPickup } from "./keypickup.js"

export class Quest extends ScreenElement {
    label
    currentQuest = 'WASD tutorial'
    player
    engine
    constructor() {
        super({})
    }

    onInitialize(engine) {
        this.label = new Label({
            text: 'Press W to jump and C to crouch \nPress A to move left and D to move right\nWalk over the item and press E to pick it up',
            pos: new Vector(1750, -50),
            font: new Font({
                family: 'impact',
                textAlign: TextAlign.Right,
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.engine = engine

        this.scene.engine.clock.schedule(() => {
            const entityList = this.scene.world.entityManager.entities

            entityList.forEach(element => {
                if (element instanceof Player) {
                    this.player = element

                }
            })
        }, 500)

        this.addChild(this.label)

    }

    updateQuest() {
        switch (this.currentQuest) {
            case "WASD tutorial":
                this.player.stuck = true
                this.label.text = 'Press 1 to switch to your pistol'
                this.currentQuest = 'Pistol tutorial'
                break

            case "Pistol tutorial":
                this.player.stuck = false
                this.label.text = 'Shoot the Zombie by pressing Spacebar'
                this.currentQuest = 'Shoot the zombie'

                this.engine.player.dialogue.updateDialogue('shoot the zombie', this.engine.player)

                const zombie = new Zombie(this.player, -6000, 850, 'tutorial zombie')
                this.scene.add(zombie)
                break

            case "Shoot the zombie":
                this.player.stuck = true
                this.label.text = 'Killing zombies decrease your sanity, try to avoid killing too many zombies\n Using syringes to cure the zombies instead does not decrease your sanity\n Press Enter to continue'
                this.currentQuest = 'Sanity tutorial'
                break

            case "Sanity tutorial":
                this.player.stuck = false
                this.label.text = 'Walk over to the injection and pick it up by pressing E'
                this.currentQuest = 'Injection pickup tutorial'

                const injection = new InjectionPickup(-6000, 850, 'tutorial injection')
                this.scene.add(injection)
                break

            case "Injection pickup tutorial":
                this.label.text = 'Press 2 to switch to your injection'
                this.currentQuest = 'Cure the zombie'
                this.player.stuck = true
                break


            case 'Cure the zombie':
                this.label.text = 'Walk towards the zombie with the injection in hand to cure the zombie'
                this.currentQuest = 'Curing the zombie'
                this.player.stuck = false

                const zombie2 = new Zombie(this.player, -4000, 850, 'tutorial injection zombie')
                this.scene.add(zombie2)
                break

            // case "Curing the zombie":
            //     this.label.text = 'Well done! Press Enter to continue'
            //     this.currentQuest = 'Compliment'
            //     this.player.stuck = true
            //     break

            case 'Curing the zombie':
                this.label.text = 'Press B to check your inventory'
                this.currentQuest = 'Inventorian'
                this.player.stuck = true
                break

            case "Inventorian":
                this.label.text = 'Find your way to the city'
                this.currentQuest = 'Cityseeking'
                this.player.stuck = false

                const door2 = new Door2(this.player, 'door2locked')
                this.scene.add(door2)
                break

            case "Cityseeking":
                this.label.text = 'Find the key to the door'
                this.currentQuest = 'Keyfinder'
                this.player.stuck = false



                break

            case "Keyfinder":
                this.label.text = 'Open the door'
                this.currentQuest = 'Doorio'
                this.player.stuck = false
                break

            case "Doorio":
                this.label.text = 'Explore'
                this.currentQuest = 'Climb'
                this.player.stuck = false
                break

            case "Climb":
                this.label.text = 'Survive!'
                this.currentQuest = 'Survival'
                this.player.stuck = false
                break

            case "Survival":
                this.label.text = 'Explore'
                this.currentQuest = 'Back on track'
                this.player.stuck = false
                break



        }
    }
}