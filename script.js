document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    const roleSelectionWindow = document.getElementById('role-selection-window');
    const findMatchButton = document.querySelector('.find-match-button');
    const roles = document.querySelectorAll('.role');

    const settingsButton = document.getElementById('settings-button');
    const settingsWindow = document.getElementById('settings-window');
    const closeSettingsButton = document.querySelector('.close-settings-button');

    playButton.addEventListener('click', (e) => {
        e.preventDefault();
        roleSelectionWindow.style.display = 'flex';
    });

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
});
