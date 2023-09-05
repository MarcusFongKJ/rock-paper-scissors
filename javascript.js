// Array of options that are valid
const options = ["Rock", "Paper", "Scissors"];

// Function to get computer choice from options array
function getComputerChoice() {
    let computerChoice = options[Math.floor(Math.random() * options.length)];
    return computerChoice;
}