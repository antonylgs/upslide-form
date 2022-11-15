/*The select element*/
const countrySelector = document.querySelector("#country");

/*function to get the location of the user with his ip*/
function getCountry(ip) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents;
  /* http request to ipstack using the ip*/
  httpRequest.open(
    "GET",
    "http://api.ipstack.com/" +
      ip +
      "?access_key=0ce31528842e1890085cf5a2ee43b3ef"
  );
  httpRequest.send();

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.response);
        /* get the country code and set the option to city in the country of the user*/
        countryCode = data.country_code;
        if (countryCode == "FR") {
          countrySelector.value = "paris";
        }
        if (countryCode == "GB") {
          countrySelector.value = "london";
        }
        if (countryCode == "US") {
          countrySelector.value = "new-york";
        }
        if (countryCode == "DE") {
          countrySelector.value = "berlin";
        }
        if (countryCode == "SG") {
          countrySelector.value = "singapore";
        } else {
          return;
        }
      } else {
        alert("There was a problem with the request.");
      }
    }
  }
}

/*Get the IP of the user with ipify*/
fetch("https://api.ipify.org/?format=json")
  .then((response) => response.json())
  .then((data) => getCountry(data.ip));
