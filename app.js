particlesJS.load('particles-js','particles.json');
//primary data storage for static information grid
let dataHolder = [];
let dataGraphHolder = [];

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
										if (fieldKey == "CSS being on (boolean)") {
											constructArray[2] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "available screen height") {
											constructArray[3] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "available screen width") {
											constructArray[4] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "cookies being on (boolean)") {
											constructArray[5] = (staticObj[fieldKey]);
										}										
										else if (fieldKey == "effective connection type (string)") {
											constructArray[6] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "images being on (boolean)") {
											constructArray[7] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "user language (string)") {
											constructArray[8] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "user-agent string (string)") {
											constructArray[9] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "window screen height") {
											constructArray[10] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "window screen width") {
											constructArray[11] = (staticObj[fieldKey]);
										}								
									}
								}
								dataHolder.push(constructArray);
							}
						}
					}
				}
			}
		}
	} 
}

var parseIntoGraph = function (dataObj) {
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
							if (typeId == "performance") {
								let constructArray = [];
								constructArray.push(userId);
								constructArray.push(sessionId);
								staticObj = sessionObj[typeId];
								for (var fieldKey in staticObj) {
									if (staticObj.hasOwnProperty(fieldKey)){
										if (fieldKey == "Initial Start Load Time") {
											constructArray[2] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "Page Loading Connect Start") {
											constructArray[3] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "Page Loading End Time") {
											constructArray[4] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "Page Loading Information") {
											constructArray[5] = (staticObj[fieldKey]);
										}										
										else if (fieldKey == "Page Loading Navigation Start") {
											constructArray[6] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "Page Loading secureConnection Start") {
											constructArray[7] = (staticObj[fieldKey]);
										}
										else if (fieldKey == "Total Time Taken") {
											constructArray[8] = (staticObj[fieldKey]);
										}						
									}
								}
								dataGraphHolder.push(constructArray);
							}
						}
					}
				}
			}
		}
	} 
}

var cleanGraphData = function ( ) {
	for 
}
//console log data being held
var showInfo = function() {
	console.log(dataHolder);
}

//updates container element with a Handsontable generated with data in dataHolder
var showTable = function() {
	const container = document.getElementById('example');
	const hot = new Handsontable(container, {
	  data: dataHolder,
	  colHeaders:['UserId', 'SessionId', 'CSS On', 'ASH (pixels)', 'ASW (pixels)', 'Cookies On', 'ECT', 'Images On', 'User Lang', 'User Agent', 'WSH (pixels)', 'WSW (pixels)'],
	  columns: [
	  {
		type:'text',
		readOnly: true
	  },
	  {
		type:'text',
		readOnly: true
	  },
	  {
		type:'text',
		readOnly: true
	  },
	  {
		type:'numeric',  
		readOnly: true
	  },
	  {
		type:'numeric',  
		readOnly: true
	  },
	  {
		type:'text',  
		readOnly: true
	  },
	  {
		type:'text',  		
		readOnly: true
	  },
	  {
		type:'text',  		
		readOnly: true
	  },
	  {
		type:'text', 		  
		readOnly: true
	  },
	  {
		type:'text', 
		readOnly: true
	  },
	  {
		type:'numeric', 
		readOnly: true
	  },
	  {
		type:'numeric', 
		readOnly:true
	  }
	  ],
	  colWidths : 100,
	  rowHeights : 30,
	  filters: true,
	  dropdownMenu: ['filter_by_condition','filter_action_bar'],
	  columnSorting: true,
	  licenseKey: 'non-commercial-and-evaluation'
	  
	});
}

//
//fetch data to utlize in table
 fetch('https://us-central1-cse135pa3-d92f9.cloudfunctions.net/showdb')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
 	//parseIntoTable(data);
	///showInfo();
	//showTable();
  });
