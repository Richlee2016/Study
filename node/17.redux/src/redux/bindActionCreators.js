// let actions = {
//     add(){
//         return {type:types.ADD}
//     },
//     minus(){
//         return {type:types.MINUS}
//     }
// }
//返回一个  dispatch的函数 集合
export default function(actions,dispatch){
    let newActions = {};
    for(let key in actions){
        newActions[key] = () => dispatch(actions[key].apply(null,arguments));
    }
    return newActions;
}