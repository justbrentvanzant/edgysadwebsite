particlesJS.load('particles-js', 'particles.json');

var populateContainer = function(data) {
const container = document.getElementById('example');
const hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: true,
  licenseKey: 'non-commercial-and-evaluation'
});

}


fetch('https://us-central1-cse135pa3-d92f9.cloudfunctions.net/showdb')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (var key in data) {
	    if (!data.hasOwnProperty(key)) continue;

	    var smallerObj = data[key];
	    for (var evenSmallerObj in smallerObj) {
	        // skip loop if the property is from prototype
	        if (!smallerObj.hasOwnProperty(evenSmallerObj)) continue;
	        	populateContainer(smallerObj[evenSmallerObj]);
	    }
	}
  });