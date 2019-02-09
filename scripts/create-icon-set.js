/* eslint-disable quote-props */
/* react icon set creator v1.0.1 */

const fs = require('fs');
const path = require('path');
const clipboardy = require('clipboardy');
const SVGO = require('svgo-sync');


// TODO: merge sets

/* settings */
const inputFolder = '../resources/Navigation Icons/';
const outputFile = '../src/data/icons.json';
const input = {
  'arrow-down': `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.3779 12.3522C4.02011 12.1435 3.56088 12.2643 3.35217 12.6221C3.14346 12.9799 3.26431 13.4391 3.6221 13.6478L4.3779 12.3522ZM16 20L15.6221 20.6478C15.8556 20.7841 16.1444 20.7841 16.3779 20.6478L16 20ZM28.3779 13.6478C28.7357 13.4391 28.8565 12.9799 28.6478 12.6221C28.4391 12.2643 27.9799 12.1435 27.6221 12.3522L28.3779 13.6478ZM3.6221 13.6478L15.6221 20.6478L16.3779 19.3522L4.3779 12.3522L3.6221 13.6478ZM16.3779 20.6478L28.3779 13.6478L27.6221 12.3522L15.6221 19.3522L16.3779 20.6478Z" fill="#BAF1FF"/>
  </svg>



  `,
};
const renames = {
  'turn-left': 'left',
  'turn-right': 'right',
};
/* settings end */

/* code start */
const icons = {};

const svgo = new SVGO({
  plugins: [{ convertShapeToPath: true }, { mergePaths: true }],
});

function isNumericStr(str) {
  return /^\d+\.\d+$/.test(str);
}

function forEachMatch(regex, string, callback) {
  let result;
  while ((result = regex.exec(string)) !== null) {
    callback(...result);
  }
}

// function ifHasProp(prop, string, callback) {
//   const match = RegExp(`${prop}="(.+)"`, 'g').exec(string);
//   if (match[1]) callback(match[1]);
// }

function convertSvg(content) {
  // get viewBox
  const viewBox = /viewBox="(.*?)"/g.exec(content)[1];
  let paths = [];
  const rects = [];
  let colors = [];
  let finalContent = content;
  let colorIndex = 1;

  // get colors
  forEachMatch(/fill="(.+?)"/g, content, (full, color) => {
    if (color !== 'none' && !colors.includes(color)) {
      finalContent = finalContent.replace(RegExp(color, 'g'), colorIndex);
      colors.push(color);
      colorIndex++;
    }
  });

  // check colors
  if (colors.length < 2) {
    colors = [];
    finalContent = finalContent.replace(/fill=".+?"/g, '');
  }

  // get paths
  forEachMatch(/<path.+?\/>/g, finalContent, (fullMatch) => {
    const elem = {};

    forEachMatch(/(\S+?)="(.+?)"/g, fullMatch, (full, prop, value) => {
      elem[prop] = isNumericStr(value) ? Number(value) : value;
    });

    paths.push(elem);
  });

  paths = paths.map(elem => Object.keys(elem).reduce((object, key) => {
    if (['fill-rule', 'clip-rule'].includes(key)) {
      object.evenodd = true;
    } else {
      object[key] = elem[key];
    }

    return object;
  }, {}));

  // get rects
  forEachMatch(/<rect.+?\/>/g, finalContent, (fullMatch) => {
    const elem = {};

    forEachMatch(/(\S+?)="(.+?)"/g, fullMatch, (full, prop, value) => {
      elem[prop] = isNumericStr(value) ? Number(value) : value;
    });

    rects.push(elem);
  });

  if (paths.length === 0 && rects.length === 0) {
    return false;
  }

  return {
    viewBox,
    ...colors.length > 0 && { colors },
    ...paths.length > 0 && { paths },
    ...rects.length > 0 && { rects },
  };
}

function addIcon(name, fileDir) {
  // const data = fs.readFileSync(fileDir, 'utf8');
  const { data } = svgo.optimizeSync(fs.readFileSync(fileDir, 'utf8'));

  const convertedSvg = convertSvg(data);

  if (!convertedSvg) {
    console.error(`ERR! svg '${name}' has invalid elements`);
  } else {
    icons[renames[name] || name] = convertedSvg;
  }
}

function addSVGFromFolder(folder, prefix = '') {
  const files = fs.readdirSync(folder);

  files.forEach((file) => {
    const fileDir = path.join(folder, file);
    const fileName = path.basename(fileDir, '.svg');

    if (fs.statSync(fileDir).isDirectory()) {
      addSVGFromFolder(fileDir, `${prefix}${fileName}-`);
    } else {
      addIcon(`${prefix}${fileName}`, fileDir);
    }
  });
}

const inputIcons = Object.keys(input);

if (!input[inputIcons[0]]) {
  addSVGFromFolder(path.join(__dirname, inputFolder));

  fs.writeFile(path.join(__dirname, outputFile), JSON.stringify(icons, null, 2), (err) => {
    if (err) throw err;

    console.log('JSON svg icon set created!');
  });
} else {
  let copyIcons = '';

  inputIcons.forEach((icon) => {
    const { data } = svgo.optimizeSync(input[icon]);
    copyIcons = `${copyIcons}"${icon}": ${JSON.stringify(convertSvg(data), null, 2)},\n`;
  });

  copyIcons = copyIcons.slice(0, -2);

  clipboardy.writeSync(copyIcons);
  process.stdout.write(`${copyIcons}\n\n Copied to clipboard!`);
}
