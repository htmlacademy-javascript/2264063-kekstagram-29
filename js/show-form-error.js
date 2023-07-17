import {Modal} from './modal.js';
import {getCloneFromTemplate} from './utils.js';

const errorElement = getCloneFromTemplate('#error');

const modal = new Modal(errorElement, [
  errorElement,
  errorElement.querySelector('.error__button')
]);

modal.onClose = () => modal.el.remove();

/**
 * Показывает ошибку загрузки данных
 */
export const showFormError = () => {
  document.body.append(modal.el);
  modal.open();
};
