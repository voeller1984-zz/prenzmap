var clientID = "JZ0JEMR3PBWCQMNDMLSA4XBMJTNLKQHTTHKWLFWD2RMPXWNZ";
var clientSecret ="HR4LQLE1RPQTHHAQX0N0MMAGBBVLAZWA10YGTHNW3FDEDXVD";

var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll='+ 
            locations[1].lat + ',' + 
            locations[1].lng + 
            '&client_id=' + clientID + 
            '&client_secret=' + clientSecret + 
            '&v=20171104' + 
            '&query=' + locations[1].title;


  $.ajax({
    url: foursquareURL,
    success: function success(data) {
      console.log(data);
    }
  });


