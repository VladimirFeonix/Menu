document.addEventListener('DOMContentLoaded', () => {
    const heroesGrid = document.getElementById('heroes-grid');
    const attributeFilters = document.querySelector('.attribute-filters');
    const roleFilter = document.getElementById('role-filter');
    const searchFilter = document.getElementById('search-filter');

    let allHeroesData = [];
    const universalHeroes = [
        "Abaddon", "Bane", "Batrider", "Beastmaster", "Brewmaster", "Broodmother", "Chen", 
        "Clockwerk", "Dark Seer", "Dark Willow", "Dazzle", "Enigma", "Invoker", "Io", 
        "Lone Druid", "Lycan", "Magnus", "Marci", "Mirana", "Nature's Prophet", "Nyx Assassin", 
        "Pangolier", "Phoenix", "Sand King", "Snapfire", "Spectre", "Techies", "Timbersaw", 
        "Vengeful Spirit", "Venomancer", "Visage", "Void Spirit", "Windranger", "Winter Wyvern"
    ];

    fetch('https://api.opendota.com/api/heroStats')
        .then(response => response.json())
        .then(heroes => {
            allHeroesData = heroes;
            populateRoleFilter(heroes);
            displayHeroes(heroes);
            setupEventListeners();
        })
        .catch(error => {
            console.error('Error fetching hero data:', error);
            heroesGrid.textContent = 'Failed to load hero data. Please try again later.';
        });

    function populateRoleFilter(heroes) {
        const roles = new Set();
        heroes.forEach(hero => {
            hero.roles.forEach(role => roles.add(role));
        });
        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role;
            roleFilter.appendChild(option);
        });
    }

    function displayHeroes(heroes) {
        heroesGrid.innerHTML = ''; // Clear existing heroes
        heroes.forEach(hero => {
            const heroCard = document.createElement('div');
            heroCard.classList.add('hero-card');
            heroCard.dataset.id = hero.id;
            heroCard.dataset.name = hero.localized_name.toLowerCase();
            heroCard.dataset.primary_attr = universalHeroes.includes(hero.localized_name) ? 'universal' : hero.primary_attr;
            heroCard.dataset.roles = hero.roles.join(',');

            const heroImg = document.createElement('img');
            heroImg.src = `https://cdn.cloudflare.steamstatic.com${hero.img}`;
            heroImg.alt = hero.localized_name;

            const heroName = document.createElement('div');
            heroName.classList.add('hero-name');
            heroName.textContent = hero.localized_name;

            heroCard.appendChild(heroImg);
            heroCard.appendChild(heroName);
            heroesGrid.appendChild(heroCard);
        });
    }

    function setupEventListeners() {
        attributeFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                attributeFilters.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                filterHeroes();
            }
        });

        roleFilter.addEventListener('change', filterHeroes);
        searchFilter.addEventListener('input', filterHeroes);
    }

    function filterHeroes() {
        const selectedAttribute = attributeFilters.querySelector('.active').dataset.attribute;
        const selectedRole = roleFilter.value;
        const searchTerm = searchFilter.value.toLowerCase();

        document.querySelectorAll('.hero-card').forEach(card => {
            const cardAttribute = card.dataset.primary_attr;
            const cardRoles = card.dataset.roles.split(',');
            const cardName = card.dataset.name;

            const attributeMatch = selectedAttribute === 'all' || cardAttribute === selectedAttribute;
            const roleMatch = selectedRole === 'all' || cardRoles.includes(selectedRole);
            const searchMatch = cardName.includes(searchTerm);

            if (attributeMatch && roleMatch && searchMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
});