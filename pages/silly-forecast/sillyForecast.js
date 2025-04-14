// Function to get user's coordinates
function getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeather, showError);
    } else {
      document.getElementById('location').textContent = "Geolocation is not supported by this browser.";
    }
  }
  
  // Function to fetch weather data from Open-Meteo
  function fetchWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
  
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const temperature = data.current_weather.temperature;
        const locationText = `Latitude: ${lat.toFixed(2)}, Longitude: ${lon.toFixed(2)}`;
        document.getElementById('location').textContent = locationText;
        document.getElementById('temperature').textContent = `Current Temperature: ${temperature}°C`;
        document.getElementById('fashion-advice').textContent = getFashionAdvice(temperature);
      })
      .catch(error => {
        document.getElementById('location').textContent = "Unable to retrieve weather data.";
        console.error("Error fetching weather data:", error);
      });
  }
  
  // Function to provide humorous fashion advice based on temperature
  function getFashionAdvice(temp) {
    if (temp >= 35) {
      return "🔥 It's scorching! Time to wear your ice armor.";
    } else if (temp >= 25) {
      return "😎 Perfect weather for a fur coat. Trust me.";
    } else if (temp >= 15) {
      return "🧥 Break out the flip-flops and tank tops!";
    } else if (temp >= 3) {
      return "🩳 Shorts and sandals weather. Obviously.";
    } else {
      return "❄️ No clothes needed. Just vibes.";
    }
  }
  
  // Function to handle geolocation errors
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById('location').textContent = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById('location').textContent = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        document.getElementById('location').textContent = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        document.getElementById('location').textContent = "An unknown error occurred.";
        break;
    }
  }
  
  // Initialize
  getCoordinates();