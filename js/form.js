import {Modal} from './modal.js';

const HASHTAGS_LIMIT = 5;

const form = document.querySelector('#upload-select-image');
const modal = new Modal(form.querySelector('.img-upload__overlay'));
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error-message'
});

/**
 * Возвращает массив элементов для отключения всплытия события нажатия кнопок при фокусе на переданный элемент
 * @param element {HTMLElement} - строка из поля ввода
 * @return {array}
 */
const stopPropagation = (element) => [element, 'focus', () => (element.onkeydown = (evt) => evt.stopPropagation())];

/**
 * Проверяет количество хэштегов
 * @param value {string} - строка из поля ввода
 * @return {boolean}
 */
const isValidHashtagsCount = (value) => value.trim().split(' ').length <= HASHTAGS_LIMIT;

/**
 * Проверяет валидный ли хэштег
 * @param value {string} - строка из поля ввода
 * @return {boolean}
 */
const isValidHashtags = (value) => {
  const hashtagsArray = value.split(' ');
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!(/^#[a-zа-яё0-9]{1,19}$/i.test(hashtagsArray[i])) && hashtagsArray[i] !== '') {
      return false;
    }
  }
  return true;
};

/**
 * Проверяет что нет одинаковых хэштегов
 * @param value {string} - строка из поля ввода
 * @return {boolean}
 */
const isHashtagsDontRepeat = (value) => {
  const hashtagsArray = value.split(' ');
  return new Set(hashtagsArray).size === hashtagsArray.length;
};

/**
 * Обработчик нажатия на инпут загрузки картинки
 */
const uploadImageHandler = () => {
  modal.open();
  // вставка новой картинки в предпросмотр и превью эффектов
  modal.addListener(...stopPropagation(form.description));
  modal.addListener(...stopPropagation(form.hashtags));
};

/**
 * Обработчик ввода в поле хэштегов
 */
const hashtagsInputHandler = () => {
  const lastTwoCharsOfInput = form.hashtags.value[form.hashtags.value.length - 1] + form.hashtags.value[form.hashtags.value.length - 2];
  if (lastTwoCharsOfInput === '  ') {
    form.hashtags.value = `${form.hashtags.value.trim()} `;
  }
};

pristine.addValidator(form.hashtags, isValidHashtagsCount, `Максимум ${HASHTAGS_LIMIT} хэштегов`);
pristine.addValidator(form.hashtags, isValidHashtags, 'Введен невалидный хэштег');
pristine.addValidator(form.hashtags, isHashtagsDontRepeat, 'Хэштеги не должны повторяться');

form.filename.addEventListener('change', uploadImageHandler);
modal.onClose = () => form.reset();

modal.addListener(form.hashtags, 'input', hashtagsInputHandler);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // отправка данных
});
