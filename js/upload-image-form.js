import {Modal} from './modal.js';
import {trimTwoSpaces} from './utils.js';
import './image-upload-form-validator.js';
import {validateUploadImageForm} from './image-upload-form-validator.js';
import {sendData} from './api.js';
import {showSubmitMessage} from './show-submit-message.js';
import {initEffectChanger} from './effect-changer.js';

const FILE_EXTENSIONS = ['jpg', 'png', 'jpeg'];

const form = document.querySelector('#upload-select-image');
const picture = form.querySelector('.img-upload__preview img');
const effectItems = form.querySelectorAll('.effects__preview');
const submitButton = form.querySelector('.img-upload__submit');

const modal = new Modal(form.querySelector('.img-upload__overlay'), [
  form.querySelector('.img-upload__overlay'),
  form.querySelector('.img-upload__cancel')
]);

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
 * Обработчик нажатия на инпут загрузки картинки
 */
const uploadImageHandler = (evt) => {
  modal.open();
  initPicture(evt.target.files[0]);
  initEffectChanger(modal);
  modal.addListener(...stopPropagation(form.description));
  modal.addListener(...stopPropagation(form.hashtags));
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
const commentInputHandler = () => (submitButton.disabled = !validateUploadImageForm());

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

form.filename.addEventListener('change', uploadImageHandler);
modal.onClose = () => form.reset();
modal.addListener(form.hashtags, 'input', hashtagInputHandler);
modal.addListener(form.description, 'input', commentInputHandler);
form.addEventListener('submit', formSubmitHandler);
