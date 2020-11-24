/** @jsx createElement */
import { render, createElement } from './wendler.js'

const jsxElement = (
  <div id="container">
    <a href="/wendler">Wendler</a>
  </div>
);

render(jsxElement, document.getElementById("root"));
