async function updateWeather() {
    let lat = 48.51; 
    let lon = 34.61;

    try {
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 });
      });
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      console.log("Координаты получены!");
    } catch (e) {
      console.log("Геолокация недоступна, используем Каменское по умолчанию");
    }
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,cloud_cover`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const c = data.current;
      const now = new Date();
      const months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
      const dateElement = document.getElementById('current-date');
      if (dateElement) {
        dateElement.innerText = `${now.getDate()} ${months[now.getMonth()]}`;
      }
      if (document.getElementById('t')) document.getElementById('t').innerText = Math.round(c.temperature_2m) + '°C';
      if (document.getElementById('w')) document.getElementById('w').innerText = Math.round(c.wind_speed_10m) + ' км/год';
      if (document.getElementById('p')) document.getElementById('p').innerText = Math.round(c.surface_pressure * 0.75) + ' мм.рт. ст.';
      if (document.getElementById('h')) document.getElementById('h').innerText = c.relative_humidity_2m + '%';
      if (document.getElementById('r')) document.getElementById('r').innerText = c.cloud_cover + '%';
      console.log("Погода и дата успешно обновлены!");
    } catch (err) {
      console.error("Ошибка сети при запросе погоды:", err);
    }
  }
  updateWeather();
