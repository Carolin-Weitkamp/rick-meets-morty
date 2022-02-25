import './style.css';

// Getting a array from Rick and morty API 20pages/20People
fetchPeople();

async function fetchPeople() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    console.log(data);
    // console.log(data.results[1].image); // results out of the API e.g. data.results[1].image
    // createPeopleList(data.results);
    renderCards(data.results);
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
    const cardElement = document.createElement('li');
    cardElement.className = 'card';
    cardElement.innerHTML = `
      <img src=${card.image}>
      <p>Who is this?</p>
      <button data-js="card-button">answer</button>
      <p data-js="answer" hidden>${card.name}</p>
    `;
    cardsContainer.append(cardElement);

    const answerButton = cardElement.querySelector('[data-js=card-button]'); // Sucht im cardElement den button welchen wir vorher im cardElement.innerHTML erstellt haben.
    const answerElement = cardElement.querySelector('[data-js=answer]'); // Sucht im cardElement den answer welchen wir vorher im cardElement.innerHTML erstellt haben.

    answerButton.addEventListener('click', () => {
      answerElement.toggleAttribute('hidden'); // hidden wird im p Element zugewiesen, welches wir im cardElement.innerHTML erstellen.
    });
  });
}
