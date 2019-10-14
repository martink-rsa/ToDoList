/* eslint-disable no-underscore-dangle */

const Utility = () => {
  /* Getters/Setters */

  /* Private functions */

  /* Public Functions */

  const generateRandNum = (min, max) => {
    if (min === 0) {
      return Math.floor((Math.random() * (max + 1)) + min);
    }
    return Math.floor((Math.random() * max) + min);
  };

  const convertRGBToHex = (rgbIn) => {
    let rgb = rgbIn;
    // Choose correct separator
    const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(')')[0].split(sep);

    let r = (+rgb[0]).toString(16);
    let g = (+rgb[1]).toString(16);
    let b = (+rgb[2]).toString(16);

    if (r.length === 1) {
      r = `0${r}`;
    }
    if (g.length === 1) {
      g = `0${g}`;
    }
    if (b.length === 1) {
      b = `0${b}`;
    }

    return `#${r}${g}${b}`;
  };

  const convertHexToRGB = (h) => {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return "rgb("+ +r + "," + +g + "," + +b + ")";
  };

  return Object.freeze({
    generateRandNum,
    convertRGBToHex,
    convertHexToRGB,
  });
};

export default Utility;
