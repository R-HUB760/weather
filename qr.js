const textURL = document.querySelector("#url");
const btn = document.querySelector("#submit");
const format_file = document.querySelector("#format_file");
const QRscan = document.querySelector("#qr-scanner");
const warning = document.querySelector("#warning");
const city = document.querySelector("#city");
const mask = document.querySelector(".mask");

const API_KEY = "xUEITB7HSUILahDzAApMMKzoFAEULQvxbrCXQDrT";

const optionsAPI = {
  method: "GET",
  headers: {
    'X-Api-Key': API_KEY
  }
}

// Get Value
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let txtURL = textURL.value;
  qr_code_generator(txtURL);
})

// API configs
async function qr_code_generator(url) {

  const apiURL = `https://api.api-ninjas.com/v1/weather?city=${url}`;
  try {

    //btn disabled
    btn.disabled = true;
    btn.textContent = "Loading...";
    btn.style.cursor = "none";

    let response = await fetch(apiURL, optionsAPI);
    let data = await response.json();

    if(data !== "" || data !== undefined || data !== null || data.cloud_pct !== ""){

      // mask
      mask.classList.add("display_section");
      mask.classList.remove("hd_display");
      warning.textContent = "";
      // const { cloud_pct, temp, feels_like, humidity, min_temp, max_temp, wind_speed, wind_degrees, sunrise, sunset } = data;

      // let sunRiseHours = Math.floor(sunrise / 3600000);
      // let sunRiseMinutes = Math.floor((sunrise % 3600000) / 60000);

      QRscan.innerHTML =
        `<h5> Cloud : ${data.cloud_pct} %</h5>
        <h5> Temperature: ${data.temp} </h5>
        <h5>feels_like: ${data.feels_like} </h5>
        <h5>humidity: ${data.humidity} </h5>
        <h5>min_temp: ${data.min_temp} </h5>
        <h5>max_temp:${data.max_temp} </h5>
        <h5>wind_speed: ${data.wind_speed} </h5>
        <h5>wind_degrees: ${data.wind_degrees} </h5>
      `;

        // <h5>sunrise: ${sunRiseHours}:${sunRiseMinutes} AM</h5>
        // <h5>sunset: ${sunset} </h5>

      // City
      city.innerHTML = url + "<hr>";
      city.style.textTransform = "capitalize";
        
      // btn enable
      btn.disabled = false;
      btn.textContent = "Update Again";
      btn.style.cursor = "pointer";

      console.log(data);
    }

  } catch (error) {
    console.log(error);
    warning.textContent = "Please check Your City Spelling & Try Again. Thanks";

    // mask remove
    mask.classList.add("hd_display");

    // btn enable
    btn.disabled = false;
    btn.textContent = "Try Again";
    btn.style.cursor = "pointer";

  }

}