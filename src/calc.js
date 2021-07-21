const history = require('./data/history.json')

function Calculation (pasteData, dateOffset) {
    this.dateOffset = dateOffset || new Date().getTimezoneOffset() * -60 // Used in determining guarantee
    
    this.dataArray = pasteData.toLowerCase().split(/[\r\n]+/g) // Pasted input as array, useful for calculations
    this.fiveStarPos = this.dataArray.findIndex(x => x.includes('5-star'))
}

/**
 * Pity calculation based on P = (r-1) + 6(p-1)
 * @returns {number} Wishes since last 5-star
 */
Calculation.prototype.getPity = function() {

    if(this.pity !== undefined) {
        return this.pity
    }

    const fiveStarFound = this.fiveStarPos >= 0

    /* Row in which 5-star appears (0-5)
     Not every element of dataArray is relevant to calculation so we chop them off */
    const tableRow = Math.floor(((
        fiveStarFound ? this.fiveStarPos : this.dataArray.length
    ) - 5) / 3)

    // (Number at bottom of screen) - 1
    const pageNumber = parseInt(this.dataArray[this.dataArray.length - 1]) - 1 || 0

    this.pity = tableRow + pageNumber * 6
    return this.pity
}

/**
 * Get banner type
 * @returns {string} 'character event wish', 'weapon event wish', 'permanent wish'
 */
Calculation.prototype.getBanner = function() {

    if(this.bannerType !== undefined) {
        return this.bannerType
    }

    let banner = this.dataArray[1].trim()

    if(banner !== 'character event wish' && banner !== 'weapon event wish') {
        this.bannerType = 'permanent wish'
    } else {
        this.bannerType = banner
    }

    return this.bannerType
}

/**
 * @returns {boolean} Whether next 5-star is guaranteed to be a rate-up item
 */
Calculation.prototype.isGuaranteed = function() {

    if(this.guarantee !== undefined) {
        return this.guarantee
    }

    // Determine date item was pulled, throw error if invalid
    const datePulled = new Date(
        this.dataArray[this.fiveStarPos + 1].trim() + '+0000'
    ).getTime() / 1000

    if(isNaN(datePulled)) {
        return false
    }

    // Pull data from relevant banner type
    const bannerHistory = history[this.getBanner()]
    if(bannerHistory === undefined) {
        return false
    }

    // Apply UTC offset where necessary
    const startTimes = bannerHistory.map((x, i) => {
        if(i % 2 === 0) {
            return x.start + this.dateOffset
        } else {
            return x.start
        }
    })

    // Find rated up item(s) at time datePulled
    const thenRatedUp = bannerHistory[startTimes.indexOf(
        startTimes.reduce((acc, cur) => datePulled >= cur ? cur : acc)
    )].promo

    // True if pulled item does not match rated up item
    this.guarantee = !thenRatedUp.some(element => 
        this.dataArray[this.fiveStarPos].includes(element)
    )
    return this.guarantee
}

module.exports = Calculation
