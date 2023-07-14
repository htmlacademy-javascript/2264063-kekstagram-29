import {Modal} from './modal.js';
import {trimTwoSpaces} from './utils.js';
import './validation.js';

const form = document.querySelector('#upload-select-image');
const modal = new Modal(form.querySelector('.img-upload__overlay'));

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
  // вставка новой картинки в предпросмотр и превью эффектов
  modal.addListener(...stopPropagation(form.description));
  modal.addListener(...stopPropagation(form.hashtags));
};

form.filename.addEventListener('change', uploadImageHandler);
modal.onClose = () => form.reset();

modal.addListener(form.hashtags, 'input', trimTwoSpaces);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // отправка данных
});
