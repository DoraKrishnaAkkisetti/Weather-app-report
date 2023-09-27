document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('location');
    const getWeatherButton = document.getElementById('getWeather');
    const errorContainer = document.getElementById('error-container');
    const weatherContainer = document.getElementById('weather-container');
    const locationName = document.getElementById('location-name');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const description = document.getElementById('description');
    const unitCelsius = document.getElementById('celsius');
    const unitFahrenheit = document.getElementById('fahrenheit');

    getWeatherButton.addEventListener('click', async () => {
        const location = locationInput.value;
        const unit = unitCelsius.checked ? 'metric' : 'imperial';
        const apiKey = 'YOUR_API_KEY';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod === 200) {
                errorContainer.textContent = '';
                weatherContainer.style.display = 'block';
                locationName.textContent = data.name;
                temperature.textContent = `Temperature: ${data.main.temp} °${unit === 'metric' ? 'C' : 'F'}`;
                humidity.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                description.textContent = `Weather: ${data.weather[0].description}`;
            } else {
                displayError('Location not found. Please try again.');
            }
        } catch (error) {
            displayError('An error occurred. Please try again.');
        }
    });

    
    function displayError(message) {
        weatherContainer.style.display = 'none';
        errorContainer.textContent = message;
    }
});
