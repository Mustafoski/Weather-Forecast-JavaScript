const SEARCH_VIEW  = document.getElementById('search_view');
const RESULTS_VIEW = document.getElementById('results_view');
const FORECAST_VIEW = document.getElementById('forecast_view');

var icon_url = 'http://openweathermap.org/img/w/';


function loadCities(){


    const cities = ["London", "Paris", "Madrid", "Lisbon","Ohrid"];

    var options = null;

    var dest = document.getElementById('dest');

    //Looping the cities
    cities.forEach(city => {
        options += '<option>' + city +'</options>';
    });

    dest.innerHTML = options;
}

function gettingWeather(){

    // 1. Open the Url
    var dest = document.getElementById('dest').value;
    var url = ('http://api.openweathermap.org/data/2.5/weather?q='+ dest + '&appid=6c345b20d0c8fac21a36761eb7d6cd38');
    console.log(url);
    console.log(dest);

    // 2. Fetch the URL

    fetch(url)
        .then(response => {
        if(response.status !== 200){
            console.error("API failed, Status Code " + response.status);
            return;
        }
        console.log(response);
    // 3.We make the response .json and open the data

        response.json().then(data => {
        console.log(data);
        RESULTS_VIEW.style.visibility = 'visible';
        FORECAST_VIEW.style.visibility= 'hidden';
        // Temperature
        document.getElementById('Temperature').textContent = data.main.temp;    

        //Wind

        document.querySelector('.Wind').textContent = data.wind.speed * data.wind.deg;
        //Description
        document.querySelector('.Description').textContent = data.weather[0].description;   
        });

        }).catch(err => {
        console.error("Fetch error "+ err);
    });
}

function forecast(){
    const API_BASE = 'http://api.openweathermap.org/data/2.5/forecast?mode=json&';
    const API_KEY = 'appid=6c345b20d0c8fac21a36761eb7d6cd38&';
    var dest = document.getElementById('dest').value;
    var url = API_BASE + API_KEY + 'q=' + dest;
    console.log(url);
    console.log(dest.value);

    // 2. Fetch the URL

    fetch(url)
        .then(response => {
        if(response.status !== 200){
            console.error("API failed, Status Code " + response.status);
            return;
        }
            console.log(response);
    // 3.We make the response .json and open the data

        response.json().then(data => {
            console.log(data);

                var listComponenents = data.list;
                var listComponenentsOutput = '<ul class="list-group">';
                
//                var icon = icon_url + data.list.weather["0"].icon + '.png';
//                    console.log(icon);
//                
                
                for(var i = 0; i <listComponenents.length;i++){
                    var icon = icon_url + data.list[i].weather["0"].icon + '.png';
                        console.log(icon);
                    listComponenentsOutput+= `
                        <li class="list-group-item">
                        <strong>${listComponenents[i].dt_txt}</strong>
                        <p class="name"><strong>${data.city.name}</strong></p>
                        <p align="right"><strong>${listComponenents[i].weather["0"].description}</strong></p>
                        <img align="right" src="${icon}">
                        <h3 class="temp">Temperature ${listComponenents[i].main.temp} C </h3>
                        <h3 class="humidity">Humidity ${listComponenents[i].main.humidity} % </h3>
                        <h3 class="wind">Wind ${(listComponenents[i].wind.deg / listComponenents[i].wind.speed).toFixed(2)} </h3>
                        </li>
                    `;
                     
                        
                }
                    listComponenentsOutput += '</ul>';

            RESULTS_VIEW.style.visibility = 'hidden';
            FORECAST_VIEW.style.visibility= 'visible';
            document.getElementById('list').innerHTML = listComponenentsOutput;

        
    });
    }).catch((err) => {
             console.error("Fetch error "+ err);
    });
}


