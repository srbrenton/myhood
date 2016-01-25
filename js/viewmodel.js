/*
 * This must be the View Model
 */

function AppViewModel() {

	var self = this;
	var regex = new RegExp();
	var openInfo = null;

	self.query = ko.observable('');

	// the function associated with the search box
	self.search = function(value) {

		var loopcount = mapLocations().length;
		var visbits = loopcount;
		var maxbits = loopcount;

		closeInfos();

		// create a regex with the value in the search box
		regex.compile(value, 'i');

		// check each name in mapLocations for a match
		// visbits is used to identify the single match from the search box
		for (  var i in mapLocations() ) {
			var marker = mapLocations()[i].marker;
			if ( regex.test(mapLocations()[i].name) ) {
				visbits |= ( 1 << i);
				mapLocations()[i].visible(true);
				marker.setMap(myMap);
			}
			else {
				visbits &= ~( 1 << i);
				mapLocations()[i].visible(false);
				marker.setMap(null);
			}
		}

		var bitcount = countbits(visbits, maxbits);
		if ( bitcount == 1) {
			i = findbit(visbits, maxbits);
			mapLocations()[i].marker.setAnimation(google.maps.Animation.BOUNCE);
			mapLocations()[i].info.open(myMap, mapLocations()[i].marker);
			// console.log('found bit: ' + i);
			// console.log(mapLocations()[i].name);
		}
		// console.log('bitcount: ' + bitcount + ' visbits: ' + visbits.toString(8));
	}

	self.query.subscribe(self.search);

	// toggle with: mapLocations()[0].visible(true)
	this.listClick = function(data) {
		var marker = data.marker;
		closeInfos();
		// console.log('click for: ' + data.addr);
		data.info.open(myMap, marker );
		data.marker.setAnimation(null);
		// console.log(data);
		// data.visible(false);
	}

	this.highLightOn = function(data) {
		data.select(true);
		data.bounce(true);
		data.marker.setAnimation(google.maps.Animation.BOUNCE);
	}

	this.highLightOff = function(data) {
		data.select(false);
		data.bounce(false);
		// data.info.close();
		data.marker.setAnimation(null);
	}

	// return the number of bits set in bits
	function countbits(bits, maxbits) {
		var bitcount = 0;
		for ( var i = 0; i < maxbits; i++ ) {
			bitcount += ( bits & ( 1 << i))? 1: 0;
		}
		return bitcount;
	}

	function findbit(bits, maxbits) {
		for ( var i = 0; i < maxbits; i++ ) {
			if ( bits & 1 ) {
				break;
			}
			bits >>= 1;
		}
		return( i );
	}

	function closeInfos() {
		for (  var i in mapLocations() ) {
			mapLocations()[i].info.close();
		}
	}

}

ko.applyBindings(new AppViewModel());
