const element = {
  type: "div",
  props: {
    id: "container",
    onclick: () => {
      console.log("milgrau");
    },
    children: [
      {
        type: "a",
        props: {
          href: "/wendler",
        },
      },
    ],
  },
};

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

render(element, document.getElementById("root"));
