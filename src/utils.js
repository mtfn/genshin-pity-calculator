/**
 * Numerical values
 * @param {number} pity Pulls since last 5-star
 * @param {string} banner Banner type
 */
function Values(pity, banner) {
    this.pity = pity
    this.hardpity = banner === 'weapon event wish' ? 80 : 90

    this.tohardpity = this.hardpity - this.pity
    this.tosoftpity = Math.max(this.hardpity - 14 - this.pity, 0)

    this.pitytype = 'soft'
    this.primogems = 160 * this.tosoftpity
    this.commissions = Math.ceil(this.primogems / 60)
    this.welkinmoon = Math.ceil(this.primogems / 150)

    for(let val in this) {
        $('#' + val).html(this[val].toLocaleString('en-US'))
    }
}

/**
 * Set base rate for next single pull
 * @param {number} rate Number 0-1
 */
function setBaseRate(rate) {
    const baseRate = rate.toLocaleString('en-US', {style: 'percent', maximumFractionDigits: 3})
    $('#baserate').html(baseRate)
    $('#bar > div').css('width', baseRate)
}

/**
 * Show pity calculation
 * @param {boolean} error Whether or not there was an error
 */
function showResults(error) {
    $('#error').css('display', error ? 'block' : 'none')
    $('#banner, #status').css('display', error ? 'none' : 'block')
    $('#results').css('display', error ? 'none' : 'flex')
}

/**
 * Toggle between primogem counts for hard and soft pity
 */
function togglePity() {

    // soft -> hard, hard -> soft
    const newPityType = ['soft', 'hard'][Math.max(0,
        ['hard', 'soft'].indexOf($('#pitytype').html())
    )]

    // Primogems needed to hit hard or soft pity
    const primos = 160 * parseInt($('#to' + newPityType + 'pity').html())

    // Display on page
    $('#primogems').html(primos.toLocaleString('en-US'))
    $('#commissions').html(Math.ceil(primos / 60).toString())
    $('#welkinmoon').html(Math.ceil(primos / 150).toString())
    $('#pitytype').html(newPityType)
}
