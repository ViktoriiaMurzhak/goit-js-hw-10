import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countrylist = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY));

function getCountryData(event) {
  const countryName = event.target.value.trim();

  if (!countryName) {
    removeMarkup(countrylist);
    removeMarkup(countryEl);
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        removeMarkup(countrylist);
        removeMarkup(countryEl);
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length >= 2 && data.length <= 10) {
        removeMarkup(countryEl);
        countrylist.insertAdjacentHTML('beforeend', countryListMarkup(data));
        countryListMarkup(data);
        return;
      } else {
        removeMarkup(countrylist);
        countryEl.insertAdjacentHTML('beforeend', countryMarkup(data));
        countryMarkup(data);
        return;
      }
    })
    .catch(err => {
      removeMarkup(countrylist);
      removeMarkup(countryEl);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function countryMarkup(countryData) {
  return countryData
    .map(({ flags, name, capital, population, languages }) => {
      return `
  <div class="flag__name">
  <img class="country__img" src="${flags.svg}" alt="flag">
  <p class="country__text">${name.official}</p>
  </div>
   <ul class="country__span_list">
  <li class="country__li">&#9733 Capital:
  <span class="country__span">${capital}</span>
  </li>
   <li class="country__li">&#9733 Population:
  <span class="country__span">${population}</span>
  </li>
   <li class="country__li">&#9733 Languages:
  <span class="country__span">${Object.values(languages).join(', ')}</span>
  </li>
  </ul>`;
    })
    .join('');
}

function countryListMarkup(countryData) {
  return countryData
    .map(({ flags, name }) => {
      return `
    <li class="cards__item">
    <img class="cards__img" src="${flags.svg}" alt="flag">
    <p class="card__text">${name.official}</p>
    </li>
    `;
    })
    .join('');
}

function removeMarkup(element) {
  element.innerHTML = '';
}
