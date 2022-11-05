$(function(){
    let baseURL = "https://deckofcardsapi.com/api/deck";

    //Question 1

    $.getJSON(`${baseURL}/new/draw/`).then(data => {
        let { suit, value} = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });

    //Questiion 2
    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw/`).then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw`);
    })
    .then(data => {let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card){
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            );
        });
    });

    //Question 3
    let deckId = null;
    let $btn = $("button")
    let $cardArea = $("#card-area")

    $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
        deckId = data.deck_id;
        $btn.show();
    });

    $btn.on("click", function() {
        $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
            let cardSource = data.cards[0].image;
            let cardAngle = Math.random() * 90 - 40;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append($("<img>", {src: cardSource, css: {transform: `translate(${randomX}px,
            ${randomY}px) rotate(${cardAngle}deg)`
            }
        })
        );
        if (data.remaing === 0) $btn.remove();
        });
    });
});

 