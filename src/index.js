import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] = 'al tau';

const breedSelect = document.querySelector('.breed-select');
const loaderSelect = document.querySelector('.loader');
const errorSelect = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
