# Prenzlauer Berg Neighboourhood Map Project

Project Overview
-------------
This is a single single page application featuring a map of my neighborhood. the Map includes functionalities such as:
map markers to identify popular locations or places I would like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. 
Third-party API from Foresquare is used to provide additional information about each of these locations

How to run
-------------
click here: https://voeller1984.github.io/prenzmap/

download the repository locally
unpack zip file
click on index.html to run the app locally within your predefined browser
click on markes and or side hamburger to filter and gather additional inforamtions


Notes
-------------
* Foursquare API is being called only on page load --> clicking multiple times on the markers will work without generating new API Calls
* Markers are initially handled by Google API but i am using subscribe in the VM to handle visibility of markers and infoWindow.
* Responsiveness is handled by media queries, no framework is used.
* foursquare API hourly limit is 200 calls, once hit this limit you may have to wait another 1hr.







Useful resources
-------------
Api Debugging tool: https://apigee.com/console/foursquare

Udacity Discussion Forum: https://discussions.udacity.com/c/nd001-neighborhood-map-project

Google Maps Api tutorials: https://developers.google.com/maps/documentation/

Bootsrap Documentation: http://getbootstrap.com/docs/4.0/components/navbar/

z-index Documentation: https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
