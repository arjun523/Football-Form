const countries = document.getElementById("country");
const states = document.getElementById("state");
const cities = document.getElementById("city");
const ccode = document.getElementById("countrycode");

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://countriesnow.space/api/v0.1/countries/codes")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      data.data.forEach((countrycode) => {
        const newoption = document.createElement("option");
        newoption.textContent = countrycode.dial_code + " " + countrycode.name;
        ccode.append(newoption);
      });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://countriesnow.space/api/v0.1/countries")
    .then((response) => response.json())

    .then((data) => {
      //   console.log(data);
      data.data.forEach((country) => {
        // console.log(country.country);
        const newoption = document.createElement("option");
        newoption.textContent = country.country;
        countries.append(newoption);
      });
      countries.dispatchEvent(new Event("change"));
    })
    .catch((err) => {
      console.log(err);
    });
});

countries.addEventListener("change", () => {
  fetch("https://countriesnow.space/api/v0.1/countries/states", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country: countries.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      data.data.states.forEach((state) => {
        const newoption = document.createElement("option");
        newoption.textContent = state.name;
        states.append(newoption);
      });
      states.dispatchEvent(new Event("change"));
    })
    .catch((err) => console.log(err));
});

states.addEventListener("change", () => {
  fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country: countries.value, state: states.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      data.data.forEach((city) => {
        const newoption = document.createElement("option");
        newoption.textContent = city;
        cities.append(newoption);
      });
    })
    .catch((err) => console.log(err));
});
