
document.addEventListener('DOMContentLoaded', () => {
    const miniBox = document.getElementById('miniBox');
    const filterIcons = document.querySelectorAll('.filter-icon');
    let selectedElixir = new Set();
    let selectedClass = null;

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
                const characterLink = document.createElement('a');
                characterLink.href = `character.html?name=${encodeURIComponent(character.name)}`;
                characterLink.classList.add('character');
                characterLink.setAttribute('data-pattern', `url('img/patterns/${character.name}_pattern.png')`);

                const img = document.createElement('img');
                img.src = character.img;
                img.classList.add('mini');
                img.alt = `${character.name} Image`;
                characterLink.appendChild(img);

                const elixirDiv = document.createElement('div');
                elixirDiv.classList.add('elixir');
                const elixirImg = document.createElement('img');
                elixirImg.src = character.elixir;
                elixirImg.alt = `${character.elixir} Elixir`;
                elixirDiv.appendChild(elixirImg);
                characterLink.appendChild(elixirDiv);

                const classesDiv = document.createElement('div');
                classesDiv.classList.add('class');
                character.classes.forEach(classImgSrc => {
                    const classImg = document.createElement('img');
                    classImg.src = classImgSrc;
                    classImg.alt = `${classImgSrc.split('/').pop().split('.')[0]} Class`;
                    classesDiv.appendChild(classImg);
                });
                characterLink.appendChild(classesDiv);

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('miniName');
                nameDiv.textContent = character.name;
                characterLink.appendChild(nameDiv);

                miniBox.appendChild(characterLink);
            });

            miniBox.addEventListener('mouseover', (event) => {
                const characterElement = event.target.closest('.character');
                if (characterElement) {
                    const pattern = characterElement.getAttribute('data-pattern');
                    document.body.style.setProperty('--dynamic-pattern', pattern);
                }
            });

            miniBox.addEventListener('mouseout', (event) => {
                const characterElement = event.target.closest('.character');
                if (characterElement) {
                    document.body.style.setProperty('--dynamic-pattern', patternImage);
                }
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
                if (selectedElixir.has(filterValue)) {
                    selectedElixir.delete(filterValue);
                } else {
                    selectedElixir.add(filterValue);
                }
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

    function applyFilters() {
        const characters = document.querySelectorAll('.character');
        characters.forEach(character => {
            const elixirMatch = selectedElixir.size === 0 || selectedElixir.has(character.querySelector('.elixir img').src.split('/').pop().split('.')[0]);
            const classMatch = selectedClass === null || Array.from(character.querySelectorAll('.class img')).some(img => img.src.split('/').pop().split('.')[0] === selectedClass);
            character.style.display = elixirMatch && classMatch ? '' : 'none';
        });
    }
});