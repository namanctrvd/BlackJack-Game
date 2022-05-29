
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['cardClubs2', 'cardClubs3', 'cardClubs4', 'cardClubs5', 'cardClubs6', 'cardClubs7', 'cardClubs8', 'cardClubs9', 'cardClubs10', 'cardClubsA', 'cardClubsJ', 'cardClubsQ', 'cardClubsK', 'cardDiamonds2', 'cardDiamonds3', 'cardDiamonds4', 'cardDiamonds5', 'cardDiamonds6', 'cardDiamonds7', 'cardDiamonds8', 'cardDiamonds9', 'cardDiamonds10', 'cardDiamondsA', 'cardDiamondsJ', 'cardDiamondsQ', 'cardDiamondsK', 'cardHearts2', 'cardHearts3', 'cardHearts4', 'cardHearts5', 'cardHearts6', 'cardHearts7', 'cardHearts8', 'cardHearts9', 'cardHearts10', 'cardHeartsA', 'cardHeartsJ', 'cardHeartsQ', 'cardHeartsK', 'cardSpades2', 'cardSpades3', 'cardSpades4', 'cardSpades5', 'cardSpades6', 'cardSpades7', 'cardSpades8', 'cardSpades9', 'cardSpades10', 'cardSpadesA', 'cardSpadesJ', 'cardSpadesQ', 'cardSpadesK'],
    'cardMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '0': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] }
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lostSound = new Audio('static/sounds/aww.mp3')

function blackjackHit() {
    let card = randomCard()
    showCard(card, YOU)
    updateScore(card, YOU)
    showScore(YOU)
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 52)
    return blackjackGame['cards'][randomIndex]
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img')
        cardImage.src = `static/images/cards/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play()
    }
}

function blackjackDeal() {
    showResult(computeWinner()) 
    let yourImages = document.querySelector('#your-box').querySelectorAll('img')
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }
    for (let i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    } 

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').innerHTML = 0;
    document.querySelector('#dealer-blackjack-result').innerHTML = 0

    document.querySelector('#your-blackjack-result').style.color = '#ffffff'
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff'

    
}

function updateScore(card, activePlayer) {
    if (card.slice(-1) === 'A') {
        // if adding 1 keeps score below 21 than add 11 otherwise ad 1
        if (activePlayer['score'] + blackjackGame['cardMap'][card.slice(-1)][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardMap'][card.slice(-1)][1]
        }
        else {
            activePlayer['score'] += blackjackGame['cardMap'][card.slice(-1)][0]
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardMap'][card.slice(-1)]
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).innerHTML = 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).innerHTML = activePlayer['score']
    }
}

function blackjackStand() {
    let card = randomCard()
    showCard(card, DEALER)
    updateScore(card, DEALER)
    showScore(DEALER)
}

function computeWinner() {
    let winner 
    
    if (YOU['score'] <= 21) {
        // condition: Higher score than dealer or the dealer busts
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21 ) {
            console.log('You won!')
            winner = YOU
        }
        else if (YOU['score'] < DEALER['score']) {
            console.log('You lost!')
            winner = DEALER
        }
        else if (YOU['score'] ===  DEALER['score']) {
            console.log('You drew!')
        }
    }
    // condition: when user busts and dealer dosen't
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        console.log('You lost!');
        winner = DEALER;
    }
    // condition: when user and dealer both busts
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        console.log('You drew!')
    }

    return winner

}

function showResult(winner) {
    let message, messageColor
    if (winner === YOU){
        message = 'You Won!'
        messagecolor = 'green'
        winSound.play()
    }
    else if (winner === DEALER) {
        message = 'You Lost!'
        messagecolor = 'red'
        lostSound.play()
    }
    else {
        message = 'You Drew!'
        messageColor = 'black'
    }

    document.querySelector('#result').innerHTML = message;
    document.querySelector('#result').style.color = messageColor;
}