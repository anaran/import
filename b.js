'use strict';

let b = 2;

class Jot extends HTMLElement {
  constructor() {
    // Trying to extent HTMLPreElement I get:
    // VM1330:1 Uncaught TypeError: Illegal constructor
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.innerHTML = `
      <pre contenteditable="true">
      Jot
      </pre>
      <textarea>textarea</textarea>
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
  }
  connectedCallback() {
    this._pre = this._shadow.firstElementChild;
    this._pre.textContent = `# ${document.title}\n## ${document.URL}\n\n${window.getSelection().toString()}\n`;
    this._pre.addEventListener('focus', e => {
      let s = window.getSelection();
      s.selectAllChildren(e.currentTarget);
    });
    this._pre.addEventListener('blur', e => { this.parentElement.removeChild(this); });
  }
}

// export default b;

export default  { Jot, b };

// window.alert('my-jot: look!');
