/** @jsx createElement */
function createTextElement(value) {
  return createElement('TEXT_ELEMENT', {
    nodeValue: value
  });
}

function createElement(type, config) {
  var props = Object.assign({}, config);

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var hasChildren = children.length > 0;
  var rawChildren = hasChildren ? [].concat(...children) : [];
  props.children = rawChildren.filter(child => child !== null && child !== false).map(child => child instanceof Object ? child : createTextElement(child));
  return {
    type,
    props
  };
}

function render(element, node) {
  var {
    type,
    props
  } = element;
  var isTextElement = type === 'TEXT_ELEMENT';
  var dom = isTextElement ? document.createTextNode('') : document.createElement(type);

  var isThisPropListener = name => name.startsWith('on');

  var isThisPropAttribute = name => !isThisPropListener(name) && name != 'children';

  Object.keys(props).map(item => {
    // add events
    if (isThisPropListener(item)) {
      var eventName = item.toLocaleLowerCase().substring(2);
      dom.addEventListener(eventName, props[item]);
    } // add attributes


    if (isThisPropAttribute(item)) {
      dom[item] = props[item];
    }
  });
  var childs = props.children || [];
  childs.forEach(childElement => render(childElement, dom));
  node.appendChild(dom);
}

var jsxElement = createElement("div", {
  id: "container"
}, createElement("a", {
  href: "/wendler"
}, "Wendler"));
render(jsxElement, document.getElementById('root'));