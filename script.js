document.addEventListener('DOMContentLoaded', () => {
    const miniBox = document.getElementById('miniBox');
    const filterIcons = document.querySelectorAll('.filter-icon');
    const selectedElixir = new Set();
    let selectedClass = null;

    const createCharacterElement = (character) => {
        const characterLink = document.createElement('a');
        characterLink.href = `character.html?name=${encodeURIComponent(character.name)}`;
        characterLink.classList.add('character');
        characterLink.setAttribute('data-pattern', `url('img/patterns/${character.name}_pattern.png')`);

        characterLink.innerHTML = `
            <img src="${character.img}" class="mini" alt="${character.name} Image">
            <div class="elixir">
                <img src="${character.elixir}" alt="${character.elixir} Elixir">
            </div>
            <div class="class">
                ${character.classes.map(classImgSrc => `
                    <img src="${classImgSrc}" alt="${classImgSrc.split('/').pop().split('.')[0]} Class">
                `).join('')}
            </div>
            <div class="miniName">${character.name}</div>`;

        return characterLink;
    };

    const applyFilters = () => {
        const characters = document.querySelectorAll('.character');
        characters.forEach(character => {
            const elixirMatch = selectedElixir.size === 0 || selectedElixir.has(character.querySelector('.elixir img').src.split('/').pop().split('.')[0]);
            const classMatch = !selectedClass || Array.from(character.querySelectorAll('.class img')).some(img => img.src.includes(selectedClass));
            character.style.display = elixirMatch && classMatch ? '' : 'none';
        });
    };

    fetch('characters.json')
        .then(response => response.json())
        .then(data => {
            const characterArray = Object.values(data);
            characterArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            
            const newestCharacter = characterArray[0];
            const patternImage = `url('img/patterns/${newestCharacter.name}_pattern.png')`;
            document.body.style.setProperty('--dynamic-pattern', patternImage);
            document.body.classList.add('dynamic-pattern');

            characterArray.forEach(character => {
                const characterElement = createCharacterElement(character);
                miniBox.appendChild(characterElement);
            });

            miniBox.addEventListener('mouseover', (event) => {
                const characterElement = event.target.closest('.character');
                if (characterElement) {
                    const pattern = characterElement.getAttribute('data-pattern');
                    document.body.style.setProperty('--dynamic-pattern', pattern);
                }
            });

            miniBox.addEventListener('mouseout', () => {
                document.body.style.setProperty('--dynamic-pattern', patternImage);
            });
        })
        .catch(error => {
            console.error('Error loading characters:', error);
            miniBox.innerHTML = "<h2>Error Loading Characters</h2>";
        });

    filterIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const filterType = icon.closest('.filter-icons').id;
            const filterValue = icon.dataset.filter;

            if (filterType === 'elixir-filters') {
                selectedElixir.has(filterValue) ? selectedElixir.delete(filterValue) : selectedElixir.add(filterValue);
            } else if (filterType === 'class-filters') {
                selectedClass = selectedClass === filterValue ? null : filterValue;
            } else {
                selectedElixir.clear();
                selectedClass = null;
            }

            filterIcons.forEach(f => {
                if (f.closest('.filter-icons').id === 'class-filters') {
                    f.classList.toggle('selected', f.dataset.filter === selectedClass);
                } else {
                    f.classList.toggle('selected', selectedElixir.has(f.dataset.filter));
                }
            });

            applyFilters();
        });
    });
});