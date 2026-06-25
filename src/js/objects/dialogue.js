import { Label, FontUnit, Font, Color, ScreenElement, Vector } from "excalibur"
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
    player

    constructor() {
        super({})
    }

    onInitialize(engine) {
        this.label = new Label({
            text: '',
            pos: new Vector(950, -50),
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
    }

    updateDialogue() {
        
    }
}