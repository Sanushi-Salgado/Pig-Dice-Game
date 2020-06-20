// We will have only 1 round score at a time 
// Active Player - current player in turn
// dice - random number displayed each time when the dice is rolled

var scores, roundScore, activePlayer, dice1, dice2, lastDice, gamePlaying;

init();
 

// When the user clicks on the 'Roll Dice' button
document.querySelector(".btn-roll").addEventListener('click', function() {
    // The player should be able to roll the dice only if the game is active
    if(gamePlaying) {
        // Generate a random number when rolled the dice
        dice1 = Math.floor(Math.random() * 6 + 1);
        dice2 = Math.floor(Math.random() * 6 + 1);

        // Update the dice when rolled
        var diceDom1 = document.getElementById("dice-1");
        var diceDom2 = document.getElementById("dice-2");
        diceDom1.style.display = 'block';
        diceDom2.style.display = 'block';

        // We want to update the dice image also. Ex: if the dice gave 1 we want to display that image
        diceDom1.src = 'images/dice-' + dice1 + '.png';
        diceDom2.src = 'images/dice-' + dice2 + '.png';

        // Check if one of the dice's give 1
        if(dice1 !== 1 && dice2 !== 1) {
            // Add the rolled number to the round score
            roundScore += ( dice1 + dice2 );

            // Update the round score in the UI
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        }
        else {
            // Now it's the next player's turn
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
        
        var input = document.querySelector(".final-score").value;
        var winningScore;
        
        // If the input is not undefined, empty, null or 0
        if(input)
            winningScore = input;
        else
            // Set a default winning score, if the user doesn't specify it
            winningScore = 100;

        // Check if any player has reached 100 points on gloabl score
        if(scores[activePlayer] >= winningScore) {
            // Update the UI
            document.getElementById("name-" + activePlayer).textContent = "WINNNER!";
            document.getElementById("dice-1").style.display = 'none';
            document.getElementById("dice-2").style.display = 'none';
            document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner'); 
            document.querySelector(".player-0-panel").classList.remove('active'); 
            document.querySelector(".player-1-panel").classList.remove('active'); 

            gamePlaying = false;
        }
        else
            // Now it's the next player's turn
            nextPlayer();    
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
    document.getElementById("dice-1").style.display = 'none';
    document.getElementById("dice-2").style.display = 'none';
    
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
    document.getElementById("dice-1").style.display = 'none';
    document.getElementById("dice-2").style.display = 'none';
}