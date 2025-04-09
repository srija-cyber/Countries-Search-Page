let resultCountriesEl = document.getElementById("resultCountries");
let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let allCountries = [];

function displayResults(countries) {
    resultCountriesEl.innerHTML = "";

    for (let i = 0; i < countries.length; i++) {
        let result = countries[i];

        let resultCountryEl = document.createElement("div");
        resultCountryEl.classList.add("rounded-lg", "bg-[#ecf4fc]", "p-2", "flex", "items-center", "gap-4", "m-2");

        let flagEl = document.createElement("img");
        flagEl.src = result.flag;
        flagEl.classList.add("h-12", "w-14");

        let countryEl = document.createElement("div");

        let countryNameEl = document.createElement("h1");
        countryNameEl.textContent = result.name;
        countryNameEl.classList.add("text-[#33536f]", "font-medium", "pb-2");

        let populationEl = document.createElement("p");
        populationEl.textContent = "Population: " + result.population;
        populationEl.classList.add("text-xs", "font-medium");

        countryEl.appendChild(countryNameEl);
        countryEl.appendChild(populationEl);
        resultCountryEl.appendChild(flagEl);
        resultCountryEl.appendChild(countryEl);
        resultCountriesEl.appendChild(resultCountryEl);
    }
}


function fetchAllCountries() {
    spinnerEl.classList.remove("hidden");
    let request = fetch("https://apis.ccbp.in/countries-data");
    request.then(function(response) {
        return response.json();
    }).then(function(data) {
        allCountries = data;
        displayResults(allCountries);
        spinnerEl.classList.add("hidden");
    });
}

function searchCountry() {
    let searchValue = searchInputEl.value.trim().toLowerCase();
    let filteredCountries = [];
    for (let i = 0; i < allCountries.length; i++) {
        if (allCountries[i].name.toLowerCase().includes(searchValue)) {
            filteredCountries.push(allCountries[i]);
        }
    }
    displayResults(filteredCountries);
}

fetchAllCountries();
searchInputEl.addEventListener("input", searchCountry);