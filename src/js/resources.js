import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Injection } from './objects/injection'

// voeg hier jouw eigen resources toe
const Resources = {
    Zombie: new ImageSource('/images/zombie_placeholder.png'),
    Player: new ImageSource('/images/player_placeholder.png'),
    Bullet: new ImageSource('/images/bullet_placeholder.png'),
    Injection: new ImageSource('/images/injection_placeholder.png'),
    Background1: new ImageSource('/images/background_city_start.png'),
    HealthbarFine: new ImageSource('/images/fine_healthbar.png'),
    HealthbarCaution: new ImageSource('/images/caution_healthbar.png'),
    HealthbarDanger: new ImageSource('/images/danger_healthbar.png'),
    //Scene 1
    Scene1Sky: new ImageSource('/images/scene1/backgroundImages/S-1-Sky.png'),
    Scene1Back: new ImageSource('/images/scene1/backgroundImages/S-1-backBuildings.png'),
    Scene1Buidings2: new ImageSource('/images/scene1/backgroundImages/S-1-Buildings-2.png'),
    Scene1Buildings1: new ImageSource('/images/scene1/backgroundImages/S-1-Buildings-1.png'),
    Scene1Street: new ImageSource('/images/scene1/backgroundImages/S-1-Street.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }