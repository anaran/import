'use strict';

function getAllPropertyNames(obj, props = []) {
  if (obj.constructor.name == 'Object') {
    return props.length ? props : null;
  } else {
    return getAllPropertyNames(Object.getPrototypeOf(obj), props.concat(Object.getOwnPropertyNames(obj)));
  }
}

function reportError(error) {
  let reportingNode = document.getElementById('b-error');
  reportingNode.textContent += JSON.stringify(error, getAllPropertyNames(error), 2);
}

class Jot extends HTMLElement {
  constructor() {
    try {
      super();
      this._shadow = this.attachShadow({ mode: 'open' });
      // this._shadow = this;
      this._shadow.innerHTML = `
        <section>
        <span>&times;</span>
        <pre contenteditable="true">
        Jot
      </pre>
        <textarea placeholder="typing crashes tab on linux"></textarea>
        <input type="text" placeholder="characters get duplicated on android">
        <div contenteditable="true">
        </div>
        </section>
        <!--
      -->
        <style>
        :host pre::before {
          content: " :host pseudo-class IS now supported in this browser!"
        }
        /* :host pseudo-class not supported in firefox yet,
           using section as a workaround. See also
           https://bugzilla.mozilla.org/show_bug.cgi?id=992245
        */
      section {
        background-color: silver;
        opacity: 0.9;
        position: fixed;
        top: 25%;
        left: 25%;
        z-idex: 1000;
      }
      span {
        right: 0;
        top: 0;
        position: absolute;
      }
      </style>
        `;
      this._close = this._shadow.querySelector('span');
      this._pre = this._shadow.querySelector('pre');
      this._ta = this._shadow.querySelector('textarea');
      this._div = this._shadow.querySelector('div');
      this._div.textContent = 'characters do not get inserted';
      this._pre.addEventListener('focus', event => {
        let s = window.getSelection();
        s.selectAllChildren(event.target);
      });
      this._close.addEventListener('click', e => {
        this.parentElement.removeChild(this);
      });
    }
    catch(e) {
      reportError(e);
    }
  }
  connectedCallback() {
    try {
      this._pre.textContent = `# ${document.title}\n## ${document.URL}\n\n${window.getSelection().toString()}\n`;
    }
    catch(e) {
      reportError(e);
    }
  }
}

// document.addEventListener('readystatechange', function (event) {
try {
  //     if (document.readyState == 'complete') {
  let reportingNode = document.createElement('pre');
  reportingNode.id = 'b-error';
  reportingNode.style = 'position: absolute; top: 0; left: 0; background-color: white; color: black';
  document.body.appendChild (reportingNode);
  if (!customElements.get('my-jot')) {
    customElements.define('my-jot', Jot);
    // document.body.appendChild(new Jot);
    document.body.appendChild(document.createElement('my-jot'));
  }
  // }
}
catch(e) {
  reportError(e);
}
// });
