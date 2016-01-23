P5-1: Neighborhood Map Project
==============================
Map Behaviour
------------
* Clicking on a marker will start it bouncing and display an info window
* Clicking on a marker while animated will close the info window and stop the animation
* Closing the info window with an animated marked will require another click on the marker to stop the animation
* Mousing over a street name will highlight the street name and animate its marker
* Clicking the street name will stop the marker animation and display the info box
* The info box closes when the mouse exits the street name

Instructions for use and Interaction
------------------------------------

* Open index.html in the myhood directory
* Six locations are identified
* Six markers are placed with DROP animation using the Geocoder API to set each location from its address
* Each marker has a click handler to toggle the marker bounce animation
* Each marker has a title which displays the address when the mouse hovers over the marker
* The name of each location is displayed in a list
* Mousing over the location name in the list highlights the name and toggles the marker's bounce animation
* IIFE used in addListeners()

Open Issues
-----------

* Still a lot of work to do
* Still too many things to figure out how to get functional
* At some point I'll decompose index.html into component files
* Still need to figure out how to use Knockout to accomplish other project specifications


Questions
---------
* Do you see anything with this design as a start that may create a roadblock later
* I think the event I'm feeding jQuery in highLightOn and highLightOn handlers is from the global(?) context
* What can I read to better understand the two ways I've declared functions in the view model

References
----------
* Searching [Live Search Example](http://opensoul.org/2011/06/23/live-search-with-knockoutjs/)
* Events [Catching Mouse Events](http://stackoverflow.com/questions/9417467/knockout-js-event-binding-unexpected-behavior-with-mouseover-and-mouseout-even)
* Books [Javascript Bible 6th Edition](http://www.wiley.com/WileyCDA/WileyTitle/productCd-0470069163.html)
