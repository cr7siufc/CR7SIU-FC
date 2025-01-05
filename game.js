let user = null;
let points = 0;
let coins = 0;
let tapPoints = 10;
let tapLevel = 1;

document.getElementById('home-btn').addEventListener('click', () => toggleSection('home'));
document.getElementById('rewards-btn').addEventListener('click', () => toggleSection('rewards'));
document.getElementById('fyi-btn').addEventListener('click', () => toggleSection('fyi'));
document.getElementById('improvements-btn').addEventListener('click', () => toggleSection('improvements'));

// Save username
document.getElementById('save-username').addEventListener('click', () => {
    const usernameInput = document.getElementById('username').value.trim();
    if (usernameInput) {
        user = usernameInput;
        document.getElementById('greeting').style.display = 'block';
        document.getElementById('display-username').textContent = user;
        document.getElementById('login-form').style.display = 'none';
    }
});

// Tap to mine
document.getElementById('tap-button').addEventListener('click', () => {
    points += tapPoints;
    updatePoints();
});

// Convert points to coins
document.getElementById('convert-points').addEventListener('click', () => {
    if (points >= 5000) {
        coins++;
        points -= 5000;
        updatePoints();
    } else {
        alert('Not enough points to convert!');
    }
});

// Update points
function updatePoints() {
    document.getElementById('points').textContent = points;
    document.getElementById('coins').textContent = coins;
}

// Toggle sections
function toggleSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

// Initialize attributes for improvements
const attributes = Array.from({ length: 20 }, (_, i) => ({
    name: `Attribute ${i + 1}`,
    level: 1,
    cost: 500 * (2 ** i)
}));

function loadAttributes() {
    const container = document.getElementById('attributes');
    container.innerHTML = '';
    attributes.forEach((attr, i) => {
        const div = document.createElement('div');
        div.className = 'attribute';
        div.innerHTML = `
            <h4>${attr.name}</h4>
            <p>Level: ${attr.level}</p>
            <p>Cost: ${attr.cost} points</p>
            <button onclick="upgradeAttribute(${i})">Upgrade</button>
        `;
        container.appendChild(div);
    });
}

// Upgrade attribute
function upgradeAttribute(index) {
    const attr = attributes[index];
    if (points >= attr.cost) {
        points -= attr.cost;
        attr.level++;
        attr.cost *= 2;
        updatePoints();
        loadAttributes();
    } else {
        alert('Not enough points!');
    }
}

loadAttributes();
