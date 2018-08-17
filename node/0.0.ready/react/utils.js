/**
 * style
 * value
 * *
 */
export const setAttr = (el, attr, val) => {
  switch (attr) {
    case "style":
      el.style.cssText = val;
      break;

    case "value":
      const tagName = el.tagName.toLoverCase();
      if (tagName == "input" || tagName == "textarea") {
        el.value = val;
      }
      break;
    default:
      el.setAttribute(attr, val);
      break;
  }
};

