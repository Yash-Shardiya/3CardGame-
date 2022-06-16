// object of various variable require to access
let blackJackGame = {
    "you": {'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    "dealer": {'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    "cards": ["2","3","4","5","6","7","8","9","10","K","J","Q","A"],
    "cardsMap": {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"J":10,"Q":10,"A":[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'turnsOver': false
}

//create object of you and dealer side
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

// adding sound
const hitSound =new Audio("static/sounds/swish.m4a")
const winSound = new Audio("static/sounds/cash.mp3")
const lossSound = new Audio("static/sounds/aww.mp3")

// event listener of hit and deal button
document.querySelector("#hit-btn").addEventListener('click',blackJackHit);
document.querySelector("#stand-btn").addEventListener('click',dealerLogic);
document.querySelector("#deal-btn").addEventListener('click',blackJackDeal);


// black jack hit function 
// 1. creating the random card
function blackJackHit(){
   if ( blackJackGame['isStand'] === false) {
    let card = randomCard();
    showCard(YOU,card);
    updateScore(YOU,card);
    showScore(YOU)
   }

    
}

// create a random card
function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}
// show card to screen
function showCard(activePlayer,card){
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `/static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play() 
    }

}
// update addition of card score of card to screen

function updateScore(activePlayer,card){
    if(card === 'A'){
        // if adding 11 keeps me below 21, add 11. ohterwise add 1
        if (activePlayer['score'] += blackJackGame['cardsMap'][card][1] <=21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0]
        }
    }
    else{
         // when no A is there
         activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
  
}

// show score to the screen 
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
       document.querySelector(activePlayer['scoreSpan']).textContent = "BUST";
       document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }

}

// cleaning screen of both you and dealer
function blackJackDeal(){
    if (blackJackGame['turnsOver'] === true) {
        
    
    
    blackJackGame['isStand'] === false;
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    for (let index = 0; index < yourImages.length; index++) {
        yourImages[index].remove()
    }

    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (let index = 0; index < dealerImages.length; index++) {
        dealerImages[index].remove()
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = 'white';
    document.querySelector("#dealer-blackjack-result").style.color = 'white';

    document.querySelector("#blackjack-result").textContent = 'Lets Play';
    document.querySelector("#blackjack-result").style.color = 'black';

    blackJackGame['turnsOver'] = true;

}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function dealerLogic(){

    blackJackGame['isStand'] = true;
    while (DEALER['score']<16 && blackJackGame['isStand'] === true) {
        let card = randomCard();
        showCard(DEALER,card);
        updateScore(DEALER,card);
        showScore(DEALER);
        await sleep(1000)
    }
        blackJackGame['turnsOver'] = true;
        let compute = computeWinner();
        showResult(compute)
 
}

// compute winner and return who just won

function computeWinner(){
    let winner;
    if (YOU['score'] <= 21) {
    // condition : higer score than dealer pr when dealer busts but youre 21
     if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21 ) {
        blackJackGame['wins']++;
        winner = YOU;
     } 
    else if (YOU['score'] < DEALER['score']){
        blackJackGame['losses']++;
        winner = DEALER;
    } 
    else if (YOU['score'] === DEALER['score']){
       
        blackJackGame['draws']++;
    }

    // condition when user bust but dealer doesnt
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
 
        blackJackGame['losses']++;
        winner = DEALER;

    // condition when you AND the dealer busts
    }
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
     
        blackJackGame['draws']++;
    }
    return winner;
}

// show winner

function showResult(winner){
    let message , messageColor;

    if (blackJackGame['turnsOver'] === true) {
        
   
 if (winner === YOU) {
     document.querySelector('#wins').textContent = blackJackGame['wins'];
     message = "YOU WIN";
     messageColor = "green";
     winSound.play()
 }
 else if(winner ===DEALER) {
    document.querySelector('#losses').textContent = blackJackGame['losses'];
    message = "YOU LOST";
    messageColor = "red";
    lossSound.play()
 }
 else{
    document.querySelector('#draws').textContent = blackJackGame['draws'];
    message = "MESSAGE DREW";
    messageColor = "black"; 
    lossSound.play()
 }

 document.querySelector('#blackjack-result').textContent = message;
 document.querySelector('#blackjack-result').style.color = messageColor;
}
}



