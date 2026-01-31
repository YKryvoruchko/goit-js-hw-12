import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54231751-132efb34a356b2aedfd75411f';

export async function getImages(query, page=1, perPage=15) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
}