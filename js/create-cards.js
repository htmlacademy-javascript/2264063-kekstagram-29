import {
  createRandomIdFromRangeGenerator,
  getUniqueInteger,
  getRandomElementFromArray,
  getRandomInteger
} from './utils.js';
import * as data from './mocks.js';

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

// Объявление генераторов id
const generateCardId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = getUniqueInteger(1);

/**
 * Создаёт объект комментария
 * @param {string} userName
 * @param {string} message
 * @return {comment}
 */
const createComment = ({userName, message}) => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: message,
  name: userName,
});

/**
 * Создаёт объект карточки с комментариями
 * @param {string} description
 * @param {number} countOfLikes
 * @param {array<comment>} comments
 * @return {card}
 */
const createCard = ({description, countOfLikes, comments}) => {
  const cardId = generateCardId();
  return {
    id: cardId,
    url: `photos/${cardId}.jpg`,
    description: description,
    likes: countOfLikes,
    comments: comments,
  };
};

/**
 * Создает массив со всеми карточками
 * @param {number} cardCount
 * @return {array<card>}
 */
export const createCards = (cardCount) => Array.from({length: cardCount}, () => {
  const comments = Array.from({length: getRandomInteger(0, 30)}, () => {
    const commentSettings = {
      userName: getRandomElementFromArray(data.USER_NAMES),
      message: `${getRandomElementFromArray(data.COMMENT_MESSAGES)} ${getRandomInteger(0, 1) ? `\n${getRandomElementFromArray(data.COMMENT_MESSAGES)}` : ''}`,
    };
    return createComment(commentSettings);
  });
  const cardSettings = {
    description: getRandomElementFromArray(data.CARD_DESCRIPTIONS),
    countOfLikes: getRandomInteger(15, 200),
    comments: comments,
  };
  return createCard(cardSettings);
});
