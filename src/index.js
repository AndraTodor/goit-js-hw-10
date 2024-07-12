import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const errorElement = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  // Inițializăm SlimSelect și atașăm evenimentul de schimbare
  const slimSelect = new SlimSelect({
    select: breedSelect,
    events: {
      afterChange: handleBreedChange,
    },
  });

  async function initializeBreeds() {
    try {
      toggleLoader(true);
      const breeds = await fetchBreeds();
      console.log('Breeds:', breeds); // Verificăm răspunsul pentru rase
      populateBreedSelect(breeds);
      toggleLoader(false);
    } catch (error) {
      showError(error.message);
    }
  }

  function populateBreedSelect(breeds) {
    const options = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    breedSelect.innerHTML = options;
    slimSelect.setData(
      breeds.map(breed => ({ text: breed.name, value: breed.id }))
    );
    console.log('Options:', options); // Verificăm opțiunile
  }

  async function handleBreedChange(event) {
    const selectedOption = event[0];
    const breedId = selectedOption.value;
    console.log('Selected breed ID:', breedId); // Verificăm breedId

    if (!breedId) return;

    try {
      toggleLoader(true);
      const catData = await fetchCatByBreed(breedId);
      console.log('Cat data:', catData); // Verificăm catData
      displayCatInfo(catData);
      toggleLoader(false);
    } catch (error) {
      showError(error.message);
    }
  }

  function displayCatInfo(catData) {
    if (
      !catData ||
      !catData[0] ||
      !catData[0].breeds ||
      catData[0].breeds.length === 0
    ) {
      showError('No data found for this breed');
      return;
    }
    const { url, breeds } = catData[0];
    const breed = breeds[0];
    catInfo.innerHTML = `
        <img src="${url}" alt="${breed.name}">
        <div>
          <h2>${breed.name}</h2>
          <p>${breed.description}</p>
          <p><strong>Temperament:</strong> ${breed.temperament}</p>
        </div>
      `;
  }

  function toggleLoader(isLoading) {
    if (isLoading) {
      loader.style.display = 'block';
      catInfo.style.display = 'none';
      breedSelect.style.display = 'none';
    } else {
      loader.style.display = 'none';
      catInfo.style.display = 'flex';
      breedSelect.style.display = 'block';
    }
  }

  function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => (errorElement.style.display = 'none'), 5000);
  }

  initializeBreeds();
});
