document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const characterName = urlParams.get('name');
    const characterSection = document.getElementById('character-section');
    const upgradeInfoDiv = document.getElementById('upgradeinfo');

    fetch('characters.json')
        .then(response => response.json())
        .then(data => {
            const character = data[characterName];
            if (character) {
                document.title = character.name;

                if (characterName) {
                    document.documentElement.style.setProperty('--dynamic-pattern', `url('img/patterns/${characterName}_pattern.png')`);
                }

                characterSection.innerHTML = `
                    <img src="img/charactersEmpty/${characterName}.png" id="characterimg">
                    <div id="mainInfo">
                        <div id="characterName">
                            <h1>${character.name}</h1>
                            <div id="faststats">
                                <img src="${character.elixir}">
                                ${character.classes.map(classImg => `<img src="${classImg}">`).join('')}
                                <p id="range">${character.range}</p>
                            </div>
                        </div>
                        <div id="description">${character.description}</div>
                        <div id="statsinfo">
                            <div>
                                <img src="img/HealthInfo.png" class="stats">
                                <span id="healthtext">${character.health.base}</span>
                                ${character.health.upgrade ? `<span class="upgradeable">${character.health.upgrade}</span>` : ''} 
                            </div>
                            <div>
                                <img src="img/AttackInfo.png" class="stats">
                                <span id="attacktext">${character.attack.base}</span>
                            </div>
                            <div>
                                <img src="img/AtkSpeedInfo.png" class="stats">
                                <span id="AtkSpeedtext">${character.speed.base}</span>
                                ${character.speed.upgrade ? `<span class="upgradeable" id="atkspeedupgradeable">${character.speed.upgrade}</span>` : ''} 
                            </div>
                            ${character.ultimate ? `
                                <div>
                                    <img src="img/UltiInfo.png" class="stats">
                                    <span id="ultitext">${character.ultimate.cost}</span>
                                </div>
                            ` : ''}
                        </div>
                        ${character.clash ? `
                            <div class="specialAbility">
                                <img src="img/generic.png">
                                <div class="special">CLASH:</div>
                                <span class="specialAbilityText">${character.clash}</span>
                            </div>
                        ` : ''}
                        ${character.ultimate ? `
                            <div class="specialAbility">
                                <img src="img/Ulti.png">
                                <span id="UltiText">${character.ultimate.description}</span> 
                            </div>
                        ` : ''}
                        ${character.passive ? `
                            <div class="specialAbility">
                                <img src="img/generic.png">
                                <div class="special">PASSIVE:</div>
                                <span class="specialAbilityText">${character.passive}</span> 
                            </div>
                        ` : ''}
                    </div>
                `;

                character.upgrades.forEach(upgradeText => {
                    const upgradeDiv = document.createElement('div');
                    upgradeDiv.innerHTML = `<span>${upgradeText}</span>`;
                    upgradeInfoDiv.appendChild(upgradeDiv);
                });

                for (let i = 1; i <= 6; i++) {
                    const slide = document.getElementById(`slide${i}`);
                    slide.style.backgroundImage = `url('${character.poses[i - 1]}')`;
                }
            } else {
                characterSection.innerHTML = "<h1>Character Not Found</h1>";
            }
        })
        .catch(error => {
            console.error('Error loading character data:', error);
            characterSection.innerHTML = "<h1>Error Loading Character</h1>";
        });
});