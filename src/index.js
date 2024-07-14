import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_BbC2EF5rJUMSGRwCoPmF804zBd1v7xCMEUth0NSNW11Zqfz0pHf6j020T9MaXWDf';

const breedSelect = document.querySelector('.breed-select');
const loaderSelect = document.querySelector('.loader');
const errorSelect = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onSelectChanges);

function createCatList() {
  loaderSelect.classList.remove('is-hidden');
  breedSelect.classList.add('is-hidden');
  errorSelect.classList.add('is-hidden');

  fetchBreeds()
    .then(data => {
      const optionsList = data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join(' ');
      breedSelect.innerHTML = optionsList;
      new SlimSelect({
        select: breedSelect,
      });
      loaderSelect.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}
createCatList();

function onSelectChanges(event) {
  loaderSelect.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');
  const selectedBreedId = event.currentTarget.value;
  fetchCatByBreed(selectedBreedId)
    .then(data => {
      markupInfo(data);
      loaderSelect.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      loaderSelect.classList.add('is-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function markupInfo(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const breedCard = `<img class="foto-cat" width = "360px" src="${url}" alt="${name}">
    <div class="text-part">
  <h2 class="cat-name">${name}</h2>
  <p class="cat-description">${description}</p>
  <p class="cat-temperament"><span class="temperament-label">Temperament:</span> ${temperament}</p>  </div>`;
}
catInfo.innerHTML = breedCard;
