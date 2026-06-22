import { Label, FontUnit, Font, Color, ScreenElement, Vector } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { UI } from './ui.js'
import { SceneOne } from '../scenes/scene1/sceneone.js'
import { Zombie } from '../objects/zombie.js'
import { Player } from '../objects/player.js'

export class Quest extends ScreenElement {
    label
    currentQuest = 'WASD tutorial'
    player

    constructor() {
        super({})
    }

    onInitialize(engine) {
        this.label = new Label({
            text: 'Press W to jump \nPress A to move left and D to move right\nWalk over the item and press E to pick it up',
            pos: new Vector(-200, 150),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

        this.addChild(this.label)
        const entityList = this.scene.world.entityManager.entities

        entityList.forEach(element => {
            if (element instanceof Player) {
                this.player = element
            }
        })

    }


    onPostUpdate(engine) {

    }

    updateQuest() {
        console.log(this.currentQuest)
        switch (this.currentQuest) {
            case "WASD tutorial":
                this.label.text = 'Press E to pickup items'
                this.currentQuest = 'Pickup tutorial'
            case "pickup tutorial":
                this.label.text = 'Shoot the Zombie by pressing Spacebar'
                this.currentQuest = 'Shoot the zombie'

                const zombie = new Zombie(this.player, -6000, 850)
                this.scene.add(zombie)
        }
    }

}