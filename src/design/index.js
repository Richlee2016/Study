import {click} from "./utils"
/**
 * PubSub
 */
import PubSub from "./pubsub"

export const PubSubTest = () => {
    const pubsub = new PubSub();

    click("#PubListen",() => {
        pubsub.create("go").listen("test",function(){
            console.log(1);
        })
    })
    click("#PubTriggerName",() => {
        pubsub.create("go").trigger("test")
    })
    click("#PubTrigger",() => {
        pubsub.trigger("test")
    })

    click("#PubRemove",() => {
        pubsub.remove("test")
    })
    
}