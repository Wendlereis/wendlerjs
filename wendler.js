function createTextElement(value) {
  return createElement('TEXT_ELEMENT', { nodeValue: value })
}

function createElement(type, config, ...children) {
  const props = Object.assign({}, config);
  const hasChildren = children.length > 0;

  const rawChildren = hasChildren ? [].concat(...children) : []
  
  props.children = rawChildren
    .filter(child => child !== null && child !== false)
    .map(child => child instanceof Object ? child : createTextElement(child))

  return { type, props };
}

function render(element, node) {
  const { type, props } = element;
  const dom = document.createElement(type);

  const isThisPropListener = (name) => name.startsWith("on");
  const isThisPropAttribute = (name) =>
    !isThisPropListener(name) && name != "children";

  Object.keys(props).map((item) => {
    // add events
    if (isThisPropListener(item)) {
      const eventName = item.toLocaleLowerCase().substring(2);
      dom.addEventListener(eventName, props[item]);
    }

    // add attributes
    if (isThisPropAttribute(item)) {
      dom[item] = props[item];
    }
  });

  const childs = props.children || [];

  childs.forEach((childElement) => render(childElement, dom));

  node.appendChild(dom);
}

export { render, createElement };