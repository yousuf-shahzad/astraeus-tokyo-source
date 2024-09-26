const gameForm = document.getElementById('gameForm');
const roleDisplay = document.getElementById('roleDisplay');
const playerNumberDisplay = document.getElementById('playerNumber');
const nextButton = document.getElementById('nextButton');
const restartButton = document.getElementById('restartButton');
const acknowledgeButton = document.getElementById('acknowledgeButton')
let roles = [];
let currentPlayer = 0;
let totalPlayers = 0;

gameForm.addEventListener('submit', startGame);
nextButton.addEventListener('click', displayNextRole);
restartButton.addEventListener('click', restartGame);
acknowledgeButton.addEventListener('click', clearCurrentRole)

function startGame(e) {
    e.preventDefault();
    totalPlayers = parseInt(document.getElementById('players').value);
    let mafia = parseInt(document.getElementById('mafia').value);
    let sheriff = parseInt(document.getElementById('sheriff').value);
    let doctor = parseInt(document.getElementById('doctor').value);

    // Validate and adjust role counts
    if (mafia + sheriff + doctor > totalPlayers) {
        alert("Too many special roles! Adjusting to fit player count.");
        mafia = Math.min(mafia, totalPlayers);
        sheriff = Math.min(sheriff, totalPlayers - mafia);
        doctor = Math.min(doctor, totalPlayers - mafia - sheriff);
    }

    const innocents = totalPlayers - mafia - sheriff - doctor;

    // Generate roles
    roles = [
        ...Array(innocents).fill("Innocent"),
        ...Array(mafia).fill("Mafia"),
        ...Array(sheriff).fill("Sheriff"),
        ...Array(doctor).fill("Doctor")
    ];

    // Shuffle roles
    for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    gameForm.style.display = 'none';
    nextButton.style.display = 'block';
    acknowledgeButton.style.display = 'block';
    currentPlayer = 1;
    displayNextRole();
}

function displayNextRole() {
    if (roles.length > 0) {
        const role = roles.pop();
        playerNumberDisplay.textContent = `Player ${currentPlayer}`;
        roleDisplay.textContent = `Your role is: ${role}`;
        nextButton.textContent = roles.length > 0 ? "Next Player" : "Finish Game";
        currentPlayer++;
    } else {
        playerNumberDisplay.textContent = "";
        roleDisplay.textContent = "All roles have been assigned!";
        nextButton.style.display = 'none';
        acknowledgeButton.style.display = 'none';
        restartButton.style.display = 'block';
    }
}

function restartGame() {
    gameForm.style.display = 'flex';
    roleDisplay.textContent = '';
    playerNumberDisplay.textContent = '';
    nextButton.style.display = 'none';
    restartButton.style.display = 'none';
    roles = [];
    currentPlayer = 0;
    totalPlayers = 0;
}

function clearCurrentRole() {
    roleDisplay.textContent = 'Hand the device over to the next player, who should click next player to see their role.'
}