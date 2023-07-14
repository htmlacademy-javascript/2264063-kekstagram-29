import {Modal} from './modal.js';
import {getCloneFromTemplate} from './utils.js';

const COMMENT_INCREMENT_COUNT = 5;
const modal = new Modal(document.querySelector('.big-picture'));

/**
 * Создаёт ноду комментария
 * @param {comment} commentData
 * @return {HTMLElement}
 */
const createComment = (commentData) => {
  const template = getCloneFromTemplate('#comment');
  if (template) {
    template.querySelector('.social__picture').src = commentData.avatar;
    template.querySelector('.social__picture').alt = commentData.name;
    template.querySelector('.social__text').textContent = commentData.message;
    return template;
  }
  throw new Error('Template does not exist.');
};

/**
 * Вставляет массив комментариев
 * @param {array<comment>} comments
 * @param {number} increment
 */
const getCommentIncrementor = (comments, increment) => {
  let count = increment;
  return () => {
    const commentsFragment = document.createDocumentFragment();
    const commentsContainer = modal.el.querySelector('.social__comments');
    const commentsLoader = document.querySelector('.comments-loader');
    const commentsCountStart = document.querySelector('.comments-count-start');
    commentsLoader.classList.remove('hidden');
    commentsCountStart.textContent = count;
    if (comments.length <= count) {
      commentsCountStart.textContent = comments.length;
      commentsLoader.classList.add('hidden');
    }
    commentsContainer.innerHTML = '';
    for (let i = 0; i < Math.min(count, comments.length); i++) {
      commentsFragment.append(createComment(comments[i]));
    }
    commentsContainer.append(commentsFragment);
    count += increment;
  };
};

/**
 * Заполняет данными разметку модального окна
 * @param {card} cardInfo - данные карточки
 */
const configureModal = (cardInfo) => {
  modal.el.querySelector('.big-picture__img img').src = cardInfo.url;
  modal.el.querySelector('.big-picture__img img').alt = cardInfo.description;
  modal.el.querySelector('.likes-count').textContent = cardInfo.likes;
  modal.el.querySelector('.social__caption').textContent = cardInfo.description;
  modal.el.querySelector('.comments-count').textContent = cardInfo.comments.length;
  const incrementComments = getCommentIncrementor(cardInfo.comments, COMMENT_INCREMENT_COUNT);
  incrementComments();
  modal.addListener(modal.el.querySelector('.comments-loader'), 'click', incrementComments);
};

/**
 * Открывает модальное окно с данными
 * @param {card} cardData - объект карточки, которую нужно отрисовать
 */
export const openModalWithData = (cardData) => {
  if (!modal) {
    return;
  }
  configureModal(cardData);
  modal.open();
};
