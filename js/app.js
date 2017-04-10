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


}

function addPeople(data, element) {
  const name = document.createElement('h2');
  const gender = document.createElement('p');

  name.innerHTML = data.name;
  gender.innerHTML = data.gender;

  // Even though the species is another request, we want all of the info
  // to be shown at one time rather than streamed in
  name.style.display = 'none';
  gender.style.display = 'none';

  element.appendChild(name);
  element.appendChild(gender);

  getData(data.species[0], element, null, addSpecies);
}

function addStarships(data, element) {

}

function addSpecies(source, data, element, option) {
  makeContentVisible(element);
}

function addFilm(source, data, element, option) {
  makeContentVisible(element);
}

// for when all data is retrieved
function makeContentVisible(element) {
  console.log(element)
  for (let i = 0; i < element.childNodes.length; ++i) {
    console.log(i)
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