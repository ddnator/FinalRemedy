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
    wait
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
                this.wait = 1000
                this.label.text = 'Ah a zombie!'

                break
            case 'Sanity tutorial':
                this.wait = 1500
                this.label.text = '...Guess there is one less to worry about.'
                break
            case 'Cure the zombie':
                this.wait = 1500
                this.label.text = 'Another one bites... the cure? Nevermind-'
                break
            case 'Key room':
                this.wait = 2000
                this.label.text = 'One day im going to open the wrong door,\n i just know it'
                break
            case 'great':
                this.wait = 1500
                this.label.text = "I'm already getting to old for this shit"
                break
                case 'cutscene':
                    this.label.text= "Shit, I can't move my leg"
        }

        parent.addChild(this.label)
        parent.engine.clock.schedule(() => {
            parent.removeChild(this.label)
        }, this.wait)
    }
}