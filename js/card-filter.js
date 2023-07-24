import {renderCards} from './render-cards.js';
import {createRandomIdFromRangeGenerator, debounce} from './utils.js';

const filterWrapper = document.querySelector('.img-filters');
const RENDER_DELAY = 500;
const RANDOM_CARDS_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  POPULAR: 'filter-discussed',
};

/**
 * Вешает обработчик клика на кнопки фильтра
 * @param cb {function(string|number)} - выполнится при клике, принимает id кнопки
 */
const setButtonsClickHandle = (cb) => {
  const filterButtons = filterWrapper.querySelectorAll('.img-filters__button');
  const buttonClickHandler = (evt) => {
    filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    cb(evt.target.id);
  };
  filterButtons.forEach((button) => button.addEventListener('click', buttonClickHandler));
};

/**
 * Сравнивает посты по кол-ву комментариев
 * @param a {card}
 * @param b {card}
 */
const compareByCommentsCount = (a, b) => b.comments.length - a.comments.length;

/**
 * Возвращает массив случайных постов
 * @param cardsArray {array<card>}
 * @param count {number}
 * @return {array<card>}
 */
const getRandomCards = (cardsArray, count) => {
  const generateId = createRandomIdFromRangeGenerator(0, cardsArray.length - 1);
  return Array.from({length: count},() => cardsArray[generateId()]);
};

const setFilter = {
  [Filter.DEFAULT]: (cards) => renderCards(cards),
  [Filter.RANDOM]: (cards) => renderCards(getRandomCards(cards, RANDOM_CARDS_COUNT)),
  [Filter.POPULAR]: (cards) => renderCards(cards.toSorted(compareByCommentsCount)),
};

/**
 * Применяет фильтр к данным
 * @param cardsData {array<card>}
 */
export const initCardFilter = (cardsData) => {
  filterWrapper.classList.remove('img-filters--inactive');
  setFilter[Filter.DEFAULT](cardsData);
  setButtonsClickHandle(debounce((filterType) => setFilter[filterType](cardsData), RENDER_DELAY));
};
