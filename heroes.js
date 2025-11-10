document.addEventListener('DOMContentLoaded', () => {
    const heroesGrid = document.getElementById('heroes-grid');
    const attributeFilters = document.querySelector('.attribute-filters');
    const roleFilter = document.getElementById('role-filter');
    const searchFilter = document.getElementById('search-filter');

    console.log('DOM elements:', { heroesGrid, attributeFilters, roleFilter, searchFilter });

    let allHeroesData = [];
    const universalHeroes = [
        "Abaddon", "Bane", "Batrider", "Beastmaster", "Brewmaster", "Broodmother", "Chen", 
        "Clockwerk", "Dark Seer", "Dark Willow", "Dazzle", "Enigma", "Invoker", "Io", 
        "Lone Druid", "Lycan", "Magnus", "Marci", "Mirana", "Nature's Prophet", "Nyx Assassin", 
        "Pangolier", "Phoenix", "Sand King", "Snapfire", "Spectre", "Techies", "Timbersaw", 
        "Vengeful Spirit", "Venomancer", "Visage", "Void Spirit", "Windranger", "Winter Wyvern"
    ];

    fetch('https://api.opendota.com/api/heroStats')
        .then(response => {
            console.log('Fetch response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(heroes => {
            console.log('Hero data fetched successfully:', heroes);
            allHeroesData = heroes;

            try {
                populateRoleFilter(heroes);
                console.log('Role filter populated.');
            } catch (e) {
                console.error('Error populating role filter:', e);
            }

            try {
                displayHeroes(heroes);
                console.log('Heroes displayed.');
            } catch (e) {
                console.error('Error displaying heroes:', e);
            }
            
            setupEventListeners();
            console.log('Event listeners set up.');
        })
        .catch(error => {
            console.error('Error fetching hero data:', error);
            if (heroesGrid) {
                heroesGrid.textContent = 'Failed to load hero data. Please try again later.';
            }
        });

    function populateRoleFilter(heroes) {
        if (!roleFilter) {
            console.error('roleFilter element not found.');
            return;
        }
        const roles = new Set();
        heroes.forEach(hero => {
            if (hero.roles && Array.isArray(hero.roles)) {
                hero.roles.forEach(role => roles.add(role));
            } else {
                console.warn('Hero object missing or malformed roles array:', hero);
            }
        });
        console.log('Unique roles found:', Array.from(roles));
        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role;
            roleFilter.appendChild(option);
            console.log('Added role option:', role);
        });
    }

    function displayHeroes(heroes) {
        if (!heroesGrid) {
            console.error('heroesGrid element not found.');
            return;
        }
        heroesGrid.innerHTML = ''; // Clear existing heroes
        console.log('Clearing heroes grid. Number of heroes to display:', heroes.length);
        heroes.forEach(hero => {
            if (!hero.localized_name || !hero.img || !hero.id || !hero.primary_attr || !hero.roles) {
                console.warn('Skipping malformed hero data:', hero);
                return;
            }
            const heroCard = document.createElement('div');
            heroCard.classList.add('hero-card');
            heroCard.dataset.id = hero.id;
            heroCard.dataset.name = hero.localized_name.toLowerCase();
            heroCard.dataset.primary_attr = universalHeroes.includes(hero.localized_name) ? 'universal' : hero.primary_attr;
            heroCard.dataset.roles = hero.roles.join(',');

            const heroImg = document.createElement('img');
            heroImg.src = `https://cdn.cloudflare.steamstatic.com${hero.img}`;
            heroImg.alt = hero.localized_name;
            heroImg.onerror = () => console.error('Failed to load image for hero:', hero.localized_name, heroImg.src);

            const heroName = document.createElement('div');
            heroName.classList.add('hero-name');
            heroName.textContent = hero.localized_name;

            heroCard.appendChild(heroImg);
            heroCard.appendChild(heroName);
            heroesGrid.appendChild(heroCard);
            console.log('Appended hero card for:', hero.localized_name);
        });
    }

    function setupEventListeners() {
        if (!attributeFilters) {
            console.error('attributeFilters element not found.');
            return;
        }
        attributeFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const activeFilter = attributeFilters.querySelector('.active');
                if (activeFilter) {
                    activeFilter.classList.remove('active');
                }
                e.target.classList.add('active');
                filterHeroes();
            }
        });

        if (roleFilter) {
            roleFilter.addEventListener('change', filterHeroes);
        } else {
            console.error('roleFilter element not found for event listener.');
        }
        
        if (searchFilter) {
            searchFilter.addEventListener('input', filterHeroes);
        } else {
            console.error('searchFilter element not found for event listener.');
        }
    }

    function filterHeroes() {
        const selectedAttribute = attributeFilters.querySelector('.active')?.dataset.attribute || 'all';
        const selectedRole = roleFilter?.value || 'all';
        const searchTerm = searchFilter?.value.toLowerCase() || '';

        console.log('Filtering heroes with:', { selectedAttribute, selectedRole, searchTerm });

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