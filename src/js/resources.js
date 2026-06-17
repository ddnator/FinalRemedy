import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Injection } from './objects/injection'

// voeg hier jouw eigen resources toe
const Resources = {
    Zombie: new ImageSource('/images/zombie_placeholder.png'),
    Player: new ImageSource('/images/player_placeholder.png'),
    Bullet: new ImageSource('/images/bullet_placeholder.png'),
    Injection: new ImageSource('/images/injection_placeholder.png'),
    Background1: new ImageSource('/images/background_city_start.png')

}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }