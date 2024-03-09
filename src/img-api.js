import axios from 'axios';

const API_KEY = '17976962-b1f0a6808ca31d6d2a32d8551';
const BASE_URL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

const headers = {
  'Content-Type': 'application/json',
};

const fetchUserReq = req => {
  searchParams.set('q', req);
  return axios.get(`${BASE_URL}?${searchParams}`, { headers });
};

const fetchMoreContent = async () => {
  const page = searchParams.get('page');
  searchParams.set('page', `${Number(page) + 1}`);

  const {
    data: { totalHits, hits },
  } = await axios.get(`${BASE_URL}?${searchParams}`, { headers });

  const isEnd = page >= Math.ceil(totalHits / searchParams.get('per_page'));

  return { hits, isEnd };
};

export { fetchUserReq, fetchMoreContent };
