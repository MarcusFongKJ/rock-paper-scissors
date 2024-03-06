// Variables
const startResetBtn = document.querySelector('#startResetBtn');
const leftBody = document.querySelector('.leftBody');
const midBody = document.querySelector('.midBody');
const rightBody = document.querySelector('.rightBody');
const playerChoiceContainer = document.querySelector("#pChoiceContainer");
const computerChoiceContainer = document.querySelector("#cChoiceContainer");
const roundOutcome = document.querySelector("#roundOutcome");
let pChoice;
let cChoice;
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
    image.src = './images/' + optionValue.toLowerCase()+'-clipart.png';
    image.alt = 'Image of ' + optionValue;
    image.style.width = '100%';
    image.style.height = '30%';
    option.appendChild(image);

    return option;
};

// Function to create all Rock, Paper, Scissors options
function createOptions() {
    let options = document.createElement('div');
    options.id = 'options';

    let rockBtn = createOption('Rock');
    let paperBtn = createOption('Paper');
    let scissorsBtn = createOption('Scissors');

    options.appendChild(rockBtn);
    options.appendChild(paperBtn);
    options.appendChild(scissorsBtn);

    midBody.append(options);
};


// Function to create Player and Computer Profiles
function createProfiles() {

    // Player Profile
    let playerImg = document.createElement('img');
    playerImg.src = './images/hero-blue.png';
    playerImg.alt = 'Image of cartoon man in blue cape';
    playerImg.style.width = '100%';
    playerImg.style.height = '100%';
    playerImg.id = 'playerImg';
    leftBody.appendChild(playerImg);

    // Player Health Background
    let playerHealthBackground = document.createElement("div");
    playerHealthBackground.id = 'playerHealthBackground';
    leftBody.appendChild(playerHealthBackground);

    // Player Health
    let playerHealth = document.createElement("div");
    playerHealth.id = 'playerHealth';
    playerHealthBackground.appendChild(playerHealth);

    // Player Health Counter
    let playerHealthCounter = document.createElement("div");
    playerHealthCounter.id = 'playerHealthCounter';
    playerHealthCounter.innerHTML = playerHealthCount;
    playerHealthBackground.appendChild(playerHealthCounter);

    // Computer Profile
    let computerImg = document.createElement('img');
    computerImg.src = './images/hero-red.png';
    computerImg.alt = 'Image of cartoon man in red cape';
    computerImg.style.width = '100%';
    computerImg.style.height = '100%';
    computerImg.id = 'computerImg';
    rightBody.appendChild(computerImg);

    // Computer Health Background
    let computerHealthBackground = document.createElement("div");
    computerHealthBackground.id = 'computerHealthBackground';
    rightBody.appendChild(computerHealthBackground);

    // Computer Health
    let computerHealth = document.createElement("div");
    computerHealth.id = 'computerHealth';
    computerHealthBackground.appendChild(computerHealth);

    // Computer Health Counter
    let computerHealthCounter = document.createElement("div");
    computerHealthCounter.id = 'computerHealthCounter';
    computerHealthCounter.innerHTML = computerHealthCount;
    computerHealthBackground.appendChild(computerHealthCounter);

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

    // Show Player and Computer Choice
    displaySelection(playerSelection, 'Player');
    displaySelection(computerSelection, 'Computer');

    // Check Draw condition
    if (playerSelection == computerSelection) {
        outcome(`Draw! Both You and Computer played ${playerSelection}.`);
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
            outcome(`Win! You played ${playerSelection} while Computer played ${computerSelection}.`);
        }
    } else {
        playerHealthCount--;
        takeDamage('Player', playerHealthCount);
        if (playerHealthCount == 0) {
            displayWinner('Computer');
        } else {
            outcome(`Lost! You played ${playerSelection} while Computer played ${computerSelection}.`);
        }
    }
};


// Function to update health bar
function takeDamage(damaged, remainingHealthPoints) {

    let healthBar;
    let healthRemain;
    if (damaged == 'Player') {
        healthBar = document.querySelector('#playerHealth');
        healthRemain = document.querySelector('#playerHealthCounter');
    } else {
        healthBar = document.querySelector('#computerHealth');
        healthRemain = document.querySelector('#computerHealthCounter');
    };

    // Update health based on remaining health percent
    healthBar.style.width = remainingHealthPoints / 5 * 100 + '%';
    healthRemain.innerHTML = remainingHealthPoints;
}


// Function to display and update player and computer selection
function displaySelection(selection, participant) {

    let selectionImg = document.createElement('img');
    selectionImg.src = './images/' + selection.toLowerCase()+'-clipart.png';
    selectionImg.alt = 'Image of ' + selection;
    selectionImg.style.width = '100%';
    selectionImg.style.height = '100%';

    let choiceExists;
    if (participant == 'Player') {
        choiceExists = document.querySelector('#pChoice');
        selectionImg.id = 'pChoice';
        if (choiceExists != null) {
            playerChoiceContainer.replaceChild(selectionImg, choiceExists);
        } else {
            playerChoiceContainer.appendChild(selectionImg);
        }
        
    }
    
    if (participant == 'Computer') {
        choiceExists = document.querySelector('#cChoice');
        selectionImg.id = 'cChoice';
        if (choiceExists != null) {
            computerChoiceContainer.replaceChild(selectionImg, choiceExists);
        } else {
            computerChoiceContainer.appendChild(selectionImg);
        }
    }
    
}


// Function to add outcome to list
function outcome(message) {
    roundOutcome.innerText = message;
};


// Function to display winner and disable button inputs
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

    // Remove selection, options and outcome
    let optionExist = document.querySelector('#options');
    if (optionExist != null) {
        midBody.removeChild(optionExist);
    };
    while (playerChoiceContainer.firstChild) {
        playerChoiceContainer.removeChild(playerChoiceContainer.firstChild);
    };
    while (computerChoiceContainer.firstChild) {
        computerChoiceContainer.removeChild(computerChoiceContainer.firstChild);
    };
    roundOutcome.innerHTML = '';

}


// Start/Reset Game on click
startResetBtn.addEventListener('click', gameStartReset);