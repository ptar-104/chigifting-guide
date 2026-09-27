import { GiftApi } from '../giftdata/gift-api.js';

// 1. Get the query string from the window location
const queryString = window.location.search;

// 2. Parse the parameters
const urlParams = new URLSearchParams(queryString);

// 3. Get specific values
const giftId = urlParams.get('giftid');   // Returns "alice"
let outputString = "";

if (giftId == null) {
    outputString = 'No giftId found!';
    console.log(outputString);
}

let giftApi;
try {
    giftApi = await GiftApi.get();
} catch (error) {
    outputString = "Error creating giftApi";
    console.log(outputString + ": " + error.message);
}
let giftData
if (giftApi) {
    try {
        giftData = giftApi.getGiftById(giftId);
    } catch (error) {
        outputString = "Error getting gift by id";
        console.log(outputString + ": " + error.message);
    }
}
if (giftData) {
    outputString = 'Got gift: ' + giftData.name;
}

document.getElementById("intro").innerHTML = "<h1>" + outputString + "</h1>";