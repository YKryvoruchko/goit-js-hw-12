import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a');


export function clearGallery() {
  gallery.innerHTML = '';
}


export  function createGallery(images) {
  const markup = images
    .map(image => {
      return `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="info">
          <p><span>Likes</span><span>${image.likes}</span></p>
          <p><span>Views</span><span>${image.views}</span></p>
          <p><span>Comments</span><span>${image.comments}</span></p>
          <p><span>Downloads</span><span>${image.downloads}</span></p>
        </div>
      </li>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}


export function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}


export function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}