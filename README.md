P5-1: Neighborhood Map Project
==============================
Open Issues
-----------
* Fail mode for the Google map ??
* Fail mode for the Wikipedia calls ??

Questions
---------
* I'm not going for pretty, I'm going for functional and finished.
* Anything that I've blatantly overlooked?

Map Behaviour
------------
* Clicking on a marker will start it bouncing and display an info window
* Clicking on a marker while animated will close the info window and stop the animation
* Closing the info window with an animated marked will require another click on the marker to stop the animation
* Mousing over a street name will highlight the street name and animate its marker
* Clicking the street name will stop the marker animation and display the info box
* The info box requires a manual close when opened by clicking the street name

Instructions for use and Interaction
------------------------------------
* Open index.html in the myhood directory
* Six locations are identified
* Six markers are placed with DROP animation using the Geocoder API to set each location from its address
* Each marker has a click handler to toggle the marker bounce animation
* Each marker has a title which displays the address when the mouse hovers over the marker
* The name of each location is displayed in a list
* Mousing over the location name in the list highlights the name and activates the marker's bounce animation
* IIFE used in addListeners() and wikiRequests() for looping through markers

References
----------
* Searching [Live Search Example](http://opensoul.org/2011/06/23/live-search-with-knockoutjs/)
* Events [Catching Mouse Events](http://stackoverflow.com/questions/9417467/knockout-js-event-binding-unexpected-behavior-with-mouseover-and-mouseout-even)
* Books [Javascript Bible 6th Edition](http://www.wiley.com/WileyCDA/WileyTitle/productCd-0470069163.html)
