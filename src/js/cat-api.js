export { fetchBreeds, fetchCatByBreed };
  

const BASE_URL = 'https://api.thecatapi.com/v1';

const API_KEY =
  'live_1YELEVGwPOFOk3KlEghYIeMuhTwtlecqxmkZer7mfZXDcGvfElaW6VigYbOXyG87';

const options = {
  headers: {
    'x-api-key': API_KEY,
  },
};

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, options)
    .then(
      r => {
        if (!r.ok) {
          throw new Error
        }
      return r.json();
    })
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?&breed_ids=${breedId}&api_key=${API_KEY}`,
    options
  ).then(r => {
     if (!r.ok) { 
       throw new Error();
     }
    return r.json();
  });
}