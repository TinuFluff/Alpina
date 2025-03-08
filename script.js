// Fetch Discord User Data
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${userId}`);
        if (!response.ok) throw new Error(`Failed to fetch data for user: ${userId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

// Nation Data
const nations = [
    {
        banner: 'flags/imperial_germany.png',
        name: 'Deutsches Reich',
        leader: 'TinuFluff',
        description: 'Germany is tired of being classified as no longer being one of the world’s superpowers. Join today to reform the German Empire!',
        discordId: ['1096151908718223470', '708751281241718838'],
        discordServer: 'https://discord.gg/8MXGBZYEwR'
    },
    {
        banner: 'flags/overwatchers.png',
        name: 'Overwatchers',
        leader: 'Mongoose',
        description: 'Nation made from explorers who traveled to the end and made a nation there.',
        discordId: ['861944867842949130'],
        discordServer: null
    },
    {
        banner: 'flags/poland.png',
        name: 'Rzeczpospolita Polska',
        leader: 'TSHA',
        description: 'Poland, a beautiful nation with rich history, culture and great people. Many have tried to conquer and assimilate our lands, but we never gave up our fight for freedom. Now we stand stronger than ever, ready to reclaim the lands of the commonwealth and unify the people of eastern Europe.',
        discordId: ['873926139729575947', '1073134044000305182'],
        discordServer: null
    },
    {
        banner: 'flags/decepticon.png',
        name: 'Decepticon Imperium',
        leader: 'Lord Megatron',
        description: 'The Decepticons are a faction of Cybertronians who formed on their homeworld, Cybertron.',
        discordId: ['1246274226135105588', '1251959531563389130', '1279173407996641301', '1119601380525604985','747081582073872507'],
        discordServer: 'https://discord.gg/uypu6crByG'
    },
    {
        banner: 'flags/australia.png',
        name: 'Australia',
        leader: 'Days',
        description: 'A Commonwealth built with industrial and cutting edge technological advancements',
        discordId: ['259858084896309249', '1012654522964914246', '640046510075019265', '421477383711752204', '290984902873317376', '883018138004897874'],
        discordServer: 'https://discord.gg/ur6N86xn8r'
    },
    {
        banner: 'flags/aa.png',
        name: 'The Acolytes of Atomation',
        leader: 'Days',
        description: 'The AA is an merchant nation insitant on autamating the strangest things',
        discordId: ['872881518085820447', '1119341033784877096', '792106655823036447'],
        discordServer: 'https://discord.gg/cXaP3N6YW3'
    },
    {
        banner: 'flags/latveria.png',
        name: 'Latveria',
        leader: 'Mr. Raisin',
        description: 'A land of advancements.',
        discordId: ['520792070470893588'],
        discordServer: 'https://discord.gg/FuQeTYSX'
    },
    {
        banner: 'flags/enclave.png',
        name: 'The Enclave',
        leader: 'Vamp',
        description: 'remnants of the pre-War United States government, they believe themselves the rightful inheritors of America. Obsessed with purity and technology, they seek to "cleanse" the wasteland of mutation, often with extreme prejudice',
        discordId: ['500506841936035841'],
        discordServer: null
    },
    {
        banner: 'flags/italy.png',
        name: 'Italy',
        leader: 'Ace',
        description: 'Sophisticated and welcoming nation',
        discordId: ['492940817661689856', '766917874249105449'],
        discordServer: null
    }
];

const nationContainer = document.getElementById('nation-container');

// Render Nations
async function renderNations() {
    for (const nation of nations) {
        const nationElement = document.createElement('div');
        nationElement.className = 'nation';

        nationElement.innerHTML = `
            <img src="${nation.banner}" alt="${nation.name} Banner">
            <div class="nation-info">
                <h2>${nation.name}</h2>
                <p><strong>Leader:</strong> ${nation.leader}</p>
                <p>${nation.description}</p>
                <div class="discord-info"></div>
                <div class="discord-action"></div>
            </div>
        `;

        const discordInfoContainer = nationElement.querySelector('.discord-info');
        const discordActionContainer = nationElement.querySelector('.discord-action');

        // Fetch multiple Discord profiles
        const profilePromises = nation.discordId.map(fetchUserData);
        const profiles = await Promise.all(profilePromises);

        profiles.forEach((userData) => {
            if (userData) {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `
                    <img src="${userData.avatar?.link || 'flags/placeholder.png'}" alt="Profile Picture">
                    <p>${userData.username}</p>
                `;
                discordInfoContainer.appendChild(userDiv);
            }
        });

        // Add Discord join option
        if (nation.discordServer) {
            const discordBtn = document.createElement('a');
            discordBtn.href = nation.discordServer;
            discordBtn.target = "_blank";
            discordBtn.className = "discord-btn";
            discordBtn.textContent = "Join Discord";
            discordActionContainer.appendChild(discordBtn);
        } else {
            discordActionContainer.innerHTML = `<p class="dm-message">DM Leader to Join</p>`;
        }

        nationContainer.appendChild(nationElement);
    }
}

// Initialize
renderNations();
