const HASHTAGS_LIMIT = 5;

const form = document.querySelector('#upload-select-image');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error-message'
});

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
const isValidHashtags = (value) => value === '' || value.trim().split(' ').every((hashtag) => (/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)));

/**
 * Проверяет что нет одинаковых хэштегов
 * @param value {string} - строка из поля ввода
 * @return {boolean}
 */
const isHashtagsDontRepeat = (value) => {
  const hashtagsArray = value.trim().split(' ');
  return new Set(hashtagsArray).size === hashtagsArray.length;
};

pristine.addValidator(form.hashtags, isValidHashtagsCount, `Максимум ${HASHTAGS_LIMIT} хэштегов`);
pristine.addValidator(form.hashtags, isValidHashtags, 'Введен невалидный хэштег');
pristine.addValidator(form.hashtags, isHashtagsDontRepeat, 'Хэштеги не должны повторяться');
export const validateUploadImageForm = () => pristine.validate();
