//console.log(window);

window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);

            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}4&lon=${long}&appid=391d6c987731864a7153f60a32417823&units=metric`;

            fetch(api)
                .then(response => {
                    return response.json();
                }).then(data => {
                    // console.log(data);
                    const { temp } = data.main;
                    const icon = data.weather[0].main;
                    //console.log(icon);
                    // const { description } = robin;

                    // console.log(data.weather[0].description);
                    let imgLoc = data.weather[0].icon;
                    let imgUrl = `http://openweathermap.org/img/wn/${imgLoc}.png`;
                    //console.log(imgUrl);
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.name;


                    const img = document.getElementById("myImageId");
                    img.src = `${imgUrl}`;


                    let ferheinheit = (temp * (9 / 5)) + 32;


                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = ferheinheit.toFixed(2);
                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = temp;
                        }
                    });
                });


        });


    }

});