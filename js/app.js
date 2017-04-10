function getData(source, element, option, eFunc) {
  const oReq = new XMLHttpRequest();

  oReq.addEventListener('load', function() {
    const data = JSON.parse(this.responseText);
    eFunc(aource, data, element, option);
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
  console.log(data);
}

function addPlanets(data, element) {

}

function addPeople(data, element) {

}

function addStarships(data, element) {

}

function displayError(source) {

}