"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;
exports.getText = getText;
function find(element, dataTestSubject) {
  return element.find(`[data-test-subj="${dataTestSubject}"]`);
}

function getText(element, dataTestSubject) {
  return find(element, dataTestSubject).text();
}
