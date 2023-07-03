import {getCloneFromTemplate} from './utils.js';
import {openModalWithData} from './render-card-modal.js';

/**
 * Возвращает карточку с заполненными данными
 * @param id {number | string}
 * @param url {string}
 * @param description {string}
 * @param likes {number}
 * @param comments {array<object>}
 * @return {HTMLElement}
 */
const createCard = ({id, url, description, likes, comments}) => {
  const template = getCloneFromTemplate('#picture');
  if (template) {
    template.dataset.id = id;
    template.querySelector('.picture__img').src = url;
    template.querySelector('.picture__img').alt = description;
    template.querySelector('.picture__likes').textContent = likes;
    template.querySelector('.picture__comments').textContent = comments.length;
    return template;
  }
  throw new Error('Template does not exist.');
};

/**
 * Отрисовывает карточки по переданным данным
 * @param cardsData {array<object>}
 */
export const renderCards = (cardsData) => {
  const cardsContainer = document.querySelector('.pictures');
  if (cardsContainer) {
    const cards = document.createDocumentFragment();
    cardsData.forEach((cardInfo) => cards.append(createCard(cardInfo)));
    cardsContainer.append(cards);
    document.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains('picture') || evt.target.closest('.picture')) {
        const currentCardData = cardsData.find((card) => card.id === +evt.target.closest('.picture').dataset.id);
        openModalWithData(currentCardData);
      }
    });
  }
};
