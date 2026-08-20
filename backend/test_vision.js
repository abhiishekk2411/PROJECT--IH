require('dotenv').config();
const fs = require('fs');
const { analyzeCropImage } = require('./src/services/vision/visionService');

// Create a dummy 1x1 image buffer
const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
const mimetype = 'image/png';

async function test() {
  try {
    const res = await analyzeCropImage(buffer, mimetype);
    console.log("Success:", res);
  } catch(e) {
    console.error("Test Failed:", e.message);
  }
}

test();
