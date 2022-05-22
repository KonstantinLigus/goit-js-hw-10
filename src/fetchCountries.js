import { DEBOUNCE_DELAY } from './index';

const debounce = require('lodash.debounce');

export function fetchCountries(name) {
  debounce(fetch, 300);
  fetch(`${URL}/${name}`);
}
