import createElement from "./createElement";
import diff from "./diff";

class Element {
  constructor(tagName, key, children) {
    this.tagName = tagName;
    this.key = key;
    this.children = children;
  }

  render() {
    let element = document.createElement(this.tagName);
    element.innerHTML = this.children;
    element.setAttribute("key", this.key);
    console.log("render");
    return element;
  }
}

function el(tagName, key, children) {
  return new Element(tagName, key, children);
}

const app1 = [
  el("li", "A", "A"),
  el("li", "B", "B"),
  el("li", "C", "C"),
  el("li", "E", "D")
];

const app2 = [
  el("li", "A", "A"),
  el("li", "R", "B"),
  el("li", "C", "C"),
  el("li", "D", "D")
];

const patchs = diff(app1, app2);

console.log(patchs);
