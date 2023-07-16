import {Modal} from './modal.js';
import {trimTwoSpaces} from './utils.js';
import './image-upload-form-validator.js';
import {validateUploadImageForm} from './image-upload-form-validator.js';

const form = document.querySelector('#upload-select-image');
const picture = form.querySelector('.img-upload__preview img');
const sliderNode = form.querySelector('.effect-level__slider');
const effectsInputs = form.effect;

const modal = new Modal(form.querySelector('.img-upload__overlay'));
const effectSlider = noUiSlider.create(sliderNode, {
  start: 100,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  }
});

const setEffect = {
  'none': () => {
  },
  'chrome': (value) => (picture.style.filter = `grayscale(${value})`),
  'sepia': (value) => (picture.style.filter = `sepia(${value})`),
  'marvin': (value) => (picture.style.filter = `invert(${value}%)`),
  'phobos': (value) => (picture.style.filter = `blur(${value}px)`),
  'heat': (value) => (picture.style.filter = `brightness(${value})`),
};


/**
 * Обработчик нажатия кнопок масштабирования
 * @param evt {MouseEvent} - строка из поля ввода
 */
const scaleButtonHandler = (evt) => {
  const getScaleRate = () => +/\d+.\d+|\d+/.exec(picture.style.transform);
  if (evt.target.classList.contains('scale__control--smaller')) {
    if (getScaleRate() > 0.25) {
      picture.style.transform = `scale(${(getScaleRate() - 0.25)})`;
    }
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    if (getScaleRate() < 1 && getScaleRate()) {
      picture.style.transform = `scale(${(getScaleRate() + 0.25)})`;
    }
  }
  form.scale.value = getScaleRate() * 100;
};

/**
 * Инициирует масштаб предпросмотра изображения и вставляет его в тег
 */
const initPicture = () => {
  picture.style.transform = 'scale(1)';

  // вставка новой картинки в предпросмотр и превью эффектов
};

/**
 * Возвращает массив элементов для отключения всплытия события нажатия кнопок при фокусе на переданный элемент
 * @param element {HTMLElement} - строка из поля ввода
 * @return {array}
 */
const stopPropagation = (element) => [element, 'focus', () => (element.onkeydown = (evt) => evt.stopPropagation())];

/**
 * Устанавливает параметры слайдера
 * @param step {number} - шаг слайдера
 * @param min {number} - минимальное значение
 * @param max {number} - максимальное значение
 */
const setSliderOptions = (step, min, max) => {
  sliderNode.style.display = 'block';
  effectSlider.updateOptions({step, range: {'min': min, 'max': max}, start: 100});
};

const configureSlider = {
  'none': () => {
    picture.style.filter = 'none';
    sliderNode.style.display = 'none';
  },
  'chrome': () => setSliderOptions(0.1, 0, 1),
  'sepia': () => setSliderOptions(0.1, 0, 1),
  'marvin': () => setSliderOptions(1, 0, 100),
  'phobos': () => setSliderOptions(0.1, 0, 3),
  'heat': () => setSliderOptions(0.1, 1, 3),
};

/**
 * Инициирует слайдер и кнопки смены эффектов
 */
const initEffectChanger = () => {
  configureSlider[effectsInputs.value]();
  effectsInputs.forEach((input) => modal.addListener(input, 'change', () => configureSlider[effectsInputs.value]()));
};

/**
 * Обработчик нажатия на инпут загрузки картинки
 */
const uploadImageHandler = () => {
  modal.open();
  initPicture();
  initEffectChanger();
  modal.addListener(...stopPropagation(form.description));
  modal.addListener(...stopPropagation(form.hashtags));
  modal.addListener(form.querySelector('.scale'), 'click', scaleButtonHandler);
  form.querySelector('.img-upload__submit').disabled = !validateUploadImageForm();
};

/**
 * Обработчик ввода в поле хэштегов
 * @param evt {InputEvent}
 */
const hashtagInputHandler = (evt) => {
  trimTwoSpaces(evt);
  form.querySelector('.img-upload__submit').disabled = !validateUploadImageForm();
};

effectSlider.on('update', (value) => {
  setEffect[effectsInputs.value](+value[0]);
  form['effect-level'].value = +value[0];
});
form.filename.addEventListener('change', uploadImageHandler);
modal.onClose = () => form.reset();
modal.addListener(form.hashtags, 'input', hashtagInputHandler);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // отправка данных
});
