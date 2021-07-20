const items = require('./data/items.json')

// Right now:
const promo = {
    character: 'Kazuha',
    weapons: ['Skyward Atlas', 'Freedom-Sworn']
}
const wikiPages = {
    'character event wish': 'Leaves_in_the_Wind/2021-06-29',
    'weapon event wish': 'Epitome Invocation/2021-06-29',
    'permanent wish': 'Wanderlust_Invocation'
}

// Grab colors from array of item names
function getColors(arr) {
    const allColors = {...items.characters, ...items.weapons}
    const returnColors = arr.map(x => allColors[x])

    if(returnColors.includes(undefined)) {
        throw new Error('Invalid item name')
    }
    
    return returnColors
}

function isCharacter(itemName) {
    const isACharacter = items.characters.hasOwnProperty(itemName)

    if(!isACharacter && !items.weapons.hasOwnProperty(itemName)) {
        throw new Error('Invalid item name')
    }

    return isACharacter
}

/**
 * Character event banner
 * @param {boolean} guarantee Whether the next 5-star is guaranteed to be a rate-up
 */
function characterBanner(guarantee) {

    // 100% to get promo character
    if(guarantee) {
        return {
            datasets: [{
                data: [100],
                backgroundColor: getColors([promo.character])
            }],
            labels: [promo.character]
        }

    // 50% to get promo character
    } else {

        let eventPool = ['Diluc', 'Jean', 'Keqing', 'Mona', 'Qiqi']
        eventPool.push(promo.character)

        return {
            datasets: [{
                data: [10, 10, 10, 10, 10, 50],
                backgroundColor: getColors(eventPool)
            }],
            labels: eventPool
        }
    }
}

// Permanent banner items (Will help for weapon banner)
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

/**
 * Weapon event banner
 * @param {boolean} guarantee Whether the next 5-star is guaranteed to be a rate-up
 */
function weaponBanner(guarantee) {

    // 100% chance to get promo weapon
    if(guarantee) {
        return {
            datasets: [{
                data: [50, 50],
                backgroundColor: getColors(promo.weapons)
            }],
            labels: promo.weapons
        }

    // 75% chance to get promo weapon
    } else {

        let weapons = Object.keys(items.weapons)

        // Cut promo weapons out of array and stick them at the end
        promo.weapons.forEach(x => {
            const index = weapons.indexOf(x)
            if(index > -1) {
                weapons.splice(index, 1)
            }
        })
        weapons = weapons.concat(promo.weapons)

        const numNotRatedUp = permanentPool.filter(x => !promo.weapons.includes(x) && !isCharacter(x)).length
        return {
            datasets: [{
                data: (new Array(numNotRatedUp).fill(25/numNotRatedUp)).concat([37.5, 37.5]),
                backgroundColor: getColors(weapons)
            }],
            labels: weapons
        }
    }
}

// Permanent banner
const permanentBanner = {
    datasets: [{
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10],
        backgroundColor: getColors(permanentPool)
    }],
    labels: permanentPool
}

module.exports = { promo, wikiPages, isCharacter, characterBanner, weaponBanner, permanentBanner }
