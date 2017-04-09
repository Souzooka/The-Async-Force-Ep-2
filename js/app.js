function getData(source, property, element, eFunc) {
  const oReq = new XMLHttpRequest();

  oReq.addEventListener('load', function() {
    try {
    const data = JSON.parse(this.responseText);
    } catch(e) {
      // display error?
    }
    eFunc(data, property, element);
  });
  oReq.open('GET', source);
  oReq.send();
}

document.querySelector('#requestResourceButton')
  .addEventListener ('onclick', function() {
    //TODO
  });