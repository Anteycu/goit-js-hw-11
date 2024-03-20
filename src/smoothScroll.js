const smoothScroll = ({ galleryRef, cardQuantity = 2, isDivision = false }) => {
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
};

export default smoothScroll;
