//^+option+n = run code ; cmd + shift + up = select everything above
//select random int from 1 to 13

//object(or dictionary or key-value pairs) creation 
let player = {
    Name: "Player",
    Chips: 100
}

let cards = []
let sum = 0
let hasBlackJack = false
let message = ''

let messageEl = document.querySelector('#message-el')
let sumEl = document.querySelector('#sum-el')
let cardEl = document.querySelector('#card-el')
let playEl = document.querySelector('#play-el')
let restartEl = document.querySelector('#restart-el')

playEl.textContent = player.Name + ': $' + player.Chips

function getRandomCard(){
    let randomNumber = Math.floor(Math.random() * 13) + 1

    if (randomNumber > 10){
        return 10
    }
    else if (randomNumber === 1){
        return 11
    }
    else {
        return randomNumber
    }
}

function startGame(){
    let isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards=[firstCard, secondCard]
    sum = firstCard+secondCard
    renderGame()
}

function renderGame(){
    sumEl.textContent = "Sum: " + sum
    cardEl.textContent = "Cards: "
    //FOR LOOP SYNTAX
    //   start     finish  step size
    for (let i = 0; i < cards.length; i ++ ){
        cardEl.textContent += cards[i] + ' '
    }
    if (sum < 21){
        message = "try harder, draw again"
        isAlive = true
    } 
    else if (sum === 21){
        message = 'congrats! yay ;D'
        hasBlackJack = true
        isAlive = false
        player.Chips += 20
    } 
    else {
        message = "saddo you outo >:C"
        isAlive = false
        player.Chips -= 10
        restartEl.textContent = "Bruh you gotta restart the game"
    }
    messageEl.textContent = message
    playEl.textContent = player.Name + ': $' + player.Chips
}

function newCard(){
    if (isAlive === true && hasBlackJack === false){   // and = &&; or = \\
        let newCard = Math.floor(Math.random()*13) + 1
        sum += newCard
        cards.push(newCard)
        renderGame()
    }
    else{
        restartEl.textContent = "Bruh you gotta restart the game"
    }
}
