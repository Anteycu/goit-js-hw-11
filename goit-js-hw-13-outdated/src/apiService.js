const apiKey = '17976962-b1f0a6808ca31d6d2a32d8551';

export default {
  searchQuery: '',
  page: 1,
  fetchImg() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        return data;
      })
      .catch(error => console.log(error));
  },
  get query() {
    return this.searchQuery;
  },
  set query(newQuery) {
    this.searchQuery = newQuery;
  },
  resetPage() {
    this.page = 1;
  },
};
