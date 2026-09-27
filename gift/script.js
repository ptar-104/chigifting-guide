// 1. Get the query string from the window location
const queryString = window.location.search;

// 2. Parse the parameters
const urlParams = new URLSearchParams(queryString);

// 3. Get specific values
const giftId = urlParams.get('giftid');   // Returns "alice"
const giftText = 'GiftId is ' + giftId;

document.getElementById("intro").innerHTML = "<h1>" + giftText + "</h1>";