/* 
* Game Rules
*/

var scores, roundScore, activePlayer, gamePlay;

initalize();


document.querySelector('.btn--roll').addEventListener('click', function() {
    if(gamePlay) {
        // 1. Need a random number
        dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was not a 1
        if (dice !== 1) {
            // Add Score
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;

        } else {
            // Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if(gamePlay) {
        // 1. Add current score to global score.
        scores[activePlayer] += roundScore;
        // 2. update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        // 3. Check if player won the game 
        if(scores[activePlayer] >= 100) {
            document.querySelector('#name--' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('winner');
            document.querySelector('.player--' + activePlayer).classList.remove('active');
            gamePlay = false;
        } else {
        // Next Player
        nextPlayer(); 
        }
    }
});

function nextPlayer() {
     // Ternary operator, same as IF statement
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;
     document.getElementById('current--0').textContent = '0';
     document.getElementById('current--1').textContent = '0';

     // change active player by transferring active tag
     document.querySelector('.player--0').classList.toggle('player--active');
     document.querySelector('.player--1').classList.toggle('player--active');
     document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', initalize);

function initalize() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    gamePlay = true;

    document.querySelector('.dice').style.display = 'none';

    // Setting all scores to 0
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--0').textContent = '0';

    // Reset player names
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    // Reset active window
    // document.querySelector('.player--0').classList.remove = "Winner!";
    // document.querySelector('.player--1').classList.remove = "Winner!";
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}


// Notes
// DOM Manipulation
/* #current-- + active player because this will make the querySelector
*  more dynamic as its value will be based on the value of the 
*  active player (either 0 or 1)
*/
// document.querySelector('#current--' + activePlayer).textContent = dice;
// document.querySelector('.dice').style.display = 'none';

// // Setting all scores to 0
// document.getElementById('score--0').textContent = '0';
// document.getElementById('score--1').textContent = '0';
// document.getElementById('current--0').textContent = '0';
// document.getElementById('current--0').textContent = '0';
/*
 We will use an anonymous function for the button event listener as we don't want
 this function to be used anywhere else 
*/