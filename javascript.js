// Variables
const startResetBtn = document.querySelector('#startResetBtn');
const leftBody = document.querySelector('.leftBody');
const midBody = document.querySelector('.midBody');
const rightBody = document.querySelector('.rightBody');
const playerChoice = document.querySelector("#pChoice");
const computerChoice = document.querySelector("#cChoice");
const roundOutcome = document.querySelector("#roundOutcome");
let playerHealthCount = 5;
let computerHealthCount = 5;


// Array of options that are valid
const options = ["Rock", "Paper", "Scissors"];

// Function to get computer choice from options array
function getComputerChoice() {
    let computerSelection = options[Math.floor(Math.random() * options.length)];
    return computerSelection;
}


// Function to create option for player to choose
function createOption(optionValue) {

    // Create Button
    let option = document.createElement('button');
    option.setAttribute('id', optionValue);

    // Attach Image
    let image = document.createElement('img');
    image.src = '/images/' + optionValue.toLowerCase()+'-clipart.png';
    image.alt = 'Image of ' + optionValue;
    image.style.width = '100%';
    image.style.height = '100%';
    option.appendChild(image);

    return option;
};

// Function to create all Rock, Paper, Scissors options
function createOptions() {
    let optionDiv = document.createElement('div');
    optionDiv.id = 'optionDiv';

    let rockBtn = createOption('Rock');
    let paperBtn = createOption('Paper');
    let scissorsBtn = createOption('Scissors');

    optionDiv.appendChild(rockBtn);
    optionDiv.appendChild(paperBtn);
    optionDiv.appendChild(scissorsBtn);

    // midBody.appendChild(optionDiv);
    midBody.insertBefore(optionDiv, roundOutcome);
};


// Function to create Player and Computer Profiles
function createProfiles() {
    // Player Health Background
    let playerHealthBackground = document.createElement("div");
    playerHealthBackground.id = 'playerHealthBackground';
    leftBody.appendChild(playerHealthBackground);

    // Player Health
    let playerHealth = document.createElement("div");
    playerHealth.id = 'playerHealth';
    playerHealthBackground.appendChild(playerHealth);

    // Computer Health Background
    let computerHealthBackground = document.createElement("div");
    computerHealthBackground.id = 'computerHealthBackground';
    rightBody.appendChild(computerHealthBackground);

    // Computer Health
    let computerHealth = document.createElement("div");
    computerHealth.id = 'computerHealth';
    computerHealthBackground.appendChild(computerHealth);

}

// Function to Start/Reset the Game
let gameStartReset = function() {

    // Update button to Reset once Game starts, or Start when Game is Reset
    if (startResetBtn.textContent == 'Start!') {
        startResetBtn.textContent = 'Reset!';
        createOptions();
        createProfiles()
    } else {
        startResetBtn.textContent = 'Start!';
        restart()
        return;
    }
    
    // Get player choice and play round
    let rockBtn = document.querySelector('#Rock');
    let paperBtn = document.querySelector('#Paper');
    let scissorsBtn = document.querySelector('#Scissors');

    rockBtn.addEventListener('click', function() {
        playRound('Rock', getComputerChoice());
    });

    paperBtn.addEventListener('click', function() {
        playRound('Paper', getComputerChoice());
    });

    scissorsBtn.addEventListener('click', function() {
        playRound('Scissors', getComputerChoice());
    }); 

};


// Function to decide winner of round, add outcome and check for game winner
function playRound(playerSelection, computerSelection) {

    console.log('P: ', playerSelection, 'C: ', computerSelection);

    // Check Draw condition
    if (playerSelection == computerSelection) {
        outcome(`It's a Draw! Both You and Computer played ${playerSelection}.`);
        return;
    }

    // Check Win condition (if not satisfied, game is lost)
    const winningCombinations = {
        'Rock': 'Scissors',
        'Paper': 'Rock',
        'Scissors': 'Paper'
    };

    if (winningCombinations[playerSelection] == computerSelection) {
        // If player won, computer loses health
        computerHealthCount--;
        takeDamage('Computer', computerHealthCount);
        if (computerHealthCount == 0) {
            displayWinner('You');
        } else {
            outcome(`You Won! You played ${playerSelection} while Computer played ${computerSelection}.`);
        }
    } else {
        playerHealthCount--;
        takeDamage('Player', playerHealthCount);
        if (playerHealthCount == 0) {
            displayWinner('Computer');
        } else {
            outcome(`You Lost! You played ${playerSelection} while Computer played ${computerSelection}.`);
        }
    }
};


// Function to change health bar
function takeDamage(damaged, remainingHealthPoints) {

    let healthBar;
    if (damaged == 'Player') {
        healthBar = document.querySelector('#playerHealth');
    } else {
        healthBar = document.querySelector('#computerHealth');
    };

    // Update health based on remaining health percent
    healthBar.style.width = remainingHealthPoints / 5 * 100 + '%';
}


// Function to add outcome to list
function outcome(message) {
    roundOutcome.innerText = message;
};


// Function to display winner
function displayWinner(winner) {

    let rockBtn = document.querySelector('#Rock');
    let paperBtn = document.querySelector('#Paper');
    let scissorsBtn = document.querySelector('#Scissors');

    // Disable buttons
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;

    outcome(`${winner} won!`);

};


// Restart Game
function restart() {

    // Reset health
    playerHealthCount = 5;
    computerHealthCount = 5;

    // Remove Health bars
    while (leftBody.firstChild) {
        leftBody.removeChild(leftBody.firstChild);
    };
    while (rightBody.firstChild) {
        rightBody.removeChild(rightBody.firstChild);
    }


    // Remove options and outcome
    let optionExist = document.querySelector('#optionDiv');
    if (optionExist != null) {
        midBody.removeChild(optionExist);
    };
    roundOutcome.innerHTML = '';

}


// Start/Reset Game on click
startResetBtn.addEventListener('click', gameStartReset);