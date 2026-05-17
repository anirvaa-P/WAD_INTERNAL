const apiKey = "YOUR_API_KEY";

let weatherChart;

const getWeather = async () => {

    const city = document.getElementById("city").value;

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        displayWeather(data);

    }
    catch(error){
        console.log(error);
    }

};

const displayWeather = (data) => {

    document.getElementById("cityName").innerHTML =
        data.city.name;

    document.getElementById("temperature").innerHTML =
        "Temperature : " + data.list[0].main.temp + " °C";

    document.getElementById("description").innerHTML =
        "Weather : " + data.list[0].weather[0].description;

    document.getElementById("humidity").innerHTML =
        "Humidity : " + data.list[0].main.humidity + "%";

    const labels = data.list.slice(0,8).map(item =>
        item.dt_txt
    );

    const temperatures = data.list.slice(0,8).map(item =>
        item.main.temp
    );

    createChart(labels, temperatures);

};

const createChart = (labels, temperatures) => {

    const ctx = document.getElementById("weatherChart");

    if(weatherChart){
        weatherChart.destroy();
    }

    weatherChart = new Chart(ctx, {
        type: "line",

        data: {
            labels: labels,

            datasets: [{
                label: "Temperature °C",
                data: temperatures,
                borderWidth: 2,
                tension: 0.3
            }]
        },

        options: {
            responsive: true
        }
    });

};
