import './css/styles.css';
import fetchCountries from './fetchCountries';

export const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com/v3.1/name';

const refs = {
  inputSearch: document.querySelector('[id="search-box"]'),
};

refs.inputSearch.addEventListener('input', handleInputSearch);

function handleInputSearch(event) {
  let name = event.target.value;
  fetchCountries(name);
}
