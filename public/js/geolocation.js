        window.onload = function() {
        var startPos;
        var startPosLat;
        var startPosLong;
        var distance;

        document.getElementById('attendBtn').style.display = "none";
      
        if (navigator.geolocation) {

          startPosLat = 21.423092;
          startPosLong = 39.362932;

          $("#startLat").text(startPosLat);
          $("#startLon").text(startPosLong);
      
          navigator.geolocation.watchPosition(function(position) {
            $("#currentLat").text(position.coords.latitude);
            $("#currentLon").text(position.coords.longitude);
            $("#currentAcc").text(position.coords.accuracy);

            distance = calculateDistance(startPosLat, startPosLong,position.coords.latitude, position.coords.longitude)
            $("#distance").text(distance);

            // it should be .10 later
            if(distance < 50){ 
              $("#message").text("Yes, you're inside radius (100 Meters) 🎉");
              document.getElementById('attendBtn').style.display = "block";
            }else if(distance > .05){
              $("#message").text("No, not inside .05 KM :(");
              document.getElementById('attendBtn').style.display = "none";
            }
          },handleError);

          function handleError(error){
            //Handle Errors
           switch(error.code) {
              case error.PERMISSION_DENIED:
                  console.log("User denied the request for Geolocation.");
                  break;
              case error.POSITION_UNAVAILABLE:
                  console.log("Location information is unavailable.");
                  break;
              case error.TIMEOUT:
                 console.log("The request to get user location timed out.");
                  break;
              case error.UNKNOWN_ERROR:
                 console.log("An unknown error occurred.");
                  break;
          }
          }

        } else {
          alert("Your browser doesn't support Geolocation");
        }
      };
      
      // Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
      // http://www.movable-type.co.uk/scripts/latlong.html
      // Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
      function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = (lat2-lat1).toRad();
        var dLon = (lon2-lon1).toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
      }
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }