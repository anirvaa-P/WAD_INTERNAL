const apiKey = "7bb2a7d67bd27cb21aef01f917d9a6a8"; // replace
let chart;

// 🔥 Arrow function + async/await
const getWeather = async () => {
    const city = document.getElementById("city").value;

    if (!city) {
        document.getElementById("error").innerText = "Enter city name";
        return;
    }

    try {
        // 🔥 async + fetch
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        // 🔥 Error handling
        if (data.cod !== "200") {
            document.getElementById("error").innerText = data.message;
            return;
        }

        // 🔥 map (ES6)
        const temps = data.list.slice(0, 5).map(item => item.main.temp);
        const labels = data.list.slice(0, 5).map(item => item.dt_txt);

        showChart(labels, temps);
        document.getElementById("error").innerText = "";

    } catch (err) {
        document.getElementById("error").innerText = "Error fetching data";
    }
};

// 🔥 Arrow function
const showChart = (labels, temps) => {
    const ctx = document.getElementById("weatherChart").getContext("2d");

    // destroy old chart
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Temperature (°C)",
                data: temps,
                borderWidth: 2
            }]
        }
    });
};