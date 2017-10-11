'use strict';

// import { Jot, b } from './b.js';
import typpo from './b.js';
import { infojs } from './info-module.js';

let a = 1;
export default a;

try {
  console.log(typpo.a, typpo.b);

  if (!customElements.get('my-jot')) {
    customElements.define('my-jot', typpo.Jot);
  }
  // TypeError: "this" object does not implement interface HTMLElement.
  // let myJot = document.createElement('my-jot');
  let myJot = new typpo.Jot;
  document.body.appendChild(
    myJot
  );
  // infojs(['a', 1, { b: 2}, typpo, typpo.b, typpo.Jot.toString()], document.body);
  // infojs((new Error('just kidding')).stack, document.body);
}
catch(e) {
  infojs(e, document.body);
}
