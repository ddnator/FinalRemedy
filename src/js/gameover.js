import { Scene, Actor, Vector, Label, Color, Keys, Font, FontUnit, Rectangle } from 'excalibur'
import { Game } from './game'
import { SceneOne } from './scenes/scene1/sceneone'

export class GameOver extends Scene {
    constructor() {
        super()

    }

    onInitialize(engine) {
        const w = engine.drawWidth
        const h = engine.drawHeight

        const backdrop = new Actor({
            x: w / 2,
            y: h / 2,
            width: w,
            height: h
        })
        const rect = new Rectangle({ width: w, height: h, color: Color.Black })
        rect.opacity = 0.5
        backdrop.graphics.use(rect)
        this.add(backdrop)

        const deathmessage = new Label({
            text: 'You are dead.',
            pos: new Vector(w / 2.5, h / 2.5),
            font: new Font({ family: 'Arial', size: 80, color: Color.Red, unit: FontUnit.Px })

        })

        const tryagainmessage = new Label({
            text: 'Press R to try again!',
            pos: new Vector(w / 2.3, 800),
            font: new Font({ family: 'Arial', size: 40, color: Color.Red, unit: FontUnit.Px })
        })
        tryagainmessage.textAlign = 'center'
        deathmessage.textAlign = 'center'
        this.add(deathmessage)
        this.add(tryagainmessage)


    }

    onPostUpdate(engine) {
        this.keyChecker(engine)
    }

    keyChecker(engine) {
        if (engine.input.keyboard.wasPressed(Keys.R)) {
            window.location.reload()
        }
    }





}

