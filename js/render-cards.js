import {getCloneFromTemplate} from './utils.js';

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
  template.querySelector('.picture__img').src = url;
  template.querySelector('.picture__img').alt = description;
  template.querySelector('.picture__likes').textContent = likes;
  template.querySelector('.picture__comments').textContent = comments.length;
  return template;
};

/**
 * Отрисовывает карточки по переданным данным
 * @param cardData {array<object>}
 */
export const renderCards = (cardData) => {
  const cards = document.createDocumentFragment();
  cardData.forEach((cardInfo) => cards.append(createCard(cardInfo)));
  const cardsContainer = document.querySelector('.pictures');
  cardsContainer.append(cards);
};

