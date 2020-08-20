import './styles.css';
import apiService from './apiService';
import updateCardsMarkup from './update-cards-markup';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const buttonRef = document.querySelector('.extra-cards-btn');

formRef.addEventListener('submit', getSearchCountry);

function getSearchCountry(evt) {
  evt.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  galleryRef.innerHTML = '';
  formRef.reset();

  apiService.resetPage();

  apiService.fetchImg().then(data => {
    console.log(data);
    updateCardsMarkup(data);
    buttonRef.classList.remove('is-hidden');
    window.scrollTo({
      top: 1000,
    });
  });
}

buttonRef.addEventListener('click', () => {
  apiService.fetchImg().then(data => {
    console.log(data);
    updateCardsMarkup(data);
    buttonRef.classList.remove('is-hidden');
  });
});
