import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_BbC2EF5rJUMSGRwCoPmF804zBd1v7xCMEUth0NSNW11Zqfz0pHf6j020T9MaXWDf'; // Asigură-te că adaugi cheia ta API de la The Cat API

const API_URL = 'https://api.thecatapi.com/v1';

export const fetchBreeds = async () => {
  const response = await axios.get(`${API_URL}/breeds`);
  return response.data;
};

export const fetchCatByBreed = async breedId => {
  const response = await axios.get(`${API_URL}/images/search`, {
    params: { breed_ids: breedId },
  });
  return response.data[0];
};
