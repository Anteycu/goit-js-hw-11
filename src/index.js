import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchUserReq, fetchMoreContent } from './img-api';
import { errorHandler, warningHandler, infoHandler } from './errorHandler';
import createMarkup from './createMarkup';
import smoothScroll from './smoothScroll';

// **Load more with button (without infinity-scroll implementation)**
// import Loader from './loader';
// const loadMore = new Loader({ selector: '.load-more', disabled: false });
// loadMore.btnRef.addEventListener('click', onLoadMore);

// **Load more with infinity-scroll
const observerGuardRef = document.querySelector('[data-guard]');
const observer = new IntersectionObserver(loadMore, { rootMargin: '300px' });
function loadMore(entries, observer) {
  entries.forEach(entry => {
    entry.isIntersecting && onLoadMore();
  });
}

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', searchHandler);

let galleryModal = null;

function searchHandler(e) {
  e.preventDefault();
  const { searchQuery } = e.currentTarget.elements;

  fetchUserReq(searchQuery.value)
    .then(({ data: { totalHits, hits } }) => {
      if (!totalHits) {
        warningHandler(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      galleryRef.innerHTML = '';
      createMarkup(hits, galleryRef);
      // loadMore.show();
      observer.observe(observerGuardRef);
      smoothScroll({ galleryRef, isDivision: true });
      galleryModal = new SimpleLightbox('.gallery a');
    })
    .catch(err => errorHandler(err));
}

async function onLoadMore() {
  // loadMore.toggleDisable();
  try {
    const { hits, isEnd } = await fetchMoreContent();
    if (isEnd) {
      infoHandler("We're sorry, but you've reached the end of search results.");
      observer.unobserve(observerGuardRef);
      return;
    }
    createMarkup(hits, galleryRef);
    smoothScroll({ galleryRef });
    galleryModal.refresh();
  } catch (err) {
    errorHandler(err);
  }
  // finally {
  //   loadMore.toggleDisable();
  // }
}
