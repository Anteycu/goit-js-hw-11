function createMarkup(dataArr, galleryRef) {
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

export default createMarkup;
