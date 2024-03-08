import { fetchUserReq, fetchMoreContent } from './img-api';
import { Notify } from 'notiflix';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more');
formRef.addEventListener('submit', searchHandler);
loadMoreBtnRef.addEventListener('click', loadMoreHandler);

function searchHandler(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget.elements;
  galleryRef.innerHTML = '';

  fetchUserReq(searchQuery.value)
    .then(({ data }) => {
      if (!data.totalHits) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      createMarkup(data);
      loadMoreBtnRef.classList.remove('visually-hidden');
    })
    .catch(err =>
      Notify.failure(`Error code:${err.code}. Details: ${err.response.data}`)
    );
}

function loadMoreHandler() {
  fetchMoreContent()
    .then(({ data }) => {
      console.log(data);
      if (!data.totalHits) {
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtnRef.classList.add('visually-hidden');
        return;
      }
      createMarkup(data);
    })
    .catch(err => {
      Notify.failure(`Error code:${err.code}. Details: ${err.response.data}`);
    });
}

function createMarkup(dataObj) {
  const { hits } = dataObj;
  const cardsMarkup = hits.map(imgItem => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = imgItem;
    return `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" width="640" loading="lazy" />
   <div class="info">
     <p class="info-item">
       <b>Likes: ${likes}</b>
     </p>
     <p class="info-item">
       <b>Views: ${views}</b>
     </p>
     <p class="info-item">
       <b>Comments: ${comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads: ${downloads}</b>
     </p>
   </div>
  </div>`;
  });
  galleryRef.insertAdjacentHTML('beforeend', cardsMarkup.join(''));
}
