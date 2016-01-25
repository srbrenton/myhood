/*
 *	Prepare to fire of the AJAX Wikipedia requests
 *	Save a 2D array of results for each interest in the myLocations array
 */

function wikiRequests() {

	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=%query%&format=json&callback=wikiCallback';
	var thisRequest = { };

	for ( var i in myLocations ) {
		thisRequest.url = wikiUrl.replace('%query%', myLocations[i].interest);
		thisRequest.dataType = 'jsonp';
		thisRequest.success = (function(idx){return function(response) {
						myLocations[idx].wikiData = [response[1], response[3]];
						}}
					)(i);
		$.ajax(thisRequest);
//		console.log(thisRequest);
	}
}
		
wikiRequests();

/*
 *	Create an observableArray of MapMarkers populated with data from myLocations[]
 */

var mapLocations = ko.observableArray([
	new MapMarker(myLocations[0]),
	new MapMarker(myLocations[1]),
	new MapMarker(myLocations[2]),
	new MapMarker(myLocations[3]),
	new MapMarker(myLocations[4]),
	new MapMarker(myLocations[5])
]);

/*
 *	Create the map, markers, and info boxes
 */

function initMap() {

	myMap = new google.maps.Map(document.getElementById('map'), {
		disableDefaultUI: true,
		zoom: 13,
		center: {lat: 33.83286, lng: -117.9587}
		}
	);

	myGeocoder = new google.maps.Geocoder();

	// create and drop the markers
	dropMarkers();

	// wait until markers have dropped
	setTimeout(addListeners, 800);

}

function dropMarkers() {
	for ( var i in mapLocations() ) {
		addMarker(mapLocations()[i]);
	}
}

/*
 *	Use the Google Geocoder to get coordinates for each address and create the Markers
 */

function addMarker(location) {
	myGeocoder.geocode({'address': location.addr},(function(loc){return function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			loc.marker = new google.maps.Marker({
				map: myMap,
				title: results[0].formatted_address,
				position: results[0].geometry.location,
				animation: google.maps.Animation.DROP
			});
		}
		else {
//			alert(status);
		}
	}})(location));
}

/*
 * Here is a template and code to create the text for the info boxes
 */
var contentTemplate = '<p>I lived at %addr% while attending grade(s) ' +
			'%grade% at %school% during %dates% with an interest in %interest%.</p>';

function buildContent(i) {
	var thisItem;
	var wikiInfo;
	thisItem = contentTemplate.replace("%interest%", myLocations[i].interest);
	thisItem = thisItem.replace("%dates%", myLocations[i].date);
	thisItem = thisItem.replace("%school%", myLocations[i].school);
	thisItem = thisItem.replace("%grade%", myLocations[i].grade);
	thisItem = thisItem.replace("%addr%", mapLocations()[i].marker.title);
	
	wikiInfo = '<ul>';
	for ( var entries = 0; entries < myLocations[i].wikiData[0].length; entries++ ) {
		wikiInfo += '<li><a href="' + myLocations[i].wikiData[1][entries] + '">';
		wikiInfo += myLocations[i].wikiData[0][entries] + '</a></li>';
//		console.log(wikiInfo);
	}
	wikiInfo += '</ul>'
	return thisItem + wikiInfo;
}

/*
 *	The markers have been created and dropped, build and link the Info boxes
 */

function addListeners() {

	for ( var i in mapLocations() ) {
		mapLocations()[i].marker.addListener('click', (function(j){return function(){toggleBounce(j)}})(i));
		mapLocations()[i].info = new google.maps.InfoWindow({content:  buildContent(i)});
	}
}

/*
 *	If marker is clicked start bouncing and show info box
 *	Conversely, stop bouncing and hide the info box
 */

function toggleBounce(i) {
	if (mapLocations()[i].marker.getAnimation() !== null) {
		mapLocations()[i].marker.setAnimation(null);
		mapLocations()[i].info.close();
	} else {
		mapLocations()[i].marker.setAnimation(google.maps.Animation.BOUNCE);
		mapLocations()[i].info.open(myMap, mapLocations()[i].marker);
	}
}

/*
for ( index in myLocations ) {
	console.log(myLocations[index].addr);
}
*/
