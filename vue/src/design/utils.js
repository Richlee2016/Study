export const click = (id,cb) => {
    document.querySelector(id).onclick = () => {
        cb&&cb();
    }
}