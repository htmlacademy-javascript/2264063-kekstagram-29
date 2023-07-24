import {extractNumber} from './utils.js';

const form = document.querySelector('#upload-select-image');
const sliderNode = form.querySelector('.effect-level__slider');
const picture = form.querySelector('.img-upload__preview img');
const effectInputs = form.effect;

const PreviewScale = {
  MIN: 0.25,
  MAX: 1
};

const effectSlider = noUiSlider.create(sliderNode, {
  start: 100,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  }
});

const Effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const setEffect = {
  [Effect.NONE]: () => {},
  [Effect.CHROME]: (value) => (picture.style.filter = `grayscale(${value})`),
  [Effect.SEPIA]: (value) => (picture.style.filter = `sepia(${value})`),
  [Effect.MARVIN]: (value) => (picture.style.filter = `invert(${value}%)`),
  [Effect.PHOBOS]: (value) => (picture.style.filter = `blur(${value}px)`),
  [Effect.HEAT]: (value) => (picture.style.filter = `brightness(${value})`),
};

/**
 * Обработчик нажатия кнопок масштабирования
 * @param evt {MouseEvent} - строка из поля ввода
 */
const scaleButtonHandler = (evt) => {
  const getScaleRate = () => extractNumber(picture.style.transform);
  if (evt.target.classList.contains('scale__control--smaller') && getScaleRate() > PreviewScale.MIN) {
    picture.style.transform = `scale(${(getScaleRate() - PreviewScale.MIN)})`;
  }
  if (evt.target.classList.contains('scale__control--bigger') && (getScaleRate() < PreviewScale.MAX)) {
    picture.style.transform = `scale(${(getScaleRate() + PreviewScale.MIN)})`;
  }
  form.scale.value = `${getScaleRate() * 100}%`;
};

/**
 * Устанавливает параметры слайдера
 * @param step {number} - шаг слайдера
 * @param min {number} - минимальное значение
 * @param max {number} - максимальное значение
 */
const setSliderOptions = (step, min, max) => {
  form.querySelector('.effect-level').style.display = 'block';
  effectSlider.updateOptions({step, range: {min, max}, start: 100});
};

const configureSlider = {
  [Effect.NONE]: () => {
    picture.style.filter = 'none';
    form.querySelector('.effect-level').style.display = 'none';
  },
  [Effect.CHROME]: () => setSliderOptions(0.1, 0, 1),
  [Effect.SEPIA]: () => setSliderOptions(0.1, 0, 1),
  [Effect.MARVIN]: () => setSliderOptions(1, 0, 100),
  [Effect.PHOBOS]: () => setSliderOptions(0.1, 0, 3),
  [Effect.HEAT]: () => setSliderOptions(0.1, 1, 3),
};

effectSlider.on('update', (value) => {
  setEffect[effectInputs.value](+value[0]);
  form['effect-level'].value = value[0];
});

/**
 * Инициирует слайдер и кнопки смены эффектов
 */
export const initEffectChanger = (modal) => {
  picture.style.transform = `scale(${PreviewScale.MAX})`;
  configureSlider[effectInputs.value]();
  effectInputs.forEach((input) => modal.addListener(input, 'change', () => configureSlider[effectInputs.value]()));
  modal.addListener(form.querySelector('.scale'), 'click', scaleButtonHandler);
};
