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
