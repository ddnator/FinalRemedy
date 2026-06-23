import { ImageSource, Sound, Resource, Loader, Gif } from 'excalibur'
import { Injection } from './objects/injection'

// voeg hier jouw eigen resources toe
const Resources = {

    //player
    Player: new ImageSource('/images/player_placeholder.png'),
    PlayerShoot: new ImageSource('/images/player_shoot.png'),

    //player sounds
    gunshot: new Sound('/sounds/objects/gunshot.mp3'),


    Zombie: new ImageSource('/images/zombie_placeholder.png'),
    Bullet: new ImageSource('/images/bullet_placeholder.png'),
    Injection: new ImageSource('/images/injection_placeholder.png'),
    Background1: new ImageSource('/images/background_city_start.png'),
    BulletPickUp: new ImageSource('images/bulletpickup.png'),
    InjectionPickUp: new ImageSource('images/injectionpickup.png'),

    //Prompts
    PressE: new ImageSource('images/prompts/PressE.png'),


    //UI
    HealthbarFine: new ImageSource('/images/ui_fine_healthbar.png'),
    HealthbarCaution: new ImageSource('/images/ui_caution_healthbar.png'),
    HealthbarDanger: new ImageSource('/images/ui_danger_healthbar.png'),
    SanityBar: new ImageSource('/images/sanity_bar.png'),
    SanityBrain: new ImageSource('/images/sanity_brain.png'),



    //Scene 1
    //Background
    Scene1Sky: new ImageSource('/images/scene1/backgroundImages/S-1-Sky.png'),
    Scene1Back: new ImageSource('/images/scene1/backgroundImages/S-1-backBuildings.png'),
    Scene1Buildings2: new ImageSource('/images/scene1/backgroundImages/S-1-Buildings-2.png'),
    Scene1Buildings1: new ImageSource('/images/scene1/backgroundImages/S-1-Buildings-1.png'),
    Scene1Street: new ImageSource('/images/scene1/backgroundImages/S-1-Street.png'),
    //Doors
    Scene1Door1: new ImageSource('/images/scene1/doors/S-1-door-1.png'),
    Scene1Door2: new ImageSource('/images/scene1/doors/S-1-door-2.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }