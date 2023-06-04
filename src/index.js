import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

const breedSelect = document.querySelector('.breed-select');

fetchBreeds()
  .then(renderBreeds)
  .catch(error => console.log(error));

function renderBreeds(breeds) {
  const markup = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
  select.insertAdjacentHTML('beforeend', markup);
}

select.addEventListener('change', setOutput);

function setOutput() {
  const selectedOptionValue = select.value;
  console.log('selectedOptionValue: ', selectedOptionValue);

  fetchCatByBreed(selectedOptionValue)
      .then(data => {
          showLoader();
          setTimeout(() => {
              renderCatInfo(data);
         }, 0)
          
    })
    .catch(error => console.log(error));
}

function renderCatInfo(cats) {
  showLoader();
  catInfo.innerHTML = '';
  const markup = cats.map(cat => `<img src="${cat.url}" width="300">`).join('');
    catInfo.insertAdjacentHTML('beforeend', markup);
    hidenLoader();
}

function showLoader() {
  loader.style.display = 'block';
  catInfo.style.display = 'none';
}

function hidenLoader() {
  loader.style.display = 'none';
  catInfo.style.display = 'block';
}
