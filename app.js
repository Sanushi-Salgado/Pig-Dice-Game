/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// We will have only 1 round score at a time 
// Active Player - current player in turn
// dice - random number displayed each time when the dice is rolled

var scores, roundScore, activePlayer, dice1, dice2, gamePlaying;

init();
 

// When the user clicks on the 'Roll Dice' button
document.querySelector(".btn-roll").addEventListener('click', function() {
    // The player should be able to roll the dice only if the game is active
    if(gamePlaying) {
        // Generate a random number when rolled the dice
        dice1 = Math.floor(Math.random() * 6 + 1);
        dice2 = Math.floor(Math.random() * 6 + 1);

        // Update the dice when rolled
        var diceDom1 = document.querySelector(".dice1");
        var diceDom2 = document.querySelector(".dice2");
        diceDom1.style.display = 'block';
        diceDom2.style.display = 'block';

        // We want to update the dice image also. Ex: if the dice gave 1 we want to display that image
        diceDom1.src = 'images/dice-' + dice1 + '.png';
        diceDom2.src = 'images/dice-' + dice2 + '.png';

        if(dice1 !== 1 && dice2 !== 1) {
            // Add the rolled number to the round score
            roundScore += ( dice1 + dice2 );

            // Update the round score in the UI
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        }
        else {
            // Next player's turn
            nextPlayer();
        }
    }
});



// When the user clicks on the 'Hold' button
document.querySelector(".btn-hold").addEventListener('click', function() {
    // The player should be able to hold the points only if the game is active
    if(gamePlaying) {
        // Add the round score to the active player's global score
        scores[activePlayer] += roundScore;

        // Update the global score in the UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        
        var winningScore = document.getElementById("score").input.value;

        // Check if any player has reached 100 points on gloabl score
        if(scores[activePlayer] >= winningScore) {
            // Update the UI
            document.getElementById("name-" + activePlayer).textContent = "WINNNER!";
            document.querySelector(".dice1").style.display = 'none';
            document.querySelector(".dice2").style.display = 'none';
            document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner'); 
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active'); 

            gamePlaying = false;
        }
//        else {
//            // Change to the next player
//            nextPlayer();
//        }
        
    }
});



document.querySelector(".btn-new").addEventListener('click', init);



function init() {
    // Set all scores to 0 at the begining
    roundScore = 0
    scores = [0, 0];
    activePlayer = 0;
    gamePlaying = true;
    
    // Update the scores in the UI
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    
    // Hide the dice image when loading the page
    document.querySelector(".dice1").style.display = 'none';
    document.querySelector(".dice2").style.display = 'none';
    
    // Set player names
    document.getElementById("name-0").textContent = 'Player 1';
    document.getElementById("name-1").textContent = 'Player 2';
    
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.add('active');
    
    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');
}



function nextPlayer() {
    // Now it's the next player's turn
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    // Display who is the active player in the UI
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');
        
    roundScore = 0;
        
    // Update the round score in the UI
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
        
    // Hide the dice
    document.querySelector(".dice1").style.display = 'none';
    document.querySelector(".dice2").style.display = 'none';
}