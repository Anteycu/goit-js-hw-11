import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchUserReq, fetchMoreContent } from './img-api';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
// const loadMoreBtnRef = document.querySelector('.load-more');
const observerGuardRef = document.querySelector('[data-guard]');

formRef.addEventListener('submit', searchHandler);
// loadMoreBtnRef.addEventListener('click', onLoadMore);

let galleryInstance = null;

const observOptions = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(loadMore, observOptions);

function searchHandler(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget.elements;

  fetchUserReq(searchQuery.value)
    .then(({ data: { totalHits, hits } }) => {
      if (!totalHits) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      galleryRef.innerHTML = '';
      createMarkup(hits);
      smoothScroll(galleryRef, 2, { isDivision: true });
      galleryInstance = new SimpleLightbox('.gallery a');
      // loadMoreBtnRef.classList.remove('visually-hidden');
      observer.observe(observerGuardRef);
    })
    .catch(err => Notify.failure(`Error code:${err.code}. Details: ${err}`));
}

async function onLoadMore() {
  const { hits, isEnd } = await fetchMoreContent();

  try {
    if (isEnd) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      // loadMoreBtnRef.classList.add('visually-hidden');
      observer.unobserve(observerGuardRef);
      return;
    }
    createMarkup(hits);
    smoothScroll(galleryRef, 2);
    galleryInstance.refresh();
  } catch (err) {
    Notify.failure(`Error code:${err.code}. Details: ${err}`);
  }
}

function loadMore(entries, observer) {
  entries.forEach(entry => {
    entry.isIntersecting && onLoadMore();
  });
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
   <a href="${largeImageURL}" class="photo-card_link">
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
    </a>
   </div>`;
  });
  galleryRef.insertAdjacentHTML('beforeend', cardsMarkup.join(''));
}

function smoothScroll(galleryRef, cardQuantity = 1, { isDivision } = false) {
  const { height: cardHeight } =
    galleryRef.firstElementChild.getBoundingClientRect();
  let scrollDistance = null;
  if (isDivision) {
    scrollDistance = cardHeight / cardQuantity;
  } else {
    scrollDistance = cardHeight * cardQuantity;
  }

  window.scrollBy({
    top: scrollDistance,
    behavior: 'smooth',
  });
}
