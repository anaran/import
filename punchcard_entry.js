'use strict';
//
// punchcard_entry.js
//
function getAllPropertyNames(obj, props = []) {
  if (obj.constructor.name == 'Object') {
    return props.length ? props : null;
  } else {
    return getAllPropertyNames(Object.getPrototypeOf(obj), props.concat(Object.getOwnPropertyNames(obj)));
  }
}

function reportError(error, reportingNode) {
  // reportingNode.textContent += JSON.stringify(error, getAllPropertyNames(error), 2);
  reportingNode.textContent += window.unescape(`name: ${error.name}\nmessage: ${error.message}\nstack: ${error.stack}\n\n`);
  // reportingNode.textContent += JSON.stringify(error);
}

let getPunchCardEntryFromSelection = (entryNode, reportingNode) => {
      try {
        let entry = {};
        let s = typeof window !== 'undefined' && window.getSelection();
        entry.activity = `# ${document.title}\n## ${document.URL}\n\n${s.toString()}\n`;
        if (s) {
          let rangeLinks = [];
          for (let i = 0; i < s.rangeCount; i++) {
            let rc = s.getRangeAt(i).cloneContents();
            rc.querySelectorAll
              && Array.prototype.forEach.call(rc.querySelectorAll('a[href]'), (value) => {
                rangeLinks.push(`[${(value.textContent || value.href).trim()}](${value.href})`);
              });
          }
          rangeLinks.forEach(link => {
            entry.activity += `\n${link}`;
          });
        }
        entry.start = (new Date).toISOString();
        return entry;
      }
      catch(e) {
        reportError(e, reportingNode);
      }
}

// Wrap definition in scope block to avoid error "redeclaration of Jot".
  let w = window.open('', 'PunchCard Entry');
  let doc = w.document;
  doc.title = 'PunchCard Entry';
  doc.body.innerHTML = `
        <section>
        <pre id="b-error"></pre>
        <pre contenteditable="true" id="entry">
        .oO
        </pre>
        </section>
        <style>
        section {
        background-color: silver;
        }
        pre:focus {
        white-space: pre-wrap;
        }
      </style>
        `;
  let reportingNode = doc.getElementById('b-error');
try {
  let pre = doc.getElementById('entry');
  let entry = getPunchCardEntryFromSelection(pre, reportingNode);
  pre.textContent = entry.activity;
  pre.addEventListener('focus', event => {
    pre.textContent = JSON.stringify(entry, null, 2);
    let s = w.getSelection();
    s.selectAllChildren(event.target);
  });
  pre.addEventListener('blur', event => {
    pre.textContent = entry.activity;
  });
}
catch(e) {
  reportError(e, reportingNode);
}
// document.addEventListener('readystatechange', function (event) {
//     if (document.readyState == 'complete') {
// reportingNode.appendChild(myJot);
// }
