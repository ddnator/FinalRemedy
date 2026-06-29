import { Label, FontUnit, Font, Color, ScreenElement, Vector } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { UI } from './ui.js'
import { SceneOne } from '../scenes/scene1/sceneone.js'
import { Zombie } from '../objects/zombie.js'
import { Player } from '../objects/player.js'
import { InjectionPickup } from "./injectionpickup.js"
import { Door2 } from "../scenes/scene1/door2.js"
import { KeyPickup } from "./keypickup.js"

export class Dialogue extends ScreenElement {
    label
    engine
    constructor() {
        super({})
        this.label = new Label({
            text: 'setup',
            pos: new Vector(0, 0),
            font: new Font({
                family: 'impact',
                size: 9,
                unit: FontUnit.Px,
                color: Color.White
            })
        })

    }

    onInitialize(engine) {

    }

    updateDialogue(dialogue, parent) {
        this.label.pos.y = -parent.height / 8

        switch (dialogue) {
            case 'shoot the zombie':
                this.label.text = 'Ah a zombie!'
                break
            case 'Sanity tutorial':
                this.label.text = '...Guess there is one less to worry about.'
                break
            case 'Cure the zombie':
                this.label.text = 'Another one bites... the cure? Nevermind-'
                break
            case 'just random':
                this.label.text = 'oh what'
                break
        }

        parent.addChild(this.label)
        parent.engine.clock.schedule(() => {
            parent.removeChild(this.label)
        }, 1000)
    }
}