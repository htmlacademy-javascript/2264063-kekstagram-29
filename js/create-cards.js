import {
  createRandomIdFromRangeGenerator,
  getUniqueInteger,
  getRandomElementFromArray,
  getRandomInteger
} from './utils.js';
import {getData} from './mocks.js';
/**
 * @typedef {object} card
 * @property {number} id,
 * @property {string} url,
 * @property {string} description,
 * @property {number} likes,
 * @property {array <comment>=} comments
 */

/**
 * @typedef {object} comment
 * @property {number} id,
 * @property {string} avatar,
 * @property {string} message,
 * @property {string} name
 */

// Получаем данные для карточек
const data = getData();

// Объявление генераторов id
const generateCardId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = getUniqueInteger();

/**
 * Создаёт объект комментария
 * @return {comment}
 */
const createComment = () => {
  const commentId = generateCommentId();
  const commentMessage = `${getRandomElementFromArray(data.COMMENT_MESSAGES)} ${getRandomInteger(0, 1) ? `\n${getRandomElementFromArray(data.COMMENT_MESSAGES)}` : ''}`;
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}}.svg`,
    message: commentMessage,
    name: getRandomElementFromArray(data.USER_NAMES),
  };
};

/**
 * Создаёт объект карточки с комментариями
 * @return {card}
 */
const createCard = () => {
  const cardId = generateCardId();
  const commentsArray = Array.from({length: getRandomInteger(0, 30)}, createComment);
  return {
    id: cardId,
    url: `photos/${cardId}.jpg`,
    description: getRandomElementFromArray(data.CARD_DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: commentsArray,
  };
};

/**
 * Создает массив со всеми карточками
 * @param {number} cardCount
 * @return {array<card>}
 */
export const createCards = (cardCount) => Array.from({length: cardCount}, createCard);
