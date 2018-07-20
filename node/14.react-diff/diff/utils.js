let utils = {
    setAttr(element, attr, value) {
      switch (attr) {
        case "style":
          element.style.cssText = value;
          break;
        case "value":
          let tagName = element.tagName.toLowerCase();
          if (tagName == "input" || tagName == "textarea") {
            element.value = value;
          } else {
            element.setAttribute(attr, value);
          }
          break;
        default:
          element.setAttribute(attr, value);
          break;
      }
    },
    isString(str){
        return typeof str === 'string'?true : false
    },
    ATTRS:"ATTRS",
    TEXT:"TEXT",
    REPLACE:"REPLACE",
    REMOVE:"REMOVE"
  };
  
export default utils;
  