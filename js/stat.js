"use strict";

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_WIDTH = 40;
var TEXT_HEIGHT = 16;
var TEXT_COLOR = "#000";
var GAP = 10;
var BORDER_GAP = 25;
var CLOUD_COLOR = "#fff";
var randomSaturation = [];
var CLOUD_SHADOW_COLOR = "rgba(0, 0, 0, 0.7)";
var PLAYER_BAR_COLOR = "rgba(255, 0, 0, 1)";
var FONT_STYLE = "16px 'PT Mono'";
var minBlueSaturation = 30;
var maxBlueSaturation = 100;
var barMaxHeight = CLOUD_Y + GAP + (TEXT_HEIGHT + GAP) * 3 + GAP * 2;
var barMaxLength = CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - GAP * 2;
var barMaxTravelDistance = barMaxLength - barMaxHeight;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomSaturationValue = function () {
  return Math.floor(Math.random() * (maxBlueSaturation - minBlueSaturation)) + minBlueSaturation;
};

var getRandomSaturation = function (arr) {
  for (var i = 1; i < arr.length; i++) {
    randomSaturation.push(getRandomSaturationValue().toString());
  }

  return randomSaturation;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      CLOUD_SHADOW_COLOR
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_COLOR
  );

  var maxTime = getMaxElement(times);

  getRandomSaturation(names);

  ctx.font = FONT_STYLE;
  ctx.textBaseline = "hanging";
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText("Ура вы победили!", CLOUD_X + BORDER_GAP, CLOUD_Y + BORDER_GAP);
  ctx.fillText("Список результатов:", CLOUD_X + BORDER_GAP, CLOUD_Y + BORDER_GAP + TEXT_HEIGHT + GAP);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(
        names[i],
        CLOUD_X + BORDER_GAP + (TEXT_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - GAP
    );

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BORDER_GAP + (TEXT_WIDTH + BAR_GAP) * i,
        CLOUD_Y + BORDER_GAP + (TEXT_HEIGHT + GAP) * 2 + GAP
    );

    if (names[i] === "Вы") {
      ctx.fillStyle = PLAYER_BAR_COLOR;
    } else {
      ctx.fillStyle = "hsl(240, " + randomSaturation[i] + "%, 50%)";
    }

    ctx.fillRect(
        CLOUD_X + BORDER_GAP + (BAR_WIDTH + BAR_GAP) * i,
        barMaxHeight + barMaxTravelDistance - barMaxTravelDistance * times[i] / maxTime,
        BAR_WIDTH,
        barMaxTravelDistance * times[i] / maxTime
    );
  }
};
