import './upload-image-form.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
import {initCardFilter} from './card-filter.js';
getData()
  .then(initCardFilter)
  .catch((error) => showAlert(error.message));
