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

/**
 * Рендерит на страницу переданное сообщение
 * @param message {string}
 */
export const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'fixed';
  alert.style.inset = '0';
  alert.style.border = '5px solid tomato';
  alert.style.color = 'tomato';
  alert.style.padding = '1em';
  alert.style.fontSize = '20px';
  alert.style.fontWeight = '700';
  alert.style.textTransform = 'uppercase';
  alert.style.zIndex = '1000';
  alert.style.pointerEvents = 'none';
  alert.innerText = message;
  document.body.append(alert);
  setTimeout(() => alert.remove(), 3000);
};

/**
 * Вызывает коллбек при заданном времени бездействия
 * @param callback {function}
 * @param timeoutDelay {number}
 * @return {function}
 */
export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
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
 * Извлекает число из строки (также дробное и отрицательно)
 * @param str {string}
 * @return {number}
 */
export const extractNumber = (str) => +/-?\d+(?:\.\d+)?/g.exec(str);
