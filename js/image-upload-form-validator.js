const HASHTAGS_LIMIT = 5;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HashtagMessage = {
  LIMIT: `Максимум ${HASHTAGS_LIMIT} хэштегов`,
  WRONG: 'Введен невалидный хэштег',
  REPEAT: 'Хэштеги не должны повторяться',
};

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
const isValidHashtags = (value) => value === '' || value.trim().split(' ').every((hashtag) => (HASHTAG_REGEXP.test(hashtag)));

/**
 * Проверяет что нет одинаковых хэштегов
 * @param value {string} - строка из поля ввода
 * @return {boolean}
 */
const isHashtagsDontRepeat = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ');
  return new Set(hashtagsArray).size === hashtagsArray.length;
};

pristine.addValidator(form.hashtags, isValidHashtagsCount, HashtagMessage.LIMIT);
pristine.addValidator(form.hashtags, isValidHashtags, HashtagMessage.WRONG);
pristine.addValidator(form.hashtags, isHashtagsDontRepeat, HashtagMessage.REPEAT);

export {pristine};
