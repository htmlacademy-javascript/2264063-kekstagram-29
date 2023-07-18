import {Modal} from './modal.js';
import {getCloneFromTemplate} from './utils.js';

const successElement = getCloneFromTemplate('#success');

const modal = new Modal(successElement, [
  successElement,
  successElement.querySelector('.success__button')
]);

modal.onClose = () => modal.el.remove();

/**
 * Показывает успех загрузки данных
 */
export const showFormSuccess = () => {
  document.body.append(modal.el);
  modal.open();
};
