const galleryRef = document.querySelector('.gallery');
import cardsTpl from './cards.hbs';

function updateCardsMarkup(data) {
  const markup = cardsTpl(data);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default updateCardsMarkup;
