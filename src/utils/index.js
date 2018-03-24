/* eslint no-param-reassign: 0, camelcase: 0 */

const debugTolls = {
  debugVar(variable, accumulative = false) {
    if (Array.isArray(variable) || typeof variable === 'object') {
      variable = debugTolls.dump(variable);
    }

    if (!document.body.contains(document.getElementById('debugVar'))) {
      const div = document.createElement('div');
      div.id = 'debugVar';
      div.innerHTML = `${variable}\n`;
      div.style.cssText = 'position:fixed; bottom:30px; left:30px; width:200px; height:100px; opacity:0.9; z-index:100000; background:#fff; overflow-y: scroll';
      document.body.appendChild(div);
    } else if (!accumulative) {
      document.getElementById('debugVar').innerHTML = variable;
    } else {
      document.getElementById('debugVar').innerHTML += `${variable}<br>`;
    }
  },

  dump(arr, level) {
    let dumped_text = '';
    if (!level) level = 0;

    // The padding given at the beginning of the line.
    let level_padding = '';
    for (let j = 0; j < level + 1; j++) level_padding += '    ';

    if (typeof (arr) === 'object') { // Array/Hashes/Objects
      for (const item in arr) {
        let value = arr[item];
        if (debugTolls.isNumber(value) && !Number.isInteger(value)) value = value.toFixed(3);

        if (typeof (value) === 'object') { // If it is an array,
          dumped_text += `${level_padding}${item} ...<br>`;
          dumped_text += debugTolls.dump(value, level + 1);
        } else {
          dumped_text += `${level_padding}${item}: ${value}<br>`;
        }
      }
    } else { // Stings/Chars/Numbers etc.
      dumped_text = `===>${arr}<===(${typeof (arr)})`;
    }
    return dumped_text;
  },

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
};

export default debugTolls.debugVar;
