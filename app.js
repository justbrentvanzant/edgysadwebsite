particlesJS.load('particles-js', 'particles.json');

//primary data storage for static information grid
let dataHolder = [];

//parses data from a JSON into formated data storage
var parseIntoTable = function (dataObj) {
	let UserIdKeyList = Object.keys(dataObj);
	//iterate through users
	for (var userId in dataObj) {
		if (dataObj.hasOwnProperty(userId)){
			userObj = dataObj[userId]
			for (var sessionId in userObj){
				if (userObj.hasOwnProperty(sessionId)){
					sessionObj = userObj[sessionId]
					for (var typeId in sessionObj) {
						if (sessionObj.hasOwnProperty(typeId)){	
							if (typeId == "static") {
								let constructArray = [];
								constructArray.push(userId);
								constructArray.push(sessionId);
								staticObj = sessionObj[typeId];
								for (var fieldKey in staticObj) {
									if (staticObj.hasOwnProperty(fieldKey)){
										constructArray.push(staticObj[fieldKey]);
									}
								}
							}
						}
					}
				}
			}
		}
	} 
}

//updates container element with a Handsontable generated with data in dataHolder
var showTable = function() {
	const container = document.getElementById('example');
	const hot = new Handsontable(container, {
	  data: dataHolder,
	  rowHeaders: true,
	  colHeaders: true,
	  licenseKey: 'non-commercial-and-evaluation'
	});
}

//['UserId', 'SessionId', 'CSS On', 'Available Screen Height', 'Available Screen Width', 'Cookies On', 'ECT', 'Images On', 'User Language', 'User Agent', 'Window Screen Height', 'Window Screen Width';
//fetch data to utlize in table
 fetch('https://us-central1-cse135pa3-d92f9.cloudfunctions.net/showdb')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
 	parseIntoTable(data);
 	showTable();
  });
