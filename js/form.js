import {Modal} from './modal.js';
import {trimTwoSpaces} from './utils.js';
import './validation.js';

const form = document.querySelector('#upload-select-image');
const modal = new Modal(form.querySelector('.img-upload__overlay'));


const imageScaleInput = form.scale;
const imageScaleButtonLess = form.querySelector('.scale__control--smaller');
const imageScaleButtonMore = form.querySelector('.scale__control--bigger');

const scaleButtonHandler = (evt) => {
  const picture = form.querySelector('.img-upload__preview img');
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
  imageScaleInput.value = getScaleRate() * 100;
};


/**
 * Инициирует масштаб предпросмотра изображения и вставляет его в тег
 */
const initPicture = () => {
  const picture = form.querySelector('.img-upload__preview img');
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
 * Обработчик нажатия на инпут загрузки картинки
 */
const uploadImageHandler = () => {
  modal.open();
  initPicture();
  modal.addListener(...stopPropagation(form.description));
  modal.addListener(...stopPropagation(form.hashtags));
  modal.addListener(imageScaleButtonLess, 'click', scaleButtonHandler);
  modal.addListener(imageScaleButtonMore, 'click', scaleButtonHandler);
};

form.filename.addEventListener('change', uploadImageHandler);
modal.onClose = () => form.reset();
modal.addListener(form.hashtags, 'input', trimTwoSpaces);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // отправка данных
});
