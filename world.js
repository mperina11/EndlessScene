"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 16;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

function drawGrass(i, j) {
  push();
  fill('green');
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  pop();
}

function drawTulip() {
  push();

  fill('blue');
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  fill('blue');
  circle(i-5, j-5, 15);
  circle(i+5, j-5, 15);
  circle(i-5, j-2, 15);
  circle(i+5, j-2, 15);

  noStroke();
  fill('yellow');
  circle(i, j-2, 10);
  pop();
}

function placeTulip(i,j) {
  fill('red');
  circle(i-5, j-5, 15);
  circle(i+5, j-5, 15);
  circle(i-5, j-2, 15);
  circle(i+5, j-2, 15);

  noStroke();
  fill('green');
  circle(i, j-2, 10);
}

function p3_drawTile(i, j) {
  noStroke();
  // fill(noise(i, j) * 225);
  fill(noise(i,j));
  fill('#694130');

  push();

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  if (noise(i,j) > 0.7) {
    drawGrass(th/2, tw/2);
  }
  // if (noise(i,j) < 0.4) {
  //   drawTulip(th/2, tw/2);
  // }

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    // fill(255, 255, 0, 180);
    // ellipse(th/2, tw/2, 10, 10);
    placeTulip(th/2, tw/2);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() {}
