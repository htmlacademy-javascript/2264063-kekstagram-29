import {Modal} from './modal.js';
import {extractNumber, trimTwoSpaces} from './utils.js';
import './image-upload-form-validator.js';
import {validateUploadImageForm} from './image-upload-form-validator.js';
import {sendData} from './api.js';
import {showSubmitMessage} from './show-submit-message.js';

const FILE_EXTENSIONS = ['jpg', 'png', 'jpeg'];
const PreviewScale = {
  MIN: 0.25,
  MAX: 1
};

const form = document.querySelector('#upload-select-image');
const picture = form.querySelector('.img-upload__preview img');
const sliderNode = form.querySelector('.effect-level__slider');
const effectsInputs = form.effect;
const effectItems = form.querySelectorAll('.effects__preview');
const submitButton = form.querySelector('.img-upload__submit');


const modal = new Modal(form.querySelector('.img-upload__overlay'), [
  form.querySelector('.img-upload__overlay'),
  form.querySelector('.img-upload__cancel')
]);
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
  form.scale.value = getScaleRate() * 100;
};

/**
 * Валидирует расширение файла и возвращает путь к нему
 * @param file {File}
 * @return {string}
 */
const checkExtAndGetPreviewPath = (file) => FILE_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext)) && URL.createObjectURL(file);

/**
 * Инициирует масштаб предпросмотра изображения и вставляет его в тег
 * @param file {File}
 */
const initPicture = (file) => {
  const filePath = checkExtAndGetPreviewPath(file);
  picture.style.transform = `scale(${PreviewScale.MAX})`;
  picture.src = filePath;
  effectItems.forEach((item) => (item.style.backgroundImage = `url("${filePath}")`));
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
  effectSlider.updateOptions({step, range: {min, max}, start: 100});
};

const configureSlider = {
  [Effect.NONE]: () => {
    picture.style.filter = 'none';
    sliderNode.style.display = 'none';
  },
  [Effect.CHROME]: () => setSliderOptions(0.1, 0, 1),
  [Effect.SEPIA]: () => setSliderOptions(0.1, 0, 1),
  [Effect.MARVIN]: () => setSliderOptions(1, 0, 100),
  [Effect.PHOBOS]: () => setSliderOptions(0.1, 0, 3),
  [Effect.HEAT]: () => setSliderOptions(0.1, 1, 3),
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
const uploadImageHandler = (evt) => {
  modal.open();
  initPicture(evt.target.files[0]);
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
  submitButton.disabled = !validateUploadImageForm();
};

/**
 * Обработчик ввода в поле комментариев
 */
const commentInputHandler = () => {
  submitButton.disabled = !validateUploadImageForm();
};

/**
 * Выключает кнопку отправки формы
 */
const disableSubmitButton = () => {
  submitButton.textContent = 'Публикуем...';
  submitButton.disabled = true;
};

/**
 * Включает кнопку отправки формы
 */
const enableSubmitButton = () => {
  submitButton.textContent = 'Опубликовать';
  submitButton.disabled = false;
};

/**
 * Обработчик отправки формы
 * @param evt {SubmitEvent}
 */
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  disableSubmitButton();
  sendData(new FormData(evt.target))
    .then(() => {
      showSubmitMessage('success');
      modal.close();
    })
    .catch(() => showSubmitMessage('error'))
    .finally(() => enableSubmitButton());
};

effectSlider.on('update', (value) => {
  setEffect[effectsInputs.value](+value[0]);
  form['effect-level'].value = +value[0];
});
form.filename.addEventListener('change', uploadImageHandler);
modal.onClose = () => form.reset();
modal.addListener(form.hashtags, 'input', hashtagInputHandler);
modal.addListener(form.description, 'input', commentInputHandler);
form.addEventListener('submit', formSubmitHandler);
