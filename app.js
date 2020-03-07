//gets a random number with 3 decimal places of between min and max (inclusive)
var randomMinMax = function(min, max) {
	var result =  Math.random() * (max - min + 1) + min;
	return result.toFixed(3); 
}

//various data storage values
let dateVal = []; 
let dateValAvg = [];
let dateValMin = [];
let dateValMax = [];
const NUM_DATA_POINTS = 12;
const AVG_DATA_MIDDLE = 2.575; 
  
//generate random data for the chart
var generateRandomData = function() {
	for (var i = 0; i < NUM_DATA_POINTS; i++) {
		var genDate = 1+i; 
		var dateObj = new Date('February ' + genDate +' 2020 23:15:30'); 
		var dateString = dateObj.toString();
		dateVal[i] = dateString.substring(0, dateString.indexOf("2020 ") - 1);
		dateValAvg[i] = randomMinMax( AVG_DATA_MIDDLE-1.2,AVG_DATA_MIDDLE+1.4);
		dateValMax[i] = randomMinMax( AVG_DATA_MIDDLE+2.4,AVG_DATA_MIDDLE+3.2);
		dateValMin[i] = randomMinMax( AVG_DATA_MIDDLE-2.4,AVG_DATA_MIDDLE-2.2);
	}
}

//TARGET ELEMENT TO PLACE CHART IN
var ctx = document.getElementById("myChart");
//create a chart given a targ elelemt to append chart in
var createChart = function(targElement) {
	//generate random data for the chart
	generateRandomData();
	var stackedLine = new Chart(targElement, {
		type: 'line',
		data: {
			labels: dateVal,
			datasets: [
			{
				label: 'Average Time',
				backgroundColor: 'rgba(255, 99, 132,0)',
				borderColor: 'rgb(255, 99, 132)',
				data: dateValAvg
			},
			{
				label: 'Max Time',
				backgroundColor: 'rgba(255, 99, 132,0)',
				borderColor: 'rgba(54, 162, 235, 1)',
				data: dateValMax
			},
			{
				label: 'Min Time',
				backgroundColor: 'rgba(255, 99, 132,0)',
				borderColor: 'rgba(255, 206, 86, 1)',
				data: dateValMin
			},
			
			]
		},
		 options: {
			title: {
				display: true,
				text: 'Page Load Time'
			}
		}
	});
}


createChart(ctx);



/*
	-------------------------------------------------------------
	Above is graph
	Below is chart
	//TODO PAGINATION
	----------------------------------------------------------------------------------
*/
//primary data storage for static information grid
let dataHolder = [];

//parses data from a JSON into formated data storage
var parseDataIntoHolder = function (dataObj) {
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

//console log data being held
var showInfo = function() {
	console.log(dataHolder);
}

//updates container element with a Handsontable generated with data in dataHolder
var createTable = function(container) {
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

//Uncomment functions in then to display chart to 
//fetch data to utlize in table
 fetch('https://us-central1-cse135pa3-d92f9.cloudfunctions.net/showdb')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
	//indicate the containe you want to create chart in. 
	let container =  document.getElementById('example');
 	parseDataIntoHolder(data);
	createTable(container);
 });
  
  particlesJS.load('particles-js','particles.json');

 