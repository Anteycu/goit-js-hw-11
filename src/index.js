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
    .then(({ data: { totalHits, hits } }) => {
      if (!totalHits) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      createMarkup(hits);
      loadMoreBtnRef.classList.remove('visually-hidden');
    })
    .catch(err =>
      Notify.failure(`Error code:${err.code}. Details: ${err.response.data}`)
    );
}

async function loadMoreHandler() {
  const { hits, isEnd } = await fetchMoreContent();

  try {
    if (isEnd) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtnRef.classList.add('visually-hidden');
      return;
    }
    createMarkup(hits);
  } catch (err) {
    Notify.failure(`Error code:${err.code}. Details: ${err.response.data}`);
  }
}

function createMarkup(dataArr) {
  const cardsMarkup = dataArr.map(imgItem => {
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
  <div class="gallery_photo-card photo-card">
   <img src="${webformatURL}" alt="${tags}" width="640" loading="lazy" />
   <div class="photo-card_info info">
     <p class="info-item">
       <b>Likes ${likes}</b>
     </p>
     <p class="info-item">
       <b>Views ${views}</b>
     </p>
     <p class="info-item">
       <b>Comments ${comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads ${downloads}</b>
     </p>
   </div>
  </div>`;
  });
  galleryRef.insertAdjacentHTML('beforeend', cardsMarkup.join(''));
}
