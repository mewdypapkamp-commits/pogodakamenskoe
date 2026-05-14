async function updatePrices() {
  let lat = 48.51, lon = 34.61;
  try {
    const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, { timeout: 3000 }));
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
  } catch (e) {} 
  const distance = Math.hypot(lat - 48.85, (lon - 2.35) * 0.66) * 111;
  const busPrice = Math.round(distance * 3);
  const planePrice = Math.round(distance * 4 + 1000);
  if (document.getElementById('cina-c')) document.getElementById('cina-c').innerText = 'На автобусі приблизно: ' + busPrice + ' грн';
  if (document.getElementById('cina-s')) document.getElementById('cina-s').innerText = 'На літаку приблизно: ' + planePrice + ' грн';
}
updatePrices();
