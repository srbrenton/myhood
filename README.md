P5-1: Neighborhood Map Project
==============================
Instructions for Use and Interaction
------------------------------------
To interact with this project, direct your browser to:

<http://srbrenton.github.io/myhood/>

The source for this project is on GitHub, direct your browser to:

<https://github.com/srbrenton/myhood/>

* Six locations are identified
* Six markers are placed with DROP animation using the Geocoder API to set each location from its address
* Each marker has a click handler to toggle the marker bounce animation
* Each marker has a title which displays the address when the mouse hovers over the marker
* The street name of each location is displayed in a list across the top of the page
* Mousing over the street name in the list highlights the name and activates the marker's bounce animation
* Type any letter(s) of a street name in search box to filter down to your targeted street

Map Behaviour Notes
-------------------
* Clicking on a marker will start it bouncing and display an info window
* Clicking on a marker while animated will close the info window and stop the animation
* Closing the info window with an animated marker will require another click on the marker to stop the animation
* Mousing over a street name will highlight the street name and animate its marker
* Clicking the street name will stop the marker animation and display the info box
* Moving the mouse off the street name closes the info box
* IIFE used in addListeners() and wikiRequests() for looping through markers
* Wikipedia failures are detected by the wikiData value in myLocations
* Google Map failure is detected by the value of the myMap variable

References
----------
* Udacity Frontend Developer video lessons
* Searching [Live Search Example](http://opensoul.org/2011/06/23/live-search-with-knockoutjs/)
* Events [Catching Mouse Events](http://stackoverflow.com/questions/9417467/knockout-js-event-binding-unexpected-behavior-with-mouseover-and-mouseout-even)
* Books [Javascript Bible 6th Edition](http://www.wiley.com/WileyCDA/WileyTitle/productCd-0470069163.html)
