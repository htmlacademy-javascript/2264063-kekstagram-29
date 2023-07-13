/**
 * Класс модального окна
 * @param {HTMLElement} modalElement - нода модального окна
 */
export class Modal {
  constructor(modalElement) {
    this.el = modalElement;
    this.listeners = [];
  }

  /**
   * Обработчик закрытия модального окна
   * @param {Event | KeyboardEvent} evt
   */
  #closeHandler(evt) {
    const isOverlay = evt.target.classList.contains('overlay');
    const isCloseButton = evt.target.classList.contains('cancel');
    if (isOverlay || isCloseButton || evt.key === 'Escape') {
      this.close();
      this.listeners.forEach((remove) => remove());
      this.listeners = [];
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
    this.addListener(this.el, 'click', this.#closeHandler.bind(this));
    this.addListener(document, 'keydown', this.#closeHandler.bind(this));
  }

  /**
   * Закрывает модальное окно
   */
  close() {
    document.body.classList.remove('modal-open');
    this.el.classList.add('hidden');
  }
}
