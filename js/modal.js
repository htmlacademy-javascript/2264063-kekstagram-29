import {isNode, isElement} from './utils.js';

const modals = [];

/**
 * Класс модального окна
 * @param {HTMLElement} modalElement - нода модального окна
 * @param {array<HTMLElement>} closeElements - массив с элементами, по клику на которые модальное окно должно закрываться
 */
export class Modal {
  constructor(modalElement, closeElements) {
    if (!(isElement(modalElement) && isNode(modalElement))) {
      throw Error(`${modalElement} is not a HTML Element or Node`);
    }
    this.el = modalElement;
    modals.push(this);
    this.layer = 0;
    this.listeners = [];
    this.closeElements = closeElements || [];
    this.onClose = () => {
    };
  }

  /**
   * Обработчик закрытия модального окна по клику
   * @param {MouseEvent} evt
   */
  #closeFromClickHandler(evt) {
    this.closeElements.forEach((element) => (evt.target === element) && this.close());
  }

  /**
   * Обработчик закрытия модального окна по нажатию Esc
   * @param {KeyboardEvent} evt
   */
  #closeFromEscHandler(evt) {
    if (evt.key === 'Escape') {
      if (this.layer === Math.max(...modals.map((modal) => modal.layer))) {
        this.close();
      }
    }
  }

  /**
   * Добавляет слушатель на переданный элемент модального окна
   * @param {Node} element - нода, на которую нужно повесить обработчик
   * @param {string} eventType - тип события
   * @param {function} handler - функция-обработчик события
   */
  addListener(element, eventType, handler) {
    element.addEventListener(eventType, handler);
    this.listeners.push(() => element.removeEventListener(eventType, handler));
  }

  /**
   * Открывает модальное окно
   */
  open() {
    this.el.classList.remove('hidden');
    document.body.classList.add('modal-open');
    this.addListener(this.el, 'pointerdown', this.#closeFromClickHandler.bind(this));
    this.addListener(document, 'keydown', this.#closeFromEscHandler.bind(this));
    this.layer = Math.max(...modals.map((modal) => modal.layer)) + 1;
  }

  /**
   * Закрывает модальное окно
   */
  close() {
    this.onClose();
    document.body.classList.remove('modal-open');
    this.el.classList.add('hidden');
    this.layer = 0;
    this.listeners.forEach((remove) => remove());
    this.listeners = [];
  }
}
