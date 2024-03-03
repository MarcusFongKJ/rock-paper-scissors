// Array of options that are valid
const options = ["Rock", "Paper", "Scissors"];

// Function to get computer choice from options array
function getComputerChoice() {
    let computerSelection = options[Math.floor(Math.random() * options.length)];
    return computerSelection;
}

// Variables
const startBtn = document.querySelector('#startBtn');
const divBody = document.querySelector('.body');

// Function to create option for player to choose
function createOption(optionValue) {
    let option = document.createElement('button');
    option.textContent = optionValue;
    option.setAttribute('id', optionValue);
    return option;
};

// Function to create all Rock, Paper, Scissors options
function createOptions() {
    let optionDiv = document.createElement('div');
    optionDiv.id = 'optionDiv';

    let rockOption = createOption('Rock');
    let paperOption = createOption('Paper');
    let scissorsOption = createOption('Scissors');

    optionDiv.appendChild(rockOption);
    optionDiv.appendChild(paperOption);
    optionDiv.appendChild(scissorsOption);

    divBody.appendChild(optionDiv);
};


// Start the game
let gameStart = function() {

    // Create options for player to choose
    createOptions();

    // Get player choice and play round
    let rockSelection = document.querySelector('#Rock');
    let paperSelection = document.querySelector('#Paper');
    let scissorsSelection = document.querySelector('#Scissors');

    let playerWinCount = 0, computerWinCount = 0;

    rockSelection.addEventListener('click', function() {
        playRound('Rock', getComputerChoice());
    });

    paperSelection.addEventListener('click', function() {
        playRound('Paper', getComputerChoice());
    });

    scissorsSelection.addEventListener('click', function() {
        playRound('Scissors', getComputerChoice());
    }); 

};

startBtn.addEventListener('click', gameStart);


// Function to decide winner of round
function playRound(playerSelection, computerSelection) {

    console.log('P: ', playerSelection, 'C: ', computerSelection);

    let playerWin = document.getElementById("playerWinCount");
    let computerWin = document.getElementById("computerWinCount");

    // Check Draw condition
    if (playerSelection == computerSelection) {
        console.log("Draw");
        return;
    }

    // Check Win condition (if not satisfied, game is lost)
    const winningCombinations = {
        'Rock': 'Scissors',
        'Paper': 'Rock',
        'Scissors': 'Paper'
    };
    if (winningCombinations[playerSelection] == computerSelection) {
        console.log('Win');
        playerWinCount++;
        playerWin++;

    } else {
        console.log('Lose');
    }
};

// Function to add outcome to list
function outcome(message) {
    let roundsList = document.getElementById("rounds");
    let li = document.createElement('li');
    li.innerText = message;
    roundsList.appendChild(li);
}

// Function to play game
// let playerWinCount = 0, computerWinCount = 0;
function game() {  

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