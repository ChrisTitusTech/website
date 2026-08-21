/**
 * Utils
 */

// Add code-copy buttons using progressive enhancement
// © 2019. Tom Spencer
// https://www.fiznool.com/blog/2018/09/14/adding-click-to-copy-buttons-to-a-hugo-powered-blog/
(function() {
  'use strict';

  if(
    typeof document.queryCommandSupported !== 'function' ||
    typeof document.execCommand !== 'function' ||
    !document.queryCommandSupported('copy')
  ) {
    return;
  }

  function flashCopyMessage(el, msg) {
    el.textContent = msg;
    if(el.copyMessageTimer) {
      clearTimeout(el.copyMessageTimer);
    }
    el.copyMessageTimer = setTimeout(function() {
      el.textContent = "Copy";
      el.copyMessageTimer = null;
    }, 1000);
  }

  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  function addCopyButton(containerEl) {
    var copyBtn = document.createElement("button");
    copyBtn.className = "highlight-copy-btn";
    copyBtn.textContent = "Copy";

    var codeEl = containerEl.firstElementChild;
    copyBtn.addEventListener('click', function() {
      var selection;
      try {
        selection = selectText(codeEl);
        if(!document.execCommand('copy')) {
          throw new Error('Copy command was not successful');
        }

        flashCopyMessage(copyBtn, 'Copied!');
      } catch(e) {
        if(typeof console !== 'undefined' && typeof console.log === 'function') {
          console.log(e);
        }
        flashCopyMessage(copyBtn, 'Failed :\'(');
      } finally {
        if(selection) {
          selection.removeAllRanges();
        }
      }
    });

    containerEl.appendChild(copyBtn);
  }

  // Add copy button to code blocks
  var highlightBlocks = document.getElementsByClassName('highlight');
  Array.prototype.forEach.call(highlightBlocks, addCopyButton);
})();
