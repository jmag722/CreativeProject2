$(document).ready(function () {
    $("#submitButton").click(function (e) {
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
            success: function (parsed_json) {
                console.log(parsed_json);
                // GET VALUES YOU WANT
            }
        });
    });

    $("#cityButton").click(function (e) {
        e.preventDefault();
        var city = $("#cityInput").val();
        var citKey = "52COMlfy5nYgNfAU2eIBjQfw78HZt98G";
        var cityUrl = "https://www.mapquestapi.com/geocoding/v1/address?key=" + citKey;
        cityUrl += "&location=" + city;
        console.log(cityUrl);
        $.ajax({
            url: cityUrl,
            dataType: "json",
            success: function (parsed_json) {
                console.log(parsed_json);
                const location = parsed_json.results[0].locations[0];
                let address = `${location.street} ${location.adminArea6} ${location.adminArea5} ${location.adminArea4} ${location.adminArea3} ${location.adminArea1}`;
                var lat = parsed_json['results'][0]['locations'][0]["latLng"]['lat'];
                var long = parsed_json['results'][0]['locations'][0]["latLng"]['lng'];
                getSmog(lat, long, address);
            }
        });
    });

    function getSmog(lati, longi, address) {
        var key = "4b089295f5434035b91ef9b7e685f564";
        var myurl = "https://api.breezometer.com/baqi/?";
        myurl += "lat=" + lati;
        myurl += "&lon=" + longi;
        myurl += "&key=" + key;
        console.log(myurl);
        $.ajax({
            url: myurl,
            dataType: "json",
            success: function (parsed_json) {
                console.log(parsed_json);
                var aqi = parsed_json["breezometer_aqi"];
                var color = parsed_json["breezometer_color"];
                var description = parsed_json["breezometer_description"];
                var healthwarning = parsed_json["random_recommendations"]['health'];

                $("#address").text(address);
                $("#aqi").html(aqi);
                $("#description").html(description);
                $("#health").html(healthwarning);
                $("#output").css('background-color', color);
                $("#output").show({
                    duration: 1000
                });
            }
        });
    }
});
