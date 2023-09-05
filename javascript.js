// Array of options that are valid
const options = ["Rock", "Paper", "Scissors"];

// Function to get computer choice from options array
function getComputerChoice() {
    let computerSelection = options[Math.floor(Math.random() * options.length)];
    return computerSelection;
}

// Function to get player choice
function getPlayerChoice() {
    let playerSelection = document.getElementById("playerOption").value;
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();
    return playerSelection;
}

// Function to check if player choice is valid
function validPlayerChoice() {
    let choice = getPlayerChoice();
    if (options.includes(choice)) {
        return true;
    } else {
        return false;
    }
}

// Function to play the game
function playRound(playerSelection, computerSelection) {
    // Check Draw condition
    if (playerSelection == computerSelection) {
        return "Draw";
    }

    // Check Win condition (if not satisfied, game is lost)
    if (playerSelection == "Rock" && computerSelection == "Scissors") {
        return "Win";
    } else if (playerSelection == "Paper" && computerSelection == "Rock") {
        return "Win";
    } else if (playerSelection == "Scissors" && computerSelection == "Paper") {
        return "Win";
    } else {
        return "Lose";
    }
}

// Function to add outcome to list
function outcome(message) {
    let roundsList = document.getElementById("rounds");
    let li = document.createElement('li');
    li.innerText = message;
    roundsList.appendChild(li);
}

// Function to play game
let playerWinCount = 0, computerWinCount = 0;
function game() {  
    // if player's choice is invalid, exit game
    if (! validPlayerChoice()) {
        alert("Enter a valid choice");
        return;
    }
    
    let playerWin = document.getElementById("playerWinCount");
    let computerWin = document.getElementById("computerWinCount");
    let player = getPlayerChoice();
    let computer = getComputerChoice();

    if (playRound(player, computer) == "Win") {
        outcome(`You Won! You played ${player} while Computer played ${computer}.`);
        playerWinCount++;
    }  else if (playRound(player, computer) == "Lose") {
        outcome(`You Lost! Computer played ${computer} while you played ${player}.`);
        computerWinCount++;
    } else {
        outcome(`It's a Draw! Both you and Computer played ${computer}.`);
    }

    playerWin.innerHTML = playerWinCount;
    computerWin.innerHTML = computerWinCount;
}

// Restart Game
function restart() {
    let roundsList = document.getElementById("rounds");
    let playerWin = document.getElementById("playerWinCount");
    let computerWin = document.getElementById("computerWinCount");
    let playerSelection = document.getElementById("playerOption");

    // Clear user input
    playerSelection.value = "";

    // Reset counter
    playerWinCount = 0, computerWinCount = 0;
    playerWin.innerHTML = playerWinCount;
    computerWin.innerHTML = computerWinCount;

    // Reset list
    roundsList.innerHTML = "";
}