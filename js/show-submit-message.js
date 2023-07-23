import {Modal} from './modal.js';
import {getCloneFromTemplate} from './utils.js';

/** @typedef {string} success */

/** @typedef {string} error */

/**
 * Показывает сообщение в модальном окне
 * @param type {success | error} - тип сообщения
 */
export const showSubmitMessage = (type) => {
  if (type === 'success' || type === 'error') {
    const element = getCloneFromTemplate(`#${type}`);
    const modal = new Modal(element, [element, element.querySelector(`.${type}__button`)]);
    modal.onClose = () => modal.el.remove();
    document.body.append(modal.el);
    modal.open();
  }
};
