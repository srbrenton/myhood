/*
 *	Prepare to fire of the AJAX Wikipedia requests
 *	Save a 2D array of results for each interest in the myLocations array
 *	myLocations[idx].wikiData will still be set to null if Wikipedia access fails
 */

function wikiRequests() {

	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=%query%&format=json&callback=wikiCallback';
	var thisRequest = { };

	for ( var i in myLocations ) {

		// if ( i == 2 ) { continue;  } // simulate failure to access wikipedia

		thisRequest.url = wikiUrl.replace('%query%', myLocations[i].interest);
		thisRequest.dataType = 'jsonp';
		thisRequest.success = (function(idx){return function(response) {
						myLocations[idx].wikiData = [response[1], response[3]];
						};}
					)(i);
		$.ajax(thisRequest);
	}
}
		
//wikiRequests();

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
	};})(location));
}

/*
 * Here is a template and code to create the text for the info boxes
 */

var contentTemplate = '<h6>Location Information</h6>' +
		'<p id="info">I lived at %addr% while attending grade(s) ' +
		'%grade% at %school% during %dates% with an interest in %interest%.</p>';

function buildContent(i) {
	var thisItem;
	var wikiInfo;
	var wikiDataLength;

	thisItem = contentTemplate.replace("%interest%", myLocations[i].interest);
	thisItem = thisItem.replace("%dates%", myLocations[i].date);
	thisItem = thisItem.replace("%school%", myLocations[i].school);
	thisItem = thisItem.replace("%grade%", myLocations[i].grade);
	thisItem = thisItem.replace("%addr%", mapLocations()[i].marker.title);
	
	if ( myLocations[i].wikiData !== null ) {
		wikiInfo = '<h6>Wikipedia Search Results for ' + myLocations[i].interest + '</h6>';
		wikiInfo += '<ul>';
		wikiDataLength = myLocations[i].wikiData[0].length;
		if ( wikiDataLength === 0 ) {
			wikiInfo += '<li>No Wikipedia matches found</li>';
		}
		for ( var entries = 0; entries < wikiDataLength; entries++ ) {
			wikiInfo += '<li><a href="' + myLocations[i].wikiData[1][entries] + '" target="_blank">';
			wikiInfo += myLocations[i].wikiData[0][entries] + '</a></li>';
		}
		wikiInfo += '</ul>';
	}
	else {
		wikiInfo = '<p>Wikipedia access failed</p>';
	}

	return thisItem + wikiInfo;
}

/*
 *	This is the 'closeclick' handler for info windows
 *	
 *	Call the view model to clear the contents of the search <input> element
 *	Make all the list items and map markers visible after closing
 *	the info window associated with a successful search
 */

function listEntriesVisible() {

	myViewModel.clearQuery();
	for (  var i in mapLocations() ) {
		mapLocations()[i].visible(true);
		if ( mapLocations()[i].marker.getMap() === null ) {
			mapLocations()[i].marker.setMap(myMap);
		}
	}
}

/*
 *	Add a 'click' listener for the map marker
 *	Build an info window for each map marker
 *	Add a 'closeclick' listener for each info window
 */

function addListeners() {

	for ( var i in mapLocations() ) {
		mapLocations()[i].marker.addListener('click', (function(j){return function(){activateMarker(j);};})(i));
		mapLocations()[i].info = new google.maps.InfoWindow({content:  buildContent(i), maxWidth: 400});
		google.maps.event.addListener(mapLocations()[i].info, 'closeclick', function(){listEntriesVisible();});
	}
}

/*
 *	Close any open info windows, start marker bouncing and show this info box
 */

function activateMarker(i) {

	/* A kind Udacity reviewer told me I could turn off the bounce with a setTimeout()
	 * A great improvement over the toggle bounce function I used from the Google Maps example
	 */

	for ( var j in mapLocations() ) {
		mapLocations()[j].info.close();
		mapLocations()[i].marker.setAnimation(null);
	}

	mapLocations()[i].marker.setAnimation(google.maps.Animation.BOUNCE);
	mapLocations()[i].info.open(myMap, mapLocations()[i].marker);
	setTimeout(function(){ mapLocations()[i].marker.setAnimation(null); }, 1250);

}

wikiRequests();
myViewModel = new AppViewModel();
ko.applyBindings(myViewModel);

