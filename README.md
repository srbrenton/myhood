P5-1: Neighborhood Map Project
==============================
Instructions for Use and Interaction
------------------------------------
1. Download or fork the application from my GitHub repository:
<https://github.com/srbrenton/myhood/>.
* Open the index.html file with a web browser to see and interact with my Google map.
* There are several ways to get information about the boringly dull red map markers.
* Clicking a map marker will open an information window for the location, click the 'X' to close the window.
* Clicking one of the street names across the top of the screen will produce the same result.
* Typing a unique combination of any letters from a street name in the input box will result in a display of the matching information box.
* The information box presents some autobiographical information as well as several hyperlinks to Wikipedia articles about my interests at the time.

Additional Notes
----------------
* To access this application on the web, direct your browser to: <http://srbrenton.github.io/myhood/>.
* Six locations are identified
* Six markers are placed with DROP animation using the Geocoder API to set each location from its address.
* Each marker has a click handler to toggle the marker's bounce animation.
* Each marker has a title which displays the street address when the mouse hovers over the marker.
* The street name of each location is displayed in a list across the top of the page.
* Mousing over the street name in the list highlights the name and activates the marker's bounce animation.
* Clicking on the street name opens its marker's information window.
* Type any letter(s) of a street name in search box to filter down to a targeted street name.
* Clicking on a marker will start it bouncing and display an info window
* IIFE used in addListeners() and wikiRequests() for looping through markers (jshint doesn't care for IFEEs)
* Wikipedia failures are detected by the wikiData value in myLocations
* Google Map failure is detected by the value of the myMap variable

References
----------
* Udacity Frontend Developer video lessons
* Web: [Knockout](http://knockoutjs.com/index.html)
* Web: [Live Search Example](http://opensoul.org/2011/06/23/live-search-with-knockoutjs/)
* Web: [Catching Mouse Events](http://stackoverflow.com/questions/9417467/knockout-js-event-binding-unexpected-behavior-with-mouseover-and-mouseout-even)
* Book: [Jump Start BootStrap](http://www.sitepoint.com/store/jump-start-bootstrap/)
* Book: [Javascript Bible 6th Edition](http://www.wiley.com/WileyCDA/WileyTitle/productCd-0470069163.html)
* Book: [HTML QuickStart 2003](http://www.peachpit.com/store/html-for-the-world-wide-web-with-xhtml-and-css-visual-9780321130075)
