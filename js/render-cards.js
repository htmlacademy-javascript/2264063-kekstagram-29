import {getCloneFromTemplate} from './utils.js';
import {openModalWithData} from './render-card-modal.js';

/**
 * Возвращает карточку с заполненными данными
 * @param url {string}
 * @param description {string}
 * @param likes {number}
 * @param comments {array<object>}
 * @return {HTMLElement}
 */
const createCard = ({url, description, likes, comments}) => {
  const template = getCloneFromTemplate('#picture');
  if (template) {
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
  if (!cardsContainer) {
    return;
  }
  const cards = document.createDocumentFragment();
  const cardsArray = cardsData.map((cardInfo) => {
    const card = createCard(cardInfo);
    cards.append(card);
    return card;
  });
  cardsContainer.append(cards);
  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    const cardIndex = cardsArray.indexOf(evt.target.closest('.picture'));
    if (cardIndex >= 0) {
      openModalWithData(cardsData[cardIndex]);
    }
  });
};
