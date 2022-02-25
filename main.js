import './style.css';
import arrayShuffle from 'array-shuffle';

// Getting a array from Rick and morty API 20pages/20People
fetchPeople();

async function fetchPeople() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    // console.log(data.results[1].image); // results out of the API e.g. data.results[1].image
    // createPeopleList(data.results);
    renderCards(data.results);
    randomName(data.results);
  } catch (error) {
    console.log(error);
  }
}

const cardsContainer = document.querySelector('[data-js=cards]');
// Create Card Element

function renderCards(cards) {
  // cards is an array with 20 objects, we get from the api

  cardsContainer.innerHTML = ''; // cleans up the cardsContainer so we can create new cards without the previous content
  cards.forEach(card => {
    const personNames = cards.map(person => {
      return person.name;
    });
    console.log(personNames);
    const filteredPersonNames = personNames.filter(name => name !== card.name);
    console.log(filteredPersonNames);

    const shuffledFilteredPersonNames = arrayShuffle(filteredPersonNames);

    const cardElement = document.createElement('li');
    cardElement.className = 'card';
    cardElement.innerHTML = `
      <img src=${card.image}>
      <p>Who is this?</p>
      <div class="answers">
      <button data-js="card-button">${card.name}</button>
      <div class="answers" data-js="wrong-div">
      <button data-js="card-button-wrong">${shuffledFilteredPersonNames[0]}</button>
      <button data-js="card-button-wrong">${shuffledFilteredPersonNames[1]}</button>
      <button data-js="card-button-wrong">${shuffledFilteredPersonNames[2]}</button>
      </div>
      </div>
      <p data-js="wrong-answer" hidden>wrong</p>
      <p data-js="answer" hidden>right</p>
    `;
    cardsContainer.append(cardElement);

    const answerButton = cardElement.querySelector('[data-js=card-button]'); // Sucht im cardElement den button welchen wir vorher im cardElement.innerHTML erstellt haben.
    const answerElement = cardElement.querySelector('[data-js=answer]'); // Sucht im cardElement den answer welchen wir vorher im cardElement.innerHTML erstellt haben.
    const answerElementWrong = cardElement.querySelector('[data-js=wrong-answer]');

    const wrongDiv = cardElement.querySelectorAll('[data-js=wrong-div]');

    wrongDiv.forEach(button => {
      button.addEventListener('click', () => {
        answerElementWrong.removeAttribute('hidden');
        answerElement.setAttribute('hidden', '');
      });
    });

    answerButton.addEventListener('click', () => {
      answerElement.removeAttribute('hidden');
      answerElementWrong.setAttribute('hidden', ''); // hidden wird im p Element zugewiesen, welches wir im cardElement.innerHTML erstellen.
    });
  });
}
