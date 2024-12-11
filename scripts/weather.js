//OpenWeatherMap API Key
const apiKey = '4d018f8f77fe08ded306298c094481be';
const city = 'São Luís';
const units = 'imperial';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

// Function to fetch and display current weather data
async function getWeather() {
    try {
        const response = await fetch(weatherApiUrl);
        const weatherData = await response.json();

        if (!response.ok) {
            console.error('Error fetching weather data:', weatherData.message);
            return;
        }

        const temperature = weatherData.main.temp.toFixed(1);
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
        const iconCode = weatherData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.querySelector('.current-weather .content').innerHTML = `
            <p><img src="${iconUrl}" alt="${description}" width="50"></p>
            <p><strong>${temperature}°F</strong></p>
            <p><span>${description.charAt(0).toUpperCase() + description.slice(1)}<span></p>
            <br>
            
            <p><span>Humidity: ${humidity}%</span></p>
            <p><span>Sunrise: ${sunrise}</span></p>
            <p><span>Sunset: ${sunset}</span></p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to fetch and display 3-day weather forecast
async function getForecast() {
    try {
        const response = await fetch(forecastApiUrl);
        const forecastData = await response.json();

        if (!response.ok) {
            console.error('Error fetching forecast data:', forecastData.message);
            return;
        }

        const forecastList = forecastData.list.filter(item =>
            item.dt_txt.includes('12:00:00')
        );

        if (!forecastList || forecastList.length === 0) {
            console.error('No forecast data available');
            return;
        }

        const forecastContainer = document.querySelector('.weather-forecast .content');
        forecastContainer.innerHTML = ''; 

        forecastList.slice(0, 3).forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'long'
            });
            const temp = day.main.temp.toFixed(1);
            const iconCode = day.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            forecastContainer.innerHTML += `
                <p>
                    ${date}: <img src="${iconUrl}" alt="Weather icon for ${date}" width="40"> 
                    <strong>${temp}°F</strong>
                </p>
            `;
        });
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

// Initialize functions
getWeather();
getForecast();