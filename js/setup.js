'use strict';

var setupMenu = document.querySelector('.setup');
var setupMenuOpen = document.querySelector('.setup-open');
var setupMenuClose = setupMenu.querySelector('.setup-close');
var setupWizardCoat = setupMenu.querySelector('.wizard-coat');
var setupWizardEyes = setupMenu.querySelector('.wizard-eyes');
var setupWizardFireball = setupMenu.querySelector('.setup-fireball-wrap');
var inputWizardCoat = setupMenu.querySelector('[name="coat-color"]');
var inputWizardEyes = setupMenu.querySelector('[name="eyes-color"]');
var inputWizardFireball = setupMenu.querySelector('[name="fireball-color"]');

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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

var onSetupMenuEscPress = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeSetupMenu();
  }
};

var openSetupMenu = function () {
  setupMenu.classList.remove('hidden');

  document.addEventListener('keydown', onSetupMenuEscPress);
};

var closeSetupMenu = function () {
  setupMenu.classList.add('hidden');

  document.removeEventListener('keydown', onSetupMenuEscPress);
};

setupMenuOpen.addEventListener('click', function () {
  openSetupMenu();
});

setupMenuOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    openSetupMenu();
  }
});

setupMenuClose.addEventListener('click', function () {
  closeSetupMenu();
});

setupMenuClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeSetupMenu();
  }
});

var z = 0;

var cycleThroughArrayItems = function (array) {
  z = (z + 1) % (array.length);
  return array[z];
};

setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = cycleThroughArrayItems(COAT_COLORS);
  inputWizardCoat.value = setupWizardCoat.style.fill;
});

setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = cycleThroughArrayItems(EYES_COLORS);
  inputWizardEyes.value = setupWizardEyes.style.fill;
});

setupWizardFireball.addEventListener('click', function () {
  inputWizardFireball.value = cycleThroughArrayItems(FIREBALL_COLORS);
  setupWizardFireball.style.background = inputWizardFireball.value;
});

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
