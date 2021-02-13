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
        document.getElementById(val).innerHTML = this[val].toLocaleString('en-US')
    }
}

/**
 * Set base rate for next single pull
 * @param {number} rate Number 0-1
 */
function setBaseRate(rate) {
    const baseRate = rate.toLocaleString('en-US', {style: 'percent', maximumFractionDigits: 3})
    document.getElementById('baserate').innerHTML = baseRate
    document.querySelector('#bar > div').style.width = baseRate
}

/**
 * Show pity calculation
 * @param {boolean} error Whether or not there was an error
 */
function showResults(error) {
    document.getElementById('error').style.display = error ? 'block' : 'none'
    document.getElementById('banner').style.display = error ? 'none' : 'block'
    document.getElementById('results').style.display = error ? 'none' : 'flex'
    document.getElementById('status').style.display = error ? 'none' : 'block'
}

/**
 * Toggle between primogem counts for hard and soft pity
 */
function togglePity() {
    const pityType = document.getElementById('pitytype')

    // soft -> hard, hard -> soft
    const newPityType = ['soft', 'hard'][Math.max(0,
        ['hard', 'soft'].indexOf(pityType.innerHTML)
    )]

    const primos = 160 * parseInt(document.getElementById((
        'to' + newPityType + 'pity'
    )).innerHTML)

    document.getElementById('primogems').innerHTML = primos.toLocaleString('en-US')
    document.getElementById('commissions').innerHTML = Math.ceil(primos / 60).toString()
    document.getElementById('welkinmoon').innerHTML = Math.ceil(primos / 150).toString()

    pityType.innerHTML = newPityType
}
