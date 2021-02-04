// Right now:
const promoCharacter = 'Xiao'
const promoWeapons = ['Primordial Jade Winged-Spear', 'Primordial Jade Cutter']
const urls = {
    'character event wish': 'https://genshin-impact.fandom.com/wiki/Invitation_to_Mundane_Life',
    'weapon event wish': 'https://genshin-impact.fandom.com/wiki/Epitome_Invocation/2021-02-03',
    'permanent wish': 'https://genshin-impact.fandom.com/wiki/Wanderlust_Invocation'
}

// Set default region
const utcOffset = new Date().getTimezoneOffset() * -60
document.getElementById('region').value = [-18000, 3600, 28800].reduce((a, b) => {
    return Math.abs(b - utcOffset) < Math.abs(a - utcOffset) ? b : a
}).toString()

// Return weapon banners by start time and promotional banner
function getWeaponBanners(offset) {
    offset = parseInt(offset)
    return [
        {
            start: 1601251200,
            promo: ['amos\' bow', 'aquila favonia']
        },
        {
            start: 1603216800,
            promo: ['lost prayer to the sacred winds', 'wolf\'s gravestone']
        },
        {
            start: 1605052800 + offset,
            promo: ['skyward harp', 'memory of dust']
        },
        {
            start: 1606845600,
            promo: ['vortex vanquisher', 'the unforged']
        },
        {
            start: 1608681600 + offset,
            promo: ['skyward atlas', 'summit shaper']
        },
        {
            start: 1610474400,
            promo: ['amos\' bow', 'skyward pride']
        },
        {
            start: 1612310400 + offset,
            promo: ['primordial jade winged-spear', 'primordial jade cutter']
        }
    ]
}

// Character event banner
function characterBanner(guarantee) {

    // 100% to get promo character
    if(guarantee) {
        return {
            datasets: [{
                data: [100],
                backgroundColor: getColors([promoCharacter])
            }],
            labels: [promoCharacter]
        }

    // 50% to get promo character
    } else {

        let eventPool = ['Diluc', 'Jean', 'Keqing', 'Mona', 'Qiqi']
        eventPool.push(promoCharacter)

        return {
            datasets: [{
                data: [10, 10, 10, 10, 10, 50],
                backgroundColor: getColors(eventPool)
            }],
            labels: eventPool
        }
    }
}

// Weapon event banner
function weaponBanner(guarantee) {

    // 100% chance to get promo weapon
    if(guarantee) {
        return {
            datasets: [{
                data: [50, 50],
                backgroundColor: getColors(promoWeapons)
            }],
            labels: promoWeapons
        }

    // 75% chance to get promo weapon
    } else {

        let weapons = itemNames.filter(x => !items[x].isCharacter)
        let backgroundColors = getColors(weapons)

        // Rearrange weapon pool based on promo weapons (cut promo weapons out of the array and stick them at the end)
        promoWeapons.forEach(x => {
            const index = weapons.indexOf(x)
            if(index > -1) {
                weapons.splice(index, 1)
                backgroundColors.splice(index, 1)
            }
        })
        weapons = weapons.concat(promoWeapons)
        backgroundColors = backgroundColors.concat(getColors(promoWeapons))

        return {
            datasets: [{
                data: [25/9, 25/9, 25/9, 25/9, 25/9, 25/9, 25/9, 25/9, 25/9, 37.5, 37.5],
                backgroundColor: backgroundColors
            }],
            labels: weapons
        }
    }
}

// Permanent banner (hardcoding it for now)
const permanentPool = [
    'Amos\' Bow',
    'Aquila Favonia',
    'Lost Prayer to the Sacred Winds',
    'Primordial Jade Winged-Spear',
    'Skyward Atlas',
    'Skyward Blade',
    'Skyward Harp',
    'Skyward Pride',
    'Skyward Spine',
    'Wolf\'s Gravestone',
    'Diluc',
    'Jean',
    'Keqing',
    'Mona',
    'Qiqi'
]

const permanentBanner = {
    datasets: [{
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10],
        backgroundColor: getColors(permanentPool)
    }],
    labels: permanentPool
}
