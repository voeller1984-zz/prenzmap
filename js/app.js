
// Global Vars
var markers = [];
var vm;
var map;

function initApp() {

	// Function to initialize the map within the map div
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 52.539006, lng: 13.422337},
			zoom: 14,
			styles : map_style
		});
	}

	function populateInfoWindow(marker, infowindow) {
		// Check to make sure the infowindow is not already opened on this marker.
		if (infowindow.marker != marker) {
			// Clear the infowindow content to give the streetview time to load.
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){
			  marker.setAnimation(null); 
			}, 750);
			infowindow.marker = marker;
			var overlay;
			//console.log(typeof(marker))
			//console.log(typeof(marker.category))
			//console.log(typeof marker.foursquareData);
			if (marker.foursquareData !== null ) {
				var URL_string = marker.foursquareData.url;
	            if (typeof URL_string === 'undefined'){ URL_string = ""; }
				overlay = '<h5 class="markTitle">' + marker.title + '</h5>' + '<div>' +
					            '<h6 class="markTitle">' + marker.foursquareData.categories[0].name+ '</h6>' +
					            '<p class="foresquareAddress">' + marker.foursquareData.location.address+ '</p>' +
					            '<p class="foresquareAddress">' + marker.foursquareData.location.city + '</p>' +
					            '<p class="foresquareAddress">' + marker.foursquareData.location.country + '</p>'+
					             '<a href="'+ URL_string +'">' + URL_string+ '</a>' ;
				console.log("foursquare info is avilable");
				// console.log(marker.foursquareData);
				// console.log(marker.foursquareData.location.city);
				
			}
			else {
				overlay = '<div>' + marker.title + '</div>';
				console.log("only google map info available");
				alert("something went wrong with the foresquare api, please try again later");
			}
			infowindow.setContent(overlay);
			// Make sure the marker property is cleared if the infowindow is closed.
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});
			// Open the infowindow
			infowindow.open(map, marker);
		}
	}
	
	var largeInfowindow = new google.maps.InfoWindow();
	initMap();




	// set markers based on locations array
	locations.forEach(function(location, i) {
		var position = {
						lat: locations[i].lat,
						lng: locations[i].lng
					};
		// console.log(locations);
	  	var title = locations[i].title;
	  	var marker = new google.maps.Marker({
			map: map, 
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: i
	  	});
	  	// placeholder for foursquare response
	  	marker.foursquareData = null;	
	  	// Push the marker to our array of markers.
	  	markers.push(marker);
	  	// Create an onclick event to open the large infowindow at each marker.
	  	marker.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow);
	  	});
	});

	var foursquareURL = function foursquareURL(e) {
		var clientID = "JZ0JEMR3PBWCQMNDMLSA4XBMJTNLKQHTTHKWLFWD2RMPXWNZ";
		var clientSecret ="HR4LQLE1RPQTHHAQX0N0MMAGBBVLAZWA10YGTHNW3FDEDXVD";
		// console.log(e)
	  	return 'https://api.foursquare.com/v2/venues/search?ll=' + e.position.lat() + ',' + e.position.lng() + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20171104' + '&query=' + e.title;

	};

	var foursquareErr = false;
	var loadFourSquareData = function(locations) {
		Object.keys(locations).map(function (e) {
			var url = foursquareURL(locations[e]);
		  	$.ajax({
		    	url: url,
		    	success: function success(data) {
		      	var foursquareData = data.response.venues[0] || null;
		      	// console.log(foursquareData);
		      	// console.log(typeof foursquareData);
		      	locations[e].foursquareData = foursquareData;
		      	},
		      	error: function (error) {
    			foursquareErr = true;
    			// console.log("forequeafdd error true")
				}

		  });
		});
	};
	if (foursquareErr == true) {
		console.log('There was an error with the foursquare api');
    			var overlay = jQuery('<div id="overlay">There was an error with foursquare api, try again later</div>');
				overlay.appendTo(document.body);
	}

	// create View Model and apply ko bindings
	vm = new VM(markers, populateInfoWindow, largeInfowindow);
	ko.applyBindings(vm);
	loadFourSquareData(markers);
}



googleError = () => {
  // Error handling
  alert(
        'Something went wrong on Google Maps, refresh and try again.'
    );
};

