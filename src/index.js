import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.querySelector('[id="search-box"]'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputSearch.addEventListener('input', debounce(handleInputSearch, DEBOUNCE_DELAY));

function handleInputSearch(event) {
  const name = event.target.value.trim();
  if (name !== '') {
    fetchCountries(name)
      .then(data => {
        const countriesQuantity = data.length;
        if (countriesQuantity > 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');
        }
        if (countriesQuantity > 2 && countriesQuantity < 10) {
          refs.countryInfo.innerHTML = '';
          refs.countryList.innerHTML = renderCountriesList(data);
        }
        if (countriesQuantity === 1) {
          refs.countryInfo.innerHTML = renderCountry(data);
          refs.countryList.innerHTML = '';
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

function renderCountriesList(array) {
  return array
    .map(
      ({ name: { common }, flags: { svg } }) =>
        `<li class='item-list'>
        <img src=${svg} alt="flag" width='60px'>
        <p>${common}</p>
      </li>`,
    )
    .join('');
}
function renderCountry(array) {
  return array
    .map(
      ({ name: { common }, capital, population, flags: { svg }, languages }) =>
        `<ul>
  <div class='item'>
    <img src="${svg}" alt="flag" width='60px' />
    <p>${common}</p>
  </div>
  <p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages).join(', ')}</p>
</ul>`,
    )
    .join('');
}
