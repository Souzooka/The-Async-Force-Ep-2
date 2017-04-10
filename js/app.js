function getData(source, element, option, eFunc) {
  const oReq = new XMLHttpRequest();

  oReq.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    eFunc(source, data, element, option);
  });
  oReq.open('GET', source);
  oReq.send();
}

document.querySelector('#requestResourceButton')
  .addEventListener ('click', function() {
    const option = document.querySelector('#resourceType').value;
    const pageId = document.querySelector('#resourceId').value;
    const container = document.querySelector('contentContainer');
    getData(`http://swapi.co/api/${option}/${pageId}/`,
            container, option, addDataToPage);
  });

function addDataToPage(source, data, element, option) {
  clearInfo();
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
  const infoContainer = document.querySelector('#infoContainer');
  if (infoContainer) {
    while (infoContainer.firstChild) {
      infoContainer.removeChild(infoContainer.firstChild);
    }
  }
}

function addPlanets(data, element) {
  console.log('butts')

}

function addPeople(data, element) {

}

function addStarships(data, element) {

}

function displayError(source) {
  console.log(source);
}