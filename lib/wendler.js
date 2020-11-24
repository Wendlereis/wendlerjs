"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.createElement = createElement;

function createTextElement(value) {
  return createElement('TEXT_ELEMENT', {
    nodeValue: value
  });
}

function createElement(type, config) {
  const props = Object.assign({}, config);

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  const hasChildren = children.length > 0;
  const rawChildren = hasChildren ? [].concat(...children) : [];
  props.children = rawChildren.filter(child => child !== null && child !== false).map(child => child instanceof Object ? child : createTextElement(child));
  return {
    type,
    props
  };
}

function render(element, node) {
  const {
    type,
    props
  } = element;
  const dom = document.createElement(type);

  const isThisPropListener = name => name.startsWith("on");

  const isThisPropAttribute = name => !isThisPropListener(name) && name != "children";

  Object.keys(props).map(item => {
    // add events
    if (isThisPropListener(item)) {
      const eventName = item.toLocaleLowerCase().substring(2);
      dom.addEventListener(eventName, props[item]);
    } // add attributes


    if (isThisPropAttribute(item)) {
      dom[item] = props[item];
    }
  });
  const childs = props.children || [];
  childs.forEach(childElement => render(childElement, dom));
  node.appendChild(dom);
}