const modal = document.querySelector('.big-picture');
const COMMENT_VIEW_INCREMENT = 5;
/**
 * Открывает модальное окно
 */
const openModal = () => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

/**
 * Закрывает модальное окно
 */
const closeModal = () => {
  document.body.classList.remove('modal-open');
  modal.classList.add('hidden');
};

/**
 * Создаёт ноду комментария
 * @param {comment} commentData
 * @return {HTMLElement}
 */
const createComment = (commentData) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `<img class="social__picture" src="${commentData.avatar}" alt="${commentData.name}" width="35" height="35">`;
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.innerText = commentData.message;
  comment.append(commentText);
  return comment;
};

/**
 * Вставляет массив комментариев
 * @param {array<comment>} comments
 * @param {number} increment
 */
const appendComments = (comments, increment) => {
  let count = increment;
  return () => {
    const commentsContainer = modal.querySelector('.social__comments');
    const commentsLoader = document.querySelector('.comments-loader');
    const commentsCountStart = document.querySelector('.comments-count-start');
    commentsLoader.classList.remove('hidden');
    commentsCountStart.textContent = count;
    if (comments.length <= count) {
      commentsCountStart.textContent = comments.length;
      commentsLoader.classList.add('hidden');
    }
    if (comments.length === 0) {
      commentsContainer.innerHTML = '<p style="text-align: center">Комментариев пока нет :(<p>';
    }
    commentsContainer.innerHTML = '';
    for (let i = 0; i < Math.min(count, comments.length); i++) {
      commentsContainer.append(createComment(comments[i]));
    }
    count += increment;
  };
};

/**
 * Заполняет данными разметку модального окна
 * @param {card} cardInfo - данные карточки
 */
const configureModal = (cardInfo) => {
  modal.querySelector('.big-picture__img img').src = cardInfo.url;
  modal.querySelector('.big-picture__img img').alt = cardInfo.description;
  modal.querySelector('.likes-count').textContent = cardInfo.likes;
  modal.querySelector('.social__caption').textContent = cardInfo.description;
  modal.querySelector('.comments-count').textContent = cardInfo.comments.length;
  const appendHandler = appendComments(cardInfo.comments, COMMENT_VIEW_INCREMENT);
  appendHandler();
  modal.querySelector('.comments-loader').addEventListener('click', appendHandler);
  return () => modal.querySelector('.comments-loader').removeEventListener('click', appendHandler);
};


/**
 * Обрабатывает закрытие модального окна через клик мыши
 * @param {Event | KeyboardEvent} evt
 * @param {function} handler - обработчик, который нужно удалить
 */
const clickAndKeyHandler = (evt, handler) => {
  const isOverlay = evt.target.classList.contains('overlay');
  const isCloseButton = evt.target.classList.contains('cancel');

  if (isOverlay || isCloseButton || evt.key === 'Escape') {
    closeModal();
    document.removeEventListener('keydown', handler);
    modal.removeEventListener('click', handler);
  }
};


/**
 * Открывает модальное окно с данными
 * @param {card} cardData - объект карточки, которую нужно отрисовать
 */
export const openModalWithData = (cardData) => {
  if (!modal) {
    return;
  }
  const removeMoreButtonListener = configureModal(cardData);
  openModal();
  const closeModalHandler = (evt) => {
    removeMoreButtonListener();
    clickAndKeyHandler(evt, closeModalHandler);
  };
  modal.addEventListener('click', closeModalHandler, {once: true});
  document.addEventListener('keydown', closeModalHandler, {once: true});
};
