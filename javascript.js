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
