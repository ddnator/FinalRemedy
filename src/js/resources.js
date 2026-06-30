import { ImageSource, Sound, Resource, Loader, Gif } from 'excalibur'
import { Injection } from './objects/injection'

// voeg hier jouw eigen resources toe
const Resources = {

    //player
    Player: new ImageSource('images/player_placeholder.png'),
    PlayerShoot: new ImageSource('images/player_shoot.png'),
    PlayerIdle: new ImageSource('images/player_idle.png'),
    PlayerWalk: new ImageSource('images/player_walk.png'),
    PlayerCrouch: new ImageSource('images/player_crouch.png'),

    //zombies
    ZombieWalk: new ImageSource('/images/zomboi_walk.png'),
    ZombieHit: new ImageSource('images/zomboi_hit.png'),
    ZombieCured: new ImageSource('images/no_zomboi_walk.png'),

    //player sounds
    shoot: new Sound('sounds/objects/gunshot.mp3'),
    zombieHeal: new Sound('sounds/objects/zombieheal.mp3'),
    zombieHit: new Sound('sounds/objects/zombiehit.mp3'),



    //music
    track1: new Sound('sounds/music/BeingaMan.mp3'),
    track2: new Sound('sounds/music/TheFollowing.mp3'),
    track3: new Sound('sounds/music/TheMission.mp3'),
    track4: new Sound('sounds/music/Mood02.mp3'),

    //items
    KeyPickup: new ImageSource('images/items/keypickup.png'),
    Bullet: new ImageSource('images/items/bullet.png'),
    Injection: new ImageSource('images/items/injection1.png'),
    BulletPickUp: new ImageSource('images/items/bulletpickup.png'),
    InjectionPickUp: new ImageSource('images/items/injection1.png'),

    //Prompts
    PressE: new ImageSource('images/prompts/PressE.png'),


    //UI
    HealthbarFine: new ImageSource('images/ui/ui_fine_healthbar.png'),
    HealthbarCaution: new ImageSource('images/ui/ui_caution_healthbar.png'),
    HealthbarDanger: new ImageSource('images/ui/ui_danger_healthbar.png'),
    SanityBar: new ImageSource('images/ui/sanity_bar.png'),
    SanityBrain: new ImageSource('images/ui/sanity_brain.png'),



    //Scene 1
    //Background
    BlackScreen: new ImageSource('images/scene1/blackscreen.png'),
    Scene1Sky: new ImageSource('images/scene1/backgroundImages/S-1-Sky.png'),
    Scene1Back: new ImageSource('images/scene1/backgroundImages/S-1-backBuildings.png'),
    Scene1Buildings2: new ImageSource('images/scene1/backgroundImages/S-1-Buildings-2.png'),
    Scene1Buildings1: new ImageSource('images/scene1/backgroundImages/S-1-Buildings-1.png'),
    Scene1Street: new ImageSource('images/scene1/backgroundImages/S-1-Street.png'),
    //Doors
    Scene1Door1: new ImageSource('images/scene1/doors/S-1-door-1.png'),
    Scene1Door2: new ImageSource('images/scene1/doors/S-1-door-2.png'),

    //Scene 2
    //Background
    Scene2Background: new ImageSource('images/scene2/backgroundImages/S-2-InsBackEx.png'),
    Scene2Sky: new ImageSource('images/scene2/backgroundImages/S-2-Sky.png'),
    Scene2Foreground: new ImageSource('images/scene2/backgroundImages/S-2-Foreground.png'),
    Scene2Wall: new ImageSource('images/scene2/backgroundImages/S-2-Wall.png'),
    Scene2Floor: new ImageSource('images/scene2/backgroundImages/S-2-Floor.png'),


    //Scene 3
    //Background
    Scene3Sky: new ImageSource('images/scene3/backgroundImages/S-3-Sky.png'),
    Scene3Foreground: new ImageSource('images/scene3/backgroundImages/S-3-Foreground.png'),
    Scene3Wall: new ImageSource('images/scene3/backgroundImages/S-3-Wall.png'),
    Scene3Floor: new ImageSource('images/scene3/backgroundImages/S-3-Floor.png'),
    Scene3Objects: new ImageSource('images/scene3/backgroundImages/S-3-Objects.png'),
    Scene3Shadows: new ImageSource('images/scene3/backgroundImages/S-3-Shadows.png'),


    //Scene 4
    //Background
    Scene4Sky: new ImageSource('images/scene4/backgroundImages/S-4-Sky.png'),
    Scene4Buidings: new ImageSource('images/scene4/backgroundImages/S-4-Buildings.png'),
    Scene4Back: new ImageSource('images/scene4/backgroundImages/S-4-Back.png'),
    Scene4Buildings1: new ImageSource('images/scene4/backgroundImages/S-4-Buildings-1.png'),
    Scene4Buildings2: new ImageSource('images/scene4/backgroundImages/S-4-Buildings-2.png'),



}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}



export { Resources, ResourceLoader }