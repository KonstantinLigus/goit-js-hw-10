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
  if (name === '') {
    return;
  }
  fetchCountries(name)
    .then(data => {
      const countriesQuantity = data.length;
      if (countriesQuantity > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if (countriesQuantity > 2 && countriesQuantity < 10) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = createCountriesList(data);
      }
      if (countriesQuantity === 1) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = createCountry(data);
      }
    })
    .catch((error) => {
      Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}

function createCountriesList(array) {
  return array
    .map(
      ({ name: { common }, flags: { svg } }) =>
        `<li class='item-list'>
        <img src=${svg} alt="flag" width='100px'/>
        <p>${common}</p>
      </li>`,
    )
    .join('');
}
function createCountry(array) {
  return array
    .map(
      ({ name: { common }, capital, population, flags: { svg }, languages }) =>
        `<ul>
        <li>
          <div class='item'>
            <img src="${svg}" alt="flag" width='150px'/>
            <p>${common}</p>
          </div>
        </li>
        <li>
          <p class='text'>Capital: <span>${capital}</span></p>
        </li>
        <li>
          <p class='text'>Population: <span>${population}</span></p>
        </li>
        <li>
          <p class='text'>Languages: <span>${Object.values(languages).join(', ')}</span></p>
        </li>
      </ul>`,
    )
    .join('');
}
