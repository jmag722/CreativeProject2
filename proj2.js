$(document).ready(function() {


    $("#submitButton").click(function(e) {
        console.log("STARTED");
        e.preventDefault();
        var long = $("#longInput").val();
        var lat = $("#latInput").val();
        var key = "4b089295f5434035b91ef9b7e685f564";
        var myurl = "https://api.breezometer.com/baqi/?";
        myurl += "lat=" + lat;
        myurl += "&lon=" + long;
        myurl += "&key=" + key;
        console.log(myurl);
        $.ajax({
            url: myurl,
            dataType: "json",
            success: function(parsed_json) {
                console.log(parsed_json);
                // GET VALUES YOU WANT
            }
        });


    });



    $("#cityButton").click(function(e) {
        e.preventDefault();
        console.log("gotHere2");
        var city = $("#cityInput").val();
        var citKey = "52COMlfy5nYgNfAU2eIBjQfw78HZt98G";
        var cityUrl = "https://www.mapquestapi.com/geocoding/v1/address?key=" + citKey;
        cityUrl += "&location=" + city;
        console.log(cityUrl);
        $.ajax({
            url: cityUrl,
            dataType: "json",
            success: function(parsed_json) {
                console.log(parsed_json);
                var lat = parsed_json['results'][0]['locations'][0]["latLng"]['lat'];
                var long = parsed_json['results'][0]['locations'][0]["latLng"]['lng'];
                console.log("lat" + lat);
                console.log("long" + long);
                getSmog(lat, long);
            }
        });
    });

    function getSmog(lati, longi) {
        var key = "4b089295f5434035b91ef9b7e685f564";
        var myurl = "https://api.breezometer.com/baqi/?";
        myurl += "lat=" + lati;
        myurl += "&lon=" + longi;
        myurl += "&key=" + key;
        console.log(myurl);
        $.ajax({
            url: myurl,
            dataType: "json",
            success: function(parsed_json) {
                console.log(parsed_json);
                var aqi = parsed_json["breezometer_aqi"];
                var color = parsed_json["breezometer_color"];
                var description = parsed_json["breezometer_description"];
                var healthwarning = parsed_json["random_recommendations"]['health'];
                $("#aqi").html(aqi);
               document.getElementById("output").style.backgroundColor =color;
                $("#description").html(description);
                $("#health").html(healthwarning);
            }
        });
    }
});
