// Question 1

let favoriteNumber = 7;
let baseURL = "http://numbersapi.com";

$.getJSON(`${baseURL}/${favoriteNumber}?json`).then(data => {console.log(data);
});

// Question 2

let numberList = [3,8,15];

$.getJSON(`${baseURL}/${numberList}?json`).then(data => {console.log(data);
});

// Question 3 

Promise.all(
    Array.from({ length:4 }, () => {
        return $.getJSON(`${baseURL}/${favoriteNumber}?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});