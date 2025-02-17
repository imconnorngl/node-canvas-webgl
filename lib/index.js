const {
  Context2d,
  CanvasRenderingContext2D,
  CanvasGradient,
  CanvasPattern,
  Image,
  ImageData,
  PNGStream,
  PDFStream,
  JPEGStream,
  DOMMatrix,
  DOMPoint,
  registerFont,
  parseFont,
  createImageData,
  loadImage,
  backends,
  version,
  cairoVersion,
  jpegVersion,
  gifVersion,
  freetypeVersion,
} = require('canvas');
const {WebGLRenderingContext} = require('gl');

const Canvas = require('./canvas');

const _drawImage = CanvasRenderingContext2D.prototype.drawImage;
CanvasRenderingContext2D.prototype.drawImage = function (img, ...args) {
  // If the image is another WebGL canvas, sync the context by accessing it
  if(img instanceof Canvas && img.__gl__) img.__ctx__;

  // Call the original drawImage method
  return _drawImage.call(this, img, ...args);
};

function createCanvas(width, height, type) {
  return new Canvas(width, height, type);
}

module.exports = {
  Canvas,
  Context2d,
  CanvasRenderingContext2D,
  WebGLRenderingContext,
  CanvasGradient,
  CanvasPattern,
  Image,
  ImageData,
  PNGStream,
  PDFStream,
  JPEGStream,
  DOMMatrix,
  DOMPoint,
  registerFont,
  parseFont,
  createCanvas,
  createImageData,
  loadImage,
  backends,
  version,
  cairoVersion,
  jpegVersion,
  gifVersion,
  freetypeVersion,
};