'use strict';

let b = 2;

class Jot extends HTMLElement {
  constructor() {
    try {
      // Trying to extent HTMLPreElement I get:
      // VM1330:1 Uncaught TypeError: Illegal constructor
      super();
      this._template = document.createElement('template');
      this._template.innerHTML = `
        <pre contenteditable="true">
        Jot
      </pre>
        <textarea placeholder="typing here crashes browser tab"></textarea>
        <input type="text" placeholder="On Android characters get duplicated">
        <!--
        <template>
        </template>
      -->
        <style>
        pre {
          opacity: 0.8;
          position: fixed;
          top: 25%;
          left: 25%;
          /*width: 50%;
            height: 50%;*/
          z-idex: 1000;
        }
      </style>
        `;
      this._shadow = this.attachShadow({ mode: 'open' });
      this._shadow.appendChild(document.importNode(this._template.content, 'deep'));
      this._pre = this._shadow.firstElementChild;
      this._ta = this._shadow.querySelector('textarea');
    }
    catch(e) {
      console.log(JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
    }
  }
  connectedCallback() {
    try {
      this._pre.textContent = `# ${document.title}\n## ${document.URL}\n\n${window.getSelection().toString()}\n`;
      this._pre.addEventListener('focus', e => {
        let s = window.getSelection();
        s.selectAllChildren(e.currentTarget);
      });
      this._pre.addEventListener('blur', e => { this.parentElement.removeChild(this); });
    }
    catch(e) {
      console.log(JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
    }
  }
}

// export default b;

export default  { Jot, b };

// window.alert('my-jot: look!');
