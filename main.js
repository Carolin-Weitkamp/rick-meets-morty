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

// function createPeopleList(people) {
//   const listElement = document.createElement('ul');
//   listElement.className = 'tag-list';
//   document.body.append(listElement);

//   people.forEach(person => {
//     const item = document.createElement('li');
//     item.className = 'tag';

//     const header = document.createElement('h2');
//     header.innerHTML = person.name;
//     item.append(header);

//     const listWrapper = document.createElement('ul');
//     item.append(listWrapper);

//     const image = document.createElement('img');
//     image.src = person.image;
//     listWrapper.append(image);

//     listElement.append(item);
//   });
// }

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
      <button data-js="card-button">${card.name}</button>
      <div data-js="wrong-div">
      <button data-js="card-button-wrong">${shuffledFilteredPersonNames[0]}</button>
      <button data-js="card-button-wrong">${shuffledFilteredPersonNames[1]}</button>
      <button data-js="card-button-wrong">${shuffledFilteredPersonNames[2]}</button>
      </div>
      <p data-js="wrong-answer" hidden>wrong</p>
      <p data-js="answer" hidden>right</p>
    `;
    cardsContainer.append(cardElement);

    const answerButton = cardElement.querySelector('[data-js=card-button]'); // Sucht im cardElement den button welchen wir vorher im cardElement.innerHTML erstellt haben.
    const answerElement = cardElement.querySelector('[data-js=answer]'); // Sucht im cardElement den answer welchen wir vorher im cardElement.innerHTML erstellt haben.
    const answerButtonWrong = cardElement.querySelector('[data-js=card-button-wrong]');
    const answerElementWrong = cardElement.querySelector('[data-js=wrong-answer]');

    const wrongDiv = cardElement.querySelectorAll('[data-js=wrong-div]');

    wrongDiv.forEach(button => {
      button.addEventListener('click', () => {
        answerElement.removeAttribute('hidden');
        answerElementWrong.setAttribute('hidden', '');
      });
    });

    answerButton.addEventListener('click', () => {
      answerElementWrong.removeAttribute('hidden');
      answerElement.setAttribute('hidden', ''); // hidden wird im p Element zugewiesen, welches wir im cardElement.innerHTML erstellen.
    });
  });
}

function randomName(cards) {
  cards.map(names => {
    return names;
  });
}
// console.log(nameContainer[0]);
