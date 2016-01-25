/*
 *	This array contains the source data the markers and info boxes
 */

var myLocations = [
	{ name: 'Falmouth',
	addr: '2190 falmouth anaheim',
	date: '1960-61',
	grade: '2',
	school: 'John Marshall Elementary',
	interest: 'The Three Rs',
	wikiData: null
	},
	{ name: 'Chanticleer',
	addr: '8602 chanticleer stanton',
	date: '1961-62',
	grade: '3',
	school: 'Robert M. Pyles Elementary',
	interest: 'Cub Scouts',
	wikiData: null
	},
	{ name: 'Lola',
	addr: '8891 lola anaheim',
	date: '1963-65',
	grade: '4-7',
	school: 'Robert M. Pyles Elementary',
	interest: 'Michael Faraday',
	wikiData: null
	},
	{ name: 'Ball',
	addr: '2011 w ball rd anaheim',
	date: '1966-68',
	grade: '8-9',
	school: 'Trident Junior High',
	interest: 'Chemistry',
	wikiData: null
	},
	{ name: 'Crone',
	addr: '1842 w crone rd anaheim',
	date: '1968-70',
	grade: '10- 12',
	school: 'Loara High',
	interest: 'Isaac Asimov',
	wikiData: null
	},
	{ name: 'Tiara',
	addr: '1639 s tiara way anaheim',
	date: '1970-71',
	grade: 'freshman',
	school: 'CSUF',
	interest: 'Rostropovich',
	wikiData: null
	}
];

/*
 *	Define an object to facilitate KnockoutJS functionality
 */

function MapMarker(locInfo) {
	var self = this;
	self.name = locInfo.name;
	self.addr = locInfo.addr;
	self.marker = null;
	self.info = null;
	self.select = ko.observable(false);
	self.visible = ko.observable(true);
	self.bounce = ko.observable(false);
}

var myMap;
var myGeocoder;

