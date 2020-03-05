particlesJS.load('particles-js', 'particles.json');

//primary data storage for static information grid
let dataHolder = [];

//parses data from a JSON into formated data storage
var parseIntoTable = function (dataObj) {
	let UserIdKeyList = Object.keys(dataObj);
	//iterate through users
	for (var userIdKey of UserIdKeyList) {
  		let currentUserId = userIdKey;
		let currentUserObj = UserIdKeyList[userIdKey];
		let SessionIdKeyList = Object.keys(currentUserObj); 
		//iterate through sessions
		for (var sessionIdKey of SessionIdKeyList) {
			let currentSessionId = 	sessionIdKey;
			let currentSessionObj =  SessionIdKeyList[sessionIdKey];
			let dataTypeList = Object.keys(currentSessionObj); 
			//iterate through data types
			for (var dataTypeKey of dataTypeList) {
				//check if static type data
				if (dataTypeKey == "static") {
					let dataTypeId = dataTypeKey;
					let dataTypeObj =  dataTypeList[dataTypeKey];	
					let fieldKeyList = Object.keys(dataTypeObj); 
					var constructArray = []; 
					constructArray.push(currentUserId);
					constructArray.push(currentSessionId);
					for (var fieldKey of fieldKeyList) {
						constructArray.fieldKeyList[fieldKey];
					}
					dataHolder.push(constructArray);
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
