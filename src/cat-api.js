import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_EOxSk9C9jNcSFnHaPGIwktfNp8mijHfnqXKPgBXildEGwJH7bdWudfgGbsKLYYSn';

const BASE_URL = 'https://api.thecatapi.com/v1';

export async function fetchBreeds() {
  try {
    const response = await axios.get(`${BASE_URL}/breeds`);
    console.log(response.data); // Adăugați acest log pentru a verifica răspunsul
    return response.data;
  } catch (error) {
    console.error('Failed to fetch breeds:', error); // Adăugați acest log pentru erori
    throw new Error('Failed to fetch breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`${BASE_URL}/images/search`, {
      params: { breed_ids: breedId },
    });
    console.log(response.data); // Adăugați acest log pentru a verifica răspunsul
    return response.data[0];
  } catch (error) {
    console.error('Failed to fetch cat details:', error); // Adăugați acest log pentru erori
    throw new Error('Failed to fetch cat details');
  }
}
