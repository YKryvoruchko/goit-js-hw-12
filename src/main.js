import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 40;
loadMoreBtn.style.display = 'none';


form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query' });
    return;
  }
  currentQuery = query;
  currentPage = 1;
  clearGallery();
  loadMoreBtn.style.display = 'none';
  showLoader();

  try {
    const data = await getImages(currentQuery, currentPage, perPage);
    
    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!'
      });
      hideLoader();
      return;
    }

    if (currentPage * perPage < data.totalHits) {
      loadMoreBtn.style.display = 'block';
    }
    createGallery(data.hits);
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again later.' });
    console.log(error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  try {
    const data = await getImages(currentQuery, currentPage, perPage);
    createGallery(data.hits);
    
    if (currentPage * perPage >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }

      const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again later.' });
    console.log(error);
  } finally {
    hideLoader();
  }
});