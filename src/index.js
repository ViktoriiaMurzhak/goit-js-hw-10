import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY));

function getCountryData(event) {
  const countryName = event.target.value.trim();

  if (!countryName) {
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length === 1) {
        countryMarkup(data[0]);
      }
      countryListMarkup(data);
    })
    .catch(err => {
      alert(err);
    });
}

function countryMarkup(countryData) {
  console.log(countryData.name.official);
}

function countryListMarkup(countryData) {
  // console.log(countryData);
}
