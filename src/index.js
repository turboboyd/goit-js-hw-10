import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
const select = document.querySelector('.breed-select');
const catInfoBlock = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

const textError = document.querySelector('.error');

fetchBreeds()
  .then(renderBreed)
  .catch(err => {
    console.log(err),
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

function renderBreed(breeds) {
  showLoader();
  setTimeout(() => {
    breeds.map(breed => renderSelectyBreed(breed));
    hidenLoader();
    select.style.visibility = 'visible';
    new SlimSelect({
      select: '#single',
    });
  }, 1000);
}

function renderSelectyBreed({ id, name }) {
  const markup = `<option value="${id}">${name}</option>`;
  return select.insertAdjacentHTML('beforeend', markup);
}

select.addEventListener('change', setOutput);

function setOutput() {
  const selectedOptionValue = select.value;

  fetchCatByBreed(selectedOptionValue)
    .then(cats => {
      showLoader();
      resetCatInfo();
      setTimeout(() => {
        cats.map(cat => renderCatInfo(cat));
        hidenLoader();
      }, 1000);
    })
    .catch(err => {
      hidenLoader(),
        console.log(err),
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function renderCatInfo(cat) {
  const { name, description, temperament } = cat.breeds[0];
  const markup = `<img src="${cat.url}" width="400">
        <div class="desc-wrapper">
        <h2>${name}</h2>
        <p class="description">${description}</p>
        <p class="temperament"><b>Temperament:${temperament} </b></p>
      </div>`;
  catInfoBlock.insertAdjacentHTML('beforeend', markup);
}

function resetCatInfo() {
  catInfoBlock.innerHTML = '';
}

function showLoader() {
  loader.style.display = 'block';
}

function hidenLoader() {
  loader.style.display = 'none';
}
