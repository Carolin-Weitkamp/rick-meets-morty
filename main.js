import './style.css';

fetchPeople();

async function fetchPeople() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    console.log(data.results[1].image); // results out of the API e.g. data.results[1].image
    // createPeopleList(data.results);
  } catch (error) {
    console.log(error);
  }
}

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
