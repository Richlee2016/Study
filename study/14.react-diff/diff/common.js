import { createElement } from "./element";
import diff from "./diff";
import patch from "./patch";

let ul1 = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["1"]),
  createElement("li", { class: "item" }, ["2"]),
  createElement("li", { class: "item" }, ["3"])
]);

let root = ul1.render();

document.body.appendChild(root);
let ul2 = createElement("ul", { class: "list2" }, [
  createElement("li", { class: "item2",style:{width:'100px'}}, ["2"]),
  createElement("li", { class: "item" }, ["2"]),
  createElement("div", { class: "item" }, ["5"]),
  createElement("li", { class: "item5" }, ["4"])
]);

let patches = diff(ul1,ul2);
console.log(patches);

patch(root,patches);
