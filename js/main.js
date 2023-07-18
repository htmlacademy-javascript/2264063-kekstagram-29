import {renderCards} from './render-cards.js';
import './upload-image-form.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
getData()
  .then((cards) => renderCards(cards))
  .catch((error) => showAlert(error.message));
