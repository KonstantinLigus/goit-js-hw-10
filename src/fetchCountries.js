import 

const debounce = require('lodash.debounce');

export function fetchCountries(name) {
  // debounce();
  fetch(`${URL}/${name}`) /* .then(function (resp) {
    console.log(resp.);
  }) */;
}
