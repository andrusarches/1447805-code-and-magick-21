'use strict';

var setupMenu = document.querySelector('.setup');
setupMenu.classList.remove('hidden');

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var randomizedWizards = [];
var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomNumber = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomArrayItem = function (array) {
  return array[getRandomNumber(array)];
};

var randomizeSimilarWizards = function () {
  for (var i = 0; i < 4; i++) {
    randomizedWizards.push({
      "name": getRandomArrayItem(FIRST_NAMES) + ' ' + getRandomArrayItem(LAST_NAMES),
      "coatColor": getRandomArrayItem(COAT_COLORS),
      "eyesColor": getRandomArrayItem(EYES_COLORS)
    });
  }
};

randomizeSimilarWizards();

var renderWizard = function (arrayElement) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = arrayElement.name;
  wizardElement.querySelector('.wizard-coat').style.fill = arrayElement.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = arrayElement.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < randomizedWizards.length; i++) {
  fragment.appendChild(renderWizard(randomizedWizards[i]));
}
similarWizardsList.appendChild(fragment);

var setupMenuSimilarWizards = setupMenu.querySelector('.setup-similar');
setupMenuSimilarWizards.classList.remove('hidden');
