function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    console.log(searchInput);
    let cityElement = document.querySelector("#city");
    console.log(cityElement);
    let enteredCity = searchInput.value;
 console.log(enteredCity);
    cityElement.innerHTML = enteredCity;
   
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);