// Right now:
const promoCharacter = 'Keqing'
const promoWeapons = ['Wolf\'s Gravestone', 'Staff of Homa']
const urls = {
    'character event wish': 'https://genshin-impact.fandom.com/wiki/Dance_of_Lanterns',
    'weapon event wish': 'https://genshin-impact.fandom.com/wiki/Epitome_Invocation/2021-02-23',
    'permanent wish': 'https://genshin-impact.fandom.com/wiki/Wanderlust_Invocation'
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

    let banner = []
    switch(bannerName) {
        case 'character event wish':
            banner = [
                {start: 1601251200, promo: ['venti']},
                {start: 1603216800, promo: ['klee']},
                {start: 1605052800 + utcOffset, promo: ['tartaglia']},
                {start: 1606845600, promo: ['zhongli']},
                {start: 1608681600 + utcOffset, promo: ['albedo']},
                {start: 1610474400, promo: ['ganyu']},
                {start: 1612310400 + utcOffset, promo: ['xiao']},
                {start: 1613584800, promo: ['keqing']}
            ]
        break
        case 'weapon event wish': 
            banner = [
                {start: 1601251200, promo: ['amos\' bow', 'aquila favonia']},
                {start: 1603216800, promo: ['lost prayer to the sacred winds', 'wolf\'s gravestone']},
                {start: 1605052800 + utcOffset, promo: ['skyward harp', 'memory of dust']},
                {start: 1606845600, promo: ['vortex vanquisher', 'the unforged']},
                {start: 1608681600 + utcOffset, promo: ['skyward atlas', 'summit shaper']},
                {start: 1610474400, promo: ['amos\' bow', 'skyward pride']},
                {start: 1612310400 + utcOffset, promo: ['primordial jade winged-spear', 'primordial jade cutter']},
                {start: 1614103200, promo: ['wolf\'s gravestone', 'staff of homa']}
            ]
        break
        default:
            return false
    }
   
    const startTimes = banner.map(x => x.start)

    // Which item(s) were rated up during datePulled
    const promoItems = banner[startTimes.indexOf(
        startTimes.reduce((acc, cur) => datePulled >= cur ? cur : acc)
    )].promo

    return !promoItems.some(element => itemName.includes(element))
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
                backgroundColor: getColors([promoCharacter])
            }],
            labels: [promoCharacter]
        }

    // 50% to get promo character
    } else {

        let eventPool = ['Diluc', 'Jean', 'Mona', 'Qiqi']
        eventPool.push(promoCharacter)

        return {
            datasets: [{
                data: [12.5, 12.5, 12.5, 12.5, 50],
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

        let numNotRatedUp = permanentPool.filter(x => !promoWeapons.includes(x) && !items[x].isCharacter).length
        return {
            datasets: [{
                data: (new Array(numNotRatedUp).fill(25/numNotRatedUp)).concat([37.5, 37.5]),
                backgroundColor: backgroundColors
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
