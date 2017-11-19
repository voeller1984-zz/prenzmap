var clientID = "JZ0JEMR3PBWCQMNDMLSA4XBMJTNLKQHTTHKWLFWD2RMPXWNZ";
var clientSecret ="HR4LQLE1RPQTHHAQX0N0MMAGBBVLAZWA10YGTHNW3FDEDXVD";




var foursquareURL = function foursquareURL(e) {
  return 'https://api.foursquare.com/v2/venues/search?ll=' + e.lat + ',' + e.lng + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20171104' + '&query=' + e.title;
};


Object.keys(locations).map(function (e) {
  $.ajax({
    url: foursquareURL(locations[e]),
    success: function success(data) {
      console.log(data);
    }
  });
});
