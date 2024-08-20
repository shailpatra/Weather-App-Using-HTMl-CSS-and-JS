
var getLocation = () => {
    var apikey = 'IuOsP7GDpLQGdfSdwcVGANI20Qa0ogb7';
    // var country, location, key, timezone;

    navigator.geolocation.getCurrentPosition((position) => {

        // console.log(position);
        var lat , long;
        lat = position.coords.latitude;
        long = position.coords.longitude;

        var geoGrapicalLocation = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat},${long}`;
        // console.log(geoGrapicalLocation);
        axios.get(geoGrapicalLocation).then((response)=>{
            console.log(response);
            weatherUrlInfo.country = response.data.Country.EnglishName;
            weatherUrlInfo.location = response.data.EnglishName;
            weatherUrlInfo['key'] = response.data.Key;
            weatherUrlInfo.timezone = response.data.TimeZone;

            // console.log(key);         
            getwetherurl(apikey,weatherUrlInfo.key);

            console.log(weatherUrlInfo);
            
        });

    })
}

function getwetherurl(apikey,key){
    var weatherurl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${apikey}`;
    
    axios.get(weatherurl).then((response2)=>{
        // console.log(response2);
        weatherUrlInfo['today'] = response2.data.DailyForecasts[0].Date;
        weatherUrlInfo['Day'] = response2.data.DailyForecasts[0].Day;
        weatherUrlInfo['Night'] = response2.data.DailyForecasts[0].Night;
        weatherUrlInfo['temperature'] = response2.data.DailyForecasts[0].Temperature;

        var today = new Date(weatherUrlInfo.today);

        returnID('country').textContent = weatherUrlInfo.country;
        returnID('currentlocation').textContent = weatherUrlInfo.location;
        // returnID('date').textContent = today.getDate() + "-" + (today.getMonth() + 1) + "-" +today.getFullYear() + " " + weatherUrlInfo.timezone.Code; 

        if(weatherUrlInfo.Day.Icon <= 9){
            returnID('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherUrlInfo.Day.Icon}-s.png`)
        }else{
            returnID('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherUrlInfo.Day.Icon}-s.png`)
        }

        if(weatherUrlInfo.Night.Icon <= 9){
            returnID('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherUrlInfo.Night.Icon}-s.png`)
        }else{
            returnID('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherUrlInfo.Night.Icon}-s.png`)
        }
        

        returnID('day-phrase').textContent = weatherUrlInfo.Day.IconPhrase;
        returnID('night-phrase').textContent = weatherUrlInfo.Night.IconPhrase;
        returnID('day-precipitation').textContent = weatherUrlInfo.Day.PrecipitationType;

        if(weatherUrlInfo.Night.HasPrecipitation == true){
            returnID('night-precipitation').textContent = weatherUrlInfo.Night.PrecipitationType;
        }

        var maxtemp = ((weatherUrlInfo.temperature.Maximum.Value - 32) * 5 / 9).toFixed(1);
        var mintemp = ((weatherUrlInfo.temperature.Minimum.Value - 32) * 5 / 9).toFixed(1);
        

        weatherUrlInfo['max_temp_min_temp'] = {
            min : mintemp,
            max : maxtemp,
        }

        returnID('min-temp').textContent =  weatherUrlInfo.max_temp_min_temp.min + "°C";
        returnID('max-temp').textContent =  weatherUrlInfo.max_temp_min_temp.max + "°C";
        returnID('current-temp').textContent =  weatherUrlInfo.max_temp_min_temp.max + "°C";




    })
    return {}
}

var weatherUrlInfo = {}

var returnID = (ID) =>{
    return document.getElementById(ID);
}

window.addEventListener('load',getLocation)