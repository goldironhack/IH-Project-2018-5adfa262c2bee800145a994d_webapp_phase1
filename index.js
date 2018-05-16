var map;
var iniMap={lat:40.7291,lng:-73.9965};
const api_key="AIzaSyAzpOBqITSBf9XFZTm1OuSdU1KRqtJmCgw";
const Neighborhood_Names_GIS="https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
var infoRows = [];
var JDistric = $.get(Neighborhood_Names_GIS)

//<!-- Funcion para crear el mapa -->
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: iniMap
  });

  map.data.loadGeoJson('http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
}
 //Carga de datos del Neighborhood Names GIS
function getDataFromURL(URL){
	var data = $.get(URL, function(){
		console.log(URL)
	})
		.done( function(){
			console.log(data.responseJSON.data);
		})
		.fail( function(error){
			console.error(error);
		})
}

function updateAllDatasets(){
		var URL = Neighborhood_Names_GIS;
		getDataFromURL(URL);

}
//actualiza datos en la tabla(testeo carga de datos)
function updateTable(){
	tableReference = $("#mainTableBody")[0];
	var newRow, district, boroughs ;

	for( var i = 0; i < (JDistric.responseJSON.data).length; i++){
		newRow = tableReference.insertRow(tableReference.rows.length);
		
		district = newRow.insertCell(0);
		boroughs  = newRow.insertCell(1);
		
		district.innerHTML = JDistric.responseJSON.data[i][10];
		boroughs .innerHTML =JDistric.responseJSON.data[i][16];
	}
}

/*var Distric = [];
function getDatasDistric() {
	    JDistric
        .done(function(){
            for(var i = 0; i < (JDistric.responseJSON.data).length; i++){
                var pS = JDistric.responseJSON.data[i][10];
                var marker = new google.maps.Marker({
                    position: lalg,
                    map: map,
                     });
                Distric.push(marker);
            }
        })
        
        .fail(function(error){
              console.log(error);
              });
}*/
//uso de los buttons
$(document).ready( function(){
	$("#getDataButton").on("click", updateAllDatasets);
	$("#updateTableButton").on("click", updateTable);
})

