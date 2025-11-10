document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button-enhanced') || document.querySelector('.play-button') || document.getElementById('play-button');
    const roleSelectionWindow = document.getElementById('role-selection-window');
    const findMatchButton = document.querySelector('.find-match-button');
    const roles = document.querySelectorAll('.role');

    const settingsButton = document.getElementById('settings-button');
    const settingsWindow = document.getElementById('settings-window');
    const closeSettingsButton = document.querySelector('.close-settings-button');
    const notificationsButton = document.getElementById('notifications-button');

    if (playButton) {
        playButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (roleSelectionWindow) {
                roleSelectionWindow.style.display = 'flex';
            }
        });
    }

    findMatchButton.addEventListener('click', (e) => {
        e.preventDefault();
        roleSelectionWindow.style.display = 'none';
    });

    roleSelectionWindow.addEventListener('click', (e) => {
        if (e.target === roleSelectionWindow) {
            roleSelectionWindow.style.display = 'none';
        }
    });

    roles.forEach(role => {
        role.addEventListener('click', () => {
            role.classList.toggle('selected');
        });
    });

    settingsButton.addEventListener('click', (e) => {
        e.preventDefault();
        settingsWindow.style.display = 'flex';
    });

    closeSettingsButton.addEventListener('click', (e) => {
        e.preventDefault();
        settingsWindow.style.display = 'none';
    });

    settingsWindow.addEventListener('click', (e) => {
        if (e.target === settingsWindow) {
            settingsWindow.style.display = 'none';
        }
    });

    // Notifications button functionality
    if (notificationsButton) {
        notificationsButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you can add notification dropdown functionality
            console.log('Notifications clicked');
            // For now, just show an alert
            alert('Notifications: 3 new messages');
        });
    }

    // Friends list toggle functionality
    const friendsToggle = document.getElementById('friends-toggle');
    const friendsListContent = document.querySelector('.friends-list-content');
    const toggleIcon = friendsToggle.querySelector('.toggle-icon');

    if (friendsToggle && friendsListContent && toggleIcon) {
        friendsListContent.classList.add('collapsed'); // Start collapsed
        toggleIcon.classList.add('rotated'); // Rotate icon for collapsed state

        friendsToggle.addEventListener('click', () => {
            friendsListContent.classList.toggle('collapsed');
            toggleIcon.classList.toggle('rotated');
        });
    }

    // Dynamic Last Match functionality
    const matchData = [
        {
            result: 'win',
            duration: '35:21',
            mode: 'Ranked All Pick',
            score: '45 - 23',
            ownerHero: 'juggernaut', // This should match data-player-hero in index.html
            radiant: [
                { hero: 'juggernaut', name: 'Player 1', kda: '15/3/12', gpmxpm: '500 GPM / 600 XPM' },
                { hero: 'pudge', name: 'Player 2', kda: '5/10/8', gpmxpm: '350 GPM / 400 XPM' },
                { hero: 'crystal_maiden', name: 'Player 3', kda: '2/5/25', gpmxpm: '250 GPM / 300 XPM' },
                { hero: 'invoker', name: 'Player 4', kda: '10/8/15', gpmxpm: '450 GPM / 550 XPM' },
                { hero: 'axe', name: 'Player 5', kda: '12/4/10', gpmxpm: '400 GPM / 500 XPM' },
            ],
            dire: [
                { hero: 'lion', name: 'Enemy 1', kda: '4/7/22', gpmxpm: '300 GPM / 350 XPM' },
                { hero: 'lina', name: 'Enemy 2', kda: '8/9/5', gpmxpm: '420 GPM / 500 XPM' },
                { hero: 'witch_doctor', name: 'Enemy 3', kda: '7/2/18', gpmxpm: '280 GPM / 320 XPM' },
                { hero: 'phantom_assassin', name: 'Enemy 4', kda: '10/6/10', gpmxpm: '480 GPM / 580 XPM' },
                { hero: 'ogre_magi', name: 'Enemy 5', kda: '3/12/15', gpmxpm: '200 GPM / 250 XPM' },
            ]
        },
        {
            result: 'loss',
            duration: '42:10',
            mode: 'All Pick',
            score: '30 - 50',
            ownerHero: 'pudge',
            radiant: [
                { hero: 'pudge', name: 'Player 1', kda: '5/10/8', gpmxpm: '350 GPM / 400 XPM' },
                { hero: 'juggernaut', name: 'Player 2', kda: '10/5/15', gpmxpm: '450 GPM / 550 XPM' },
                { hero: 'lich', name: 'Player 3', kda: '2/8/18', gpmxpm: '200 GPM / 280 XPM' },
                { hero: 'phantom_lancer', name: 'Player 4', kda: '12/7/10', gpmxpm: '550 GPM / 650 XPM' },
                { hero: 'vengeful_spirit', name: 'Player 5', kda: '3/10/12', gpmxpm: '280 GPM / 320 XPM' },
            ],
            dire: [
                { hero: 'axe', name: 'Enemy 1', kda: '15/5/10', gpmxpm: '500 GPM / 600 XPM' },
                { hero: 'invoker', name: 'Enemy 2', kda: '10/3/18', gpmxpm: '480 GPM / 580 XPM' },
                { hero: 'drow_ranger', name: 'Enemy 3', kda: '8/4/10', gpmxpm: '400 GPM / 480 XPM' },
                { hero: 'rubick', name: 'Enemy 4', kda: '4/8/15', gpmxpm: '250 GPM / 300 XPM' },
                { hero: 'tidehunter', name: 'Enemy 5', kda: '6/6/14', gpmxpm: '380 GPM / 450 XPM' },
            ]
        },
        {
            result: 'win',
            duration: '28:45',
            mode: 'Ranked All Pick',
            score: '50 - 20',
            ownerHero: 'crystal_maiden',
            radiant: [
                { hero: 'crystal_maiden', name: 'Player 1', kda: '2/5/25', gpmxpm: '250 GPM / 300 XPM' },
                { hero: 'sven', name: 'Player 2', kda: '20/2/10', gpmxpm: '600 GPM / 700 XPM' },
                { hero: 'zeus', name: 'Player 3', kda: '10/3/15', gpmxpm: '400 GPM / 500 XPM' },
                { hero: 'tusk', name: 'Player 4', kda: '5/8/20', gpmxpm: '300 GPM / 380 XPM' },
                { hero: 'wraith_king', name: 'Player 5', kda: '15/4/10', gpmxpm: '500 GPM / 600 XPM' },
            ],
            dire: [
                { hero: 'phantom_assassin', name: 'Enemy 1', kda: '8/10/5', gpmxpm: '450 GPM / 550 XPM' },
                { hero: 'ogre_magi', name: 'Enemy 2', kda: '3/12/15', gpmxpm: '200 GPM / 250 XPM' },
                { hero: 'sniper', name: 'Enemy 3', kda: '10/7/8', gpmxpm: '400 GPM / 480 XPM' },
                { hero: 'axe', name: 'Enemy 4', kda: '6/9/12', gpmxpm: '350 GPM / 420 XPM' },
                { hero: 'witch_doctor', name: 'Enemy 5', kda: '4/10/18', gpmxpm: '280 GPM / 320 XPM' },
            ]
        },
        {
            result: 'loss',
            duration: '48:15',
            mode: 'Ranked All Pick',
            score: '20 - 40',
            ownerHero: 'invoker',
            radiant: [
                { hero: 'invoker', name: 'Player 1', kda: '10/8/15', gpmxpm: '450 GPM / 550 XPM' },
                { hero: 'anti-mage', name: 'Player 2', kda: '15/5/10', gpmxpm: '600 GPM / 700 XPM' },
                { hero: 'disruptor', name: 'Player 3', kda: '3/10/20', gpmxpm: '250 GPM / 300 XPM' },
                { hero: 'centaur', name: 'Player 4', kda: '8/7/12', gpmxpm: '400 GPM / 480 XPM' },
                { hero: 'drow_ranger', name: 'Player 5', kda: '12/6/8', gpmxpm: '500 GPM / 600 XPM' },
            ],
            dire: [
                { hero: 'phantom_assassin', name: 'Enemy 1', kda: '20/5/10', gpmxpm: '650 GPM / 750 XPM' },
                { hero: 'ogre_magi', name: 'Enemy 2', kda: '5/15/20', gpmxpm: '200 GPM / 250 XPM' },
                { hero: 'lina', name: 'Enemy 3', kda: '10/8/15', gpmxpm: '450 GPM / 550 XPM' },
                { hero: 'axe', name: 'Enemy 4', kda: '10/7/12', gpmxpm: '400 GPM / 480 XPM' },
                { hero: 'witch_doctor', name: 'Enemy 5', kda: '5/10/18', gpmxpm: '280 GPM / 320 XPM' },
            ]
        },
        {
            result: 'win',
            duration: '33:30',
            mode: 'All Pick',
            score: '40 - 25',
            ownerHero: 'axe',
            radiant: [
                { hero: 'axe', name: 'Player 1', kda: '12/4/10', gpmxpm: '400 GPM / 500 XPM' },
                { hero: 'juggernaut', name: 'Player 2', kda: '15/3/12', gpmxpm: '500 GPM / 600 XPM' },
                { hero: 'pudge', name: 'Player 3', kda: '5/10/8', gpmxpm: '350 GPM / 400 XPM' },
                { hero: 'crystal_maiden', name: 'Player 4', kda: '2/5/25', gpmxpm: '250 GPM / 300 XPM' },
                { hero: 'invoker', name: 'Player 5', kda: '10/8/15', gpmxpm: '450 GPM / 550 XPM' },
            ],
            dire: [
                { hero: 'lion', name: 'Enemy 1', kda: '4/7/22', gpmxpm: '300 GPM / 350 XPM' },
                { hero: 'lina', name: 'Enemy 2', kda: '8/9/5', gpmxpm: '420 GPM / 500 XPM' },
                { hero: 'witch_doctor', name: 'Enemy 3', kda: '7/2/18', gpmxpm: '280 GPM / 320 XPM' },
                { hero: 'phantom_assassin', name: 'Enemy 4', kda: '10/6/10', gpmxpm: '480 GPM / 580 XPM' },
                { hero: 'ogre_magi', name: 'Enemy 5', kda: '3/12/15', gpmxpm: '200 GPM / 250 XPM' },
            ]
        },
        {
            result: 'win',
            duration: '25:00',
            mode: 'Turbo',
            score: '60 - 30',
            ownerHero: 'lion',
            radiant: [
                { hero: 'lion', name: 'Player 1', kda: '4/7/22', gpmxpm: '300 GPM / 350 XPM' },
                { hero: 'juggernaut', name: 'Player 2', kda: '15/3/12', gpmxpm: '500 GPM / 600 XPM' },
                { hero: 'pudge', name: 'Player 3', kda: '5/10/8', gpmxpm: '350 GPM / 400 XPM' },
                { hero: 'crystal_maiden', name: 'Player 4', kda: '2/5/25', gpmxpm: '250 GPM / 300 XPM' },
                { hero: 'invoker', name: 'Player 5', kda: '10/8/15', gpmxpm: '450 GPM / 550 XPM' },
            ],
            dire: [
                { hero: 'axe', name: 'Enemy 1', kda: '12/4/10', gpmxpm: '400 GPM / 500 XPM' },
                { hero: 'lina', name: 'Enemy 2', kda: '8/9/5', gpmxpm: '420 GPM / 500 XPM' },
                { hero: 'witch_doctor', name: 'Enemy 3', kda: '7/2/18', gpmxpm: '280 GPM / 320 XPM' },
                { hero: 'phantom_assassin', name: 'Enemy 4', kda: '10/6/10', gpmxpm: '480 GPM / 580 XPM' },
                { hero: 'ogre_magi', name: 'Enemy 5', kda: '3/12/15', gpmxpm: '200 GPM / 250 XPM' },
            ]
        },
        {
            result: 'loss',
            duration: '39:50',
            mode: 'Ranked All Pick',
            score: '25 - 45',
            ownerHero: 'shadow_fiend',
            radiant: [
                { hero: 'shadow_fiend', name: 'Player 1', kda: '8/9/5', gpmxpm: '420 GPM / 500 XPM' },
                { hero: 'juggernaut', name: 'Player 2', kda: '15/3/12', gpmxpm: '500 GPM / 600 XPM' },
                { hero: 'pudge', name: 'Player 3', kda: '5/10/8', gpmxpm: '350 GPM / 400 XPM' },
                { hero: 'crystal_maiden', name: 'Player 4', kda: '2/5/25', gpmxpm: '250 GPM / 300 XPM' },
                { hero: 'invoker', name: 'Player 5', kda: '10/8/15', gpmxpm: '450 GPM / 550 XPM' },
            ],
            dire: [
                { hero: 'lion', name: 'Enemy 1', kda: '4/7/22', gpmxpm: '300 GPM / 350 XPM' },
                { hero: 'lina', name: 'Enemy 2', kda: '8/9/5', gpmxpm: '420 GPM / 500 XPM' },
                { hero: 'witch_doctor', name: 'Enemy 3', kda: '7/2/18', gpmxpm: '280 GPM / 320 XPM' },
                { hero: 'phantom_assassin', name: 'Enemy 4', kda: '10/6/10', gpmxpm: '480 GPM / 580 XPM' },
                { hero: 'ogre_magi', name: 'Enemy 5', kda: '3/12/15', gpmxpm: '200 GPM / 250 XPM' },
            ]
        },
        {
            result: 'win',
            duration: '31:17',
            mode: 'All Pick',
            score: '55 - 30',
            ownerHero: 'witch_doctor',
            radiant: [
                { hero: 'witch_doctor', name: 'Player 1', kda: '7/2/18', gpmxpm: '280 GPM / 320 XPM' },
                { hero: 'juggernaut', name: 'Player 2', kda: '15/3/12', gpmxpm: '500 GPM / 600 XPM' },
                { hero: 'pudge', name: 'Player 3', kda: '5/10/8', gpmxpm: '350 GPM / 400 XPM' },
                { hero: 'crystal_maiden', name: 'Player 4', kda: '2/5/25', gpmxpm: '250 GPM / 300 XPM' },
                { hero: 'invoker', name: 'Player 5', kda: '10/8/15', gpmxpm: '450 GPM / 550 XPM' },
            ],
            dire: [
                { hero: 'lion', name: 'Enemy 1', kda: '4/7/22', gpmxpm: '300 GPM / 350 XPM' },
                { hero: 'lina', name: 'Enemy 2', kda: '8/9/5', gpmxpm: '420 GPM / 500 XPM' },
                { hero: 'axe', name: 'Enemy 3', kda: '7/2/18', gpmxpm: '280 GPM / 320 XPM' },
                { hero: 'phantom_assassin', name: 'Enemy 4', kda: '10/6/10', gpmxpm: '480 GPM / 580 XPM' },
                { hero: 'ogre_magi', name: 'Enemy 5', kda: '3/12/15', gpmxpm: '200 GPM / 250 XPM' },
            ]
        }
    ];

    const recentMatchesList = document.querySelectorAll('.recent-matches ul li');
    const lastMatchResult = document.querySelector('.match-summary .match-header .match-result');
    const lastMatchDuration = document.querySelector('.match-summary .match-header .match-duration');
    const lastMatchMode = document.querySelector('.match-summary .match-header .game-mode-badge .game-mode');
    const lastMatchScore = document.querySelector('.match-summary .match-score');
    const radiantTeamContainer = document.querySelector('.match-summary .team.radiant');
    const direTeamContainer = document.querySelector('.match-summary .team.dire');

    function populateTeam(teamContainer, players, ownerHero) {
        const teamName = teamContainer.classList.contains('radiant') ? 'Radiant' : 'Dire';
        teamContainer.innerHTML = '<h3>' + teamName + '</h3>';
        
        // Define level indicators for each player (cycling through colors)
        const levelColors = ['level-blue', 'level-green', 'level-gold', 'level-orange'];
        let colorIndex = 0;
        
        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');
            console.log('Comparing player.hero:', player.hero, 'with ownerHero:', ownerHero);
            if (player.hero === ownerHero) {
                playerCard.classList.add('owner-player');
                console.log('Owner player highlighted:', player.name);
            }
            
            // Assign level indicator color
            const levelClass = player.hero === ownerHero ? 'level-gold' : levelColors[colorIndex % levelColors.length];
            colorIndex++;
            
            playerCard.innerHTML = `
                <div class="hero-avatar-wrapper">
                    <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${player.hero}.png" alt="${player.hero}" class="player-hero-image">
                    <div class="hero-level-indicator ${levelClass}"></div>
                </div>
                <div class="player-details">
                    <span class="player-name">${player.name}</span>
                    <span class="player-kda">${player.kda}</span>
                    <span class="player-gpm-xpm">${player.gpmxpm}</span>
                </div>
            `;
            teamContainer.appendChild(playerCard);
        });
    }

    function updateLastMatch(match) {
        lastMatchResult.textContent = match.result.toUpperCase();
        lastMatchResult.className = `match-result ${match.result}`; // Update class for win/loss color
        lastMatchDuration.textContent = match.duration;
        if (lastMatchMode) {
            lastMatchMode.textContent = match.mode.toUpperCase();
        }
        lastMatchScore.textContent = match.score;

        populateTeam(radiantTeamContainer, match.radiant, match.ownerHero);
        populateTeam(direTeamContainer, match.dire, match.ownerHero);
    }

    let currentSelectedMatchItem = null; // To keep track of the currently selected item

    // Set initial Last Match to the first match in matchData and select it visually
    if (matchData.length > 0) {
        updateLastMatch(matchData[0]);
        if (recentMatchesList[0]) {
            recentMatchesList[0].classList.add('selected-match');
            currentSelectedMatchItem = recentMatchesList[0];
        }
    }

    recentMatchesList.forEach(item => {
        item.addEventListener('click', function() {
            // Remove highlight from previously selected item
            if (currentSelectedMatchItem) {
                currentSelectedMatchItem.classList.remove('selected-match');
            }

            // Add highlight to the newly clicked item
            this.classList.add('selected-match');
            currentSelectedMatchItem = this;

            const matchId = parseInt(this.dataset.matchId);
            console.log('Clicked matchId:', matchId);
            const selectedMatch = matchData[matchId];
            console.log('Selected match data:', selectedMatch);
            if (selectedMatch) {
                updateLastMatch(selectedMatch);
            } else {
                console.error('No match data found for matchId:', matchId);
            }
        });
    });
});