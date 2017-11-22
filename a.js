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
  // devtools console reports:
  // TypeError: "this" object does not implement interface HTMLElement.
  // Error in b is not caught in a.
  let myJot = document.createElement('my-jot');
  // Properly catching error in b:
  // let myJot = new typpo.Jot;
  document.body.appendChild(
    myJot
  );
  // infojs(['a', 1, { b: 2}, typpo, typpo.b, typpo.Jot.toString()], document.body);
  // infojs((new Error('just kidding')).stack, document.body);
}
catch(e) {
  infojs(e, document.body);
}
