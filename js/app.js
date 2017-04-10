function getData(source, element, option, eFunc) {
  const oReq = new XMLHttpRequest();

  oReq.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    eFunc(source, data, element, option);
  });
  oReq.open('GET', source);
  oReq.send();
}

function addDataToPage(source, data, element, option) {
  if (data.detail === "Not found") {
    displayError(source);
  } else {
    switch(option) {
      case 'people':
        addPeople(data, element);
        break;
      case 'planets':
        addPlanets(data, element);
        break;
      case 'starships':
        addStarships(data, element);
        break;
      default:
        break;
    }
  }
}

function clearInfo() {
  const contentContainer = document.querySelector('#contentContainer');
  if (contentContainer) {
    while (contentContainer.firstChild) {
      contentContainer.removeChild(contentContainer.firstChild);
    }
  }
}

function addPlanets(data, element) {
  const name = document.createElement('h2');
  const terrain = document.createElement('p');
  const population = document.createElement('p');
  const filmsList = document.createElement('ul');

  filmsList.id = 'filmsList';

  name.innerHTML = data.name;
  terrain.innerHTML = data.terrain;
  population.innerHTML = data.population;

  element.style.display = 'none';

  element.appendChild(name);
  element.appendChild(terrain);
  element.appendChild(population);
  element.appendChild(filmsList);

  if (data.films.length === 0) {
    element.style.display = 'block';
  } else {
    for (let i = 0; i < data.films.length; ++i) {
      getData(data.films[i], element, data.films, addFilms);
    }
  }
}

function addPeople(data, element) {
  const name = document.createElement('h2');
  const gender = document.createElement('p');

  name.innerHTML = data.name;
  gender.innerHTML = data.gender;

  // Even though the species is another request, we want all of the info
  // to be shown at one time rather than streamed in
  element.style.display = 'none';

  element.appendChild(name);
  element.appendChild(gender);

  getData(data.species[0], element, null, addSpecies);
}

function addStarships(data, element) {

}

// secondary functions
function addSpecies(source, data, element, option) {
  const species = document.createElement('p');
  species.innerHTML = data.name || 'N/A';
  element.appendChild(species);

  element.style.display = 'block';
}

function addFilms(source, data, element, option) {
  const film = document.createElement('li');
  const filmsList = document.querySelector('#filmsList');

  film.innerHTML = data.title;

  filmsList.appendChild(film);

  // async hax since we can't use generators in the browser...
  if (filmsList.childNodes.length === option.length) {
    element.style.display = 'block';
  }
}

// for when all data is retrieved
function makeContentVisible(element) {
  for (let i = 0; i < element.childNodes.length; ++i) {
    element.childNodes[i].style.display = 'block';
  }
}

function displayError(source) {
  const error = document.createElement('p');
  error.innerHTML = `Error: Fetching resource: ${source} NOT FOUND`;
  error.style['background-color'] = '#FF5050';
  contentContainer.appendChild(error);
}

document.querySelector('#requestResourceButton')
  .addEventListener ('click', function() {
    const option = document.querySelector('#resourceType').value;
    const pageId = document.querySelector('#resourceId').value;
    const container = document.querySelector('#contentContainer');
    clearInfo();
    getData(`http://swapi.co/api/${option}/${pageId}/`,
            container, option, addDataToPage);
  });