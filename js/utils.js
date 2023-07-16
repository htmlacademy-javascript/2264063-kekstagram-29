/**
 * Проверка строки на соответствие длине
 * @param checkingString {string} - Проверяемая строка
 * @param countOfChars {number} - Максимальная длина строки
 * @return {boolean}
 */
export const isValidString = (checkingString, countOfChars) => checkingString.length <= countOfChars;

/**
 * Проверка строки на палиндром
 * @param string {string} - Проверяемая строка
 * @return {boolean}
 */
export const isPalindrome = (string) => {
  let result = true;
  string = string.replaceAll(' ', '');
  for (let i = 0; i < string.length / 2; i++) {
    if (!(string[i] === string[string.length - 1 - i])) {
      result = false;
      break;
    }
  }
  return result;
};

/**
 * Извлечение числа из строки
 * @param string {string | number}
 * @return {number}
 */
export const extractNumbers = (string) => {
  const result = [];
  for (const char of string.toString().replaceAll(' ', '')) {
    if (!isNaN(+char)) {
      result.push(char);
    }
  }
  return result.length ? +result.join('') : NaN;
};

/**
 * Случайное число в заданном диапазоне включая min и max
 * @param min {number}
 * @param max {number}
 * @return {number}
 */
export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Создаёт генератор уникальных чисел начиная со start
 * @param start {number}
 * @return {() => number}
 */
export const getUniqueInteger = (start = 0) => () => start++;

/**
 * Создаёт генератор уникальных чисел в диапазоне [min ... max], включая min и max
 * @param min {number}
 * @param max {number}
 * @return {() => number}
 */
export const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
 * Возвращает случайный элемент из переданного массива
 * @param arr {array}
 * @return {*}
 */
export const getRandomElementFromArray = (arr) => arr[getRandomInteger(0, arr.length - 1)];


/**
 * Возвращает склонированное содержимое шаблона
 * @param templateId {string}
 * @return {HTMLElement | Null}
 */
export const getCloneFromTemplate = (templateId) => document.querySelector(templateId) ? document.querySelector(templateId).content.children[0].cloneNode(true) : null;


/**
 * Запрещает вводить 2 пробела подряд
 * @param evt {InputEvent}
 */
export const trimTwoSpaces = (evt) => {
  const str = evt.target.value;
  if (str[str.length - 1] + str[str.length - 2] === '  ') {
    evt.target.value = `${str.trim()} `;
  }
};

/**
 * Проверка на Node элемент
 * @param o {any}
 * @return {boolean}
 */
export const isNode = (o) => (
  typeof Node === 'object' ? o instanceof Node :
    o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string');

/**
 * Проверка на HTML элемент
 * @param o {any}
 * @return {boolean}
 */
export const isElement = (o) => (
  typeof HTMLElement === 'object' ? o instanceof HTMLElement :
    o && typeof o === 'object' && o && o.nodeType === 1 && typeof o.nodeName === 'string');
