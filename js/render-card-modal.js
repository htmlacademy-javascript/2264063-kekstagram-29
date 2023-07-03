const modal = document.querySelector('.big-picture');

/**
 * Открывает модальное окно
 */
const openModal = () => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  modal.querySelector('.social__comment-count').classList.add('hidden');
  modal.querySelector('.comments-loader').classList.add('hidden');
};

/**
 * Закрывает модальное окно
 */
const closeModal = () => {
  document.body.classList.remove('modal-open');
  modal.classList.add('hidden');
};

/**
 * Создаёт объект комментария
 * @param {comment} commentData
 * @return {string}
 */
const createComment = (commentData) => `
  <li class="social__comment">
      <img class="social__picture"
      src="${commentData.avatar}"
      alt="${commentData.name}"
      width="35" height="35"
      >
      <p class="social__text">${commentData.message}</p>
   </li>
  `;

/**
 * Создаёт массив комментариев
 * @param {array<comment>} commentsData
 * @return {array}
 */
const createCommentsArray = (commentsData) => commentsData.map((commentInfo) => createComment(commentInfo));

/**
 * Заполняет данными разметку модального окна
 * @param {card} cardInfo - данные карточки
 */
const fillModalWithData = (cardInfo) => {
  modal.querySelector('.big-picture__img img').src = cardInfo.url;
  modal.querySelector('.big-picture__img img').alt = cardInfo.description;
  modal.querySelector('.likes-count').textContent = cardInfo.likes;
  modal.querySelector('.social__caption').textContent = cardInfo.description;
  modal.querySelector('.comments-count').textContent = cardInfo.comments.length;
  const comments = cardInfo.comments.length > 0 ? createCommentsArray(cardInfo.comments).reduce((result, element) => result + element, '') : '<p style="text-align: center">Комментариев пока нет :(<p>';
  modal.querySelector('.social__comments').innerHTML = comments;
};

/**
 * Открывает модальное окно с данными
 * @param {card} cardData - объект карточки, которую нужно отрисовать
 */
export const openModalWithData = (cardData) => {
  if (!modal) {
    return;
  }
  fillModalWithData(cardData);
  openModal();
  const closeModalFromClickHandler = (evt) => {
    const isOverlay = evt.target.classList.contains('overlay');
    const isCloseButton = evt.target.classList.contains('cancel');
    if (isOverlay || isCloseButton) {
      closeModal();
      modal.removeEventListener('click', closeModalFromClickHandler);
    }
  };
  const closeModalFromKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
      modal.removeEventListener('click', closeModalFromKeyHandler);
    }
  };
  modal.addEventListener('click', closeModalFromClickHandler);
  document.addEventListener('keydown', closeModalFromKeyHandler);
};
