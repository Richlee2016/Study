export default function(actions,dispatch){
    let newActions = {};
    for (const key in actions) {
        newActions[key] = () => dispatch(actions[key].apply(null,arguments));
    }
    return newActions;
}