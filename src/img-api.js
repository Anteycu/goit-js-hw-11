import axios from 'axios';

const API_KEY = '17976962-b1f0a6808ca31d6d2a32d8551';
const BASE_URL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: '',
  per_page: 40,
});

const headers = {
  'Content-Type': 'application/json',
};

const fetchUserReq = async req => {
  searchParams.set('q', req);
  searchParams.set('page', 1);
  return await axios.get(`${BASE_URL}?${searchParams}`, { headers });
  // key=${API_KEY}&q=${req}&image_type=photo&orientation=horizontal&safesearch=true
  // problem 2+ req words without "+" in result search string
};

const fetchMoreContent = async () => {
  const page = searchParams.get('page');
  searchParams.set('page', `${Number(page) + 1}`);
  return await axios.get(`${BASE_URL}?${searchParams}`, { headers });
};

export { fetchUserReq, fetchMoreContent };
