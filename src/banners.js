const items = require('./data/items.json')
const history = require('./data/history.json')

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
 * Determine whether the next 5-star will be guaranteed a promotional item
 * @param {string} itemName Table row containing 5-star name
 * @param {number} datePulled Date item pulled in UNIX time
 * @param {string} bannerName 'character event wish', 'weapon event wish', or 'permanent wish'
 * @param {number} utcOffset Offset from UTC (-18000 for NA, 3600 for EU, 28800 for CN)
 * 
 * @returns {boolean} Whether the next item is guaranteed to be a promotional item
 */
function isGuaranteed(itemName, datePulled, bannerName, utcOffset) {

    const banner = history[bannerName]
    if(banner === undefined) {
        return false
    }

    // Apply UTC offset where necessary
    const startTimes = banner.map((x, i) => {
        if(i % 2 === 0) {
            return x.start + utcOffset
        } else {
            return x.start
        }
    })

    const thenRatedUp = banner[startTimes.indexOf(
        startTimes.reduce((acc, cur) => datePulled >= cur ? cur : acc)
    )].promo

    return !thenRatedUp.some(element => itemName.includes(element))
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

module.exports = { promo, wikiPages, isCharacter, isGuaranteed, characterBanner, weaponBanner, permanentBanner }
