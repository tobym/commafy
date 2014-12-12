/**
 * Format numbers on a page with commas by way a text selection.
 * Double-click on a non-formatted number like "12345", and it transforms to "12,345".
 *
 * @author Toby Matejovsky
 */

/**
 * Returns incoming value, but with numbers formatted with commas.
 * For example "hello 1234" would return "hello 1,234"
 */
function _commafy(value) {
  value += '';
  x = value.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

/**
 * If text is selected on a page, mutate it to it's commafied version.
 */
function _commafySelection() {
  var selection = document.getSelection();
  // If the node where the selection begins is a text node, modify it.
  if (selection.anchorNode && selection.anchorNode.nodeType === Node.TEXT_NODE) {
    var str = selection.toString(),
        com = _commafy(str),
        re = new RegExp(str, 'g'),
        newNodeValue = selection.anchorNode.nodeValue.replace(re, com);

    selection.anchorNode.nodeValue = newNodeValue;
    console.log("Commafied '"+str+"' to '"+com+"'");
  }
}

document.onmouseup = _commafySelection;
document.onkeyup = _commafySelection;
