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
  // reportingNode.textContent += JSON.stringify(error, getAllPropertyNames(error), 2);
  reportingNode.textContent += `name: ${error.name}\nmessage: ${error.message}\nstack: ${error.stack}\n\n`;
  // reportingNode.textContent += JSON.stringify(error);
}

// Wrap definition in scope block to avoid error "redeclaration of Jot".
try {
  let reportingNode = document.getElementById('b-error');
  if (!reportingNode) {
    reportingNode = document.createElement('pre');
    reportingNode.id = 'b-error';
    reportingNode.style = 'position: fixed; border: 0.1rem dashed; bottom: 0; left: 0; background-color: white; color: black';
    document.body.appendChild (reportingNode);
  }
  class Jot extends HTMLElement {
    constructor() {
      try {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        // this._shadow = this;
        this._shadow.innerHTML = `
        <section>
        <span>&Cross;</span>
        <pre contenteditable="true">
        Jot
        </pre>
        </section>
        <style>
      :host {
        background-color: inherit;
        /*height: 80%;
        left: 10%;
        position: fixed;
        top: 10%;
        width: 80%;*/
      }
      </style>
        `;
        this._close = this._shadow.querySelector('span');
        this._pre = this._shadow.querySelector('pre');
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
        let s = typeof window !== 'undefined' && window.getSelection();
        this._pre.textContent = `# ${document.title}\n## ${document.URL}\n\n${s.toString()}\n`;
        if (s) {
          let rangeLinks = [];
          for (let i = 0; i < s.rangeCount; i++) {
            let rc = s.getRangeAt(i).cloneContents();
            rc.querySelectorAll
              && Array.prototype.forEach.call(rc.querySelectorAll('a[href]'), (value) => {
                rangeLinks.push(`[${value.textContent || value.href}](${value.href})`);
              });
          }
          rangeLinks.forEach(link => {
            this._pre.textContent += `\n${link}`;
          });
        }
        console.log(this._pre.textContent);
      }
      catch(e) {
        reportError(e);
      }
    }
  }
  // document.addEventListener('readystatechange', function (event) {
  //     if (document.readyState == 'complete') {
  if (!customElements.get('my-jot')) {
    customElements.define('my-jot', Jot);
    // document.body.appendChild(new Jot);
  }
  let myJot = document.createElement('my-jot');
  // let jotParent = document.createElement('pre');
  // jotParent.id = 'jot-parent';
  // jotParent.style = 'position: absolute; top: 20%; left: 0; background-color: white; color: black';
  // document.body.appendChild (jotParent);
  // let doc = window.open('', '_blank').document;
  // doc.title = 'my-jot';
  // doc.body.appendChild(myJot);
  reportingNode.appendChild(myJot);
  // myJot.scrollIntoView({block: "center", inline: "center"});
  // }
}
catch(e) {
  reportError(e);
}
