const $ = require('cash-dom')
const Chart = require('chart.js')
const { Values, setBaseRate, showResults, togglePity } = require('./utils')
const { promo, wikiPages, isGuaranteed, characterBanner, weaponBanner, permanentBanner } = require('./banners')
const { config } = require('./pie')

function run(input) {

    // Lowercase -> Array, split line by line
    const data = input.toLowerCase().split(/[\r\n]+/g)

    // Identify banner (default to permanent banner)
    data[1] = data[1].trim()
    let banner = 'permanent wish'
    if(['character event wish', 'weapon event wish'].includes(data[1])) {
        banner = data[1]
    }

    // Help for pity detecting and guarantee
    let tableRow = Math.floor((data.length - 5) / 3)
    let promoGuarantee = false

    // Index in data of first 5-star was found in (might be -1 if there isn't one)
    const fiveStarPos = data.findIndex(x => x.includes('5-star'))
    if(fiveStarPos >= 0) {

        // Position in table (0-5)
        tableRow = Math.floor((fiveStarPos - 5) / 3)

        promoGuarantee = isGuaranteed(
            data[fiveStarPos], // Table row
            new Date(data[fiveStarPos + 1].trim() + '+0000').getTime() / 1000, // Date pulled (UNIX time)
            banner, // Banner type
            parseInt($('#region').val) // Region offset (server time)
        )
    }

    // Calculate pity based on position in table & page number
    const values = new Values(tableRow + (parseInt(data[data.length - 1]) - 1 || 0) * 6, banner)
    for(let id in values) {
        $('#' + id).html(values[id].toLocaleString('en-US'))
    }

    // Hard pity
    if(values.pity >= values.hardpity - 1) {
        setBaseRate(1)
        $('#left p:nth-of-type(3)').html('You\'re a pull away from hard pity, so your next pull will be a 5-star.')
        togglePity()
    
    // Soft pity
    } else if(values.tosoftpity <= 1) {
        setBaseRate(0.324)
        $('#left p:nth-of-type(3)').html('You\'re hitting soft pity! Keep making single pulls until you get your 5-star.')
        togglePity()

    // Weapon banner, no pity
    } else if(banner === 'weapon event wish') {
        setBaseRate(0.007)
        $('#left p:nth-of-type(3)').html('The weapon banner base rate is usually 0.7% during pulls 1-65, 32.4% during pulls 66-79, and 100% at pull 80.')

    // Character or permanent banner, no pity
    } else {
        setBaseRate(0.006)
        $('#left p:nth-of-type(3)').html('The base rate is usually 0.6% during pulls 1-75, 32.4% during pulls 76-89, and 100% at pull 90.')
    }

    // Little notice
    $('#promonotice').html('Assuming that you will pull your next 5-star during this banner.<br>If you\'re planning for future banners, imagine the promotional ')

    // Pie chart go brrrrr (also tell user about rate-up guarantee etc)
    switch(banner) {

        case 'character event wish':
            $('#promonotice').append('character in ' + promo.character + '\'s place.<br><br>Hover for details!')
            $('#guarantee').html('Your next 5-star in this banner has a <b>' + (promoGuarantee ? '100%' : '50%') + '</b> chance to be the rate-up character.')
            config.data = characterBanner(promoGuarantee)
            break

        case 'weapon event wish':
            $('#promonotice').append('weapons in place of ' + promo.weapons[0] + ' and ' + promo.weapons[1] + '.<br><br>Hover for details!')
            $('#guarantee').html('Your next 5-star in this banner has a <b>' + (promoGuarantee ? '100%' : '75%') + ' </b> chance to be a rate-up weapon.')
            config.data = weaponBanner(promoGuarantee)
            break

        default:
            $('#guarantee').html('Your next 5-star could be any of the ones in this banner\'s item pool.')
            $('#promonotice').html('Hover for details!')
            config.data = permanentBanner
    }

    // Voila
    $('#banner').html('Banner: <a href="https://genshin-impact.fandom.com/wiki/' + wikiPages[banner] + '" target="_blank">' + banner + '</a>')
    showResults(false)

    // Oh yeah, create the chart if it doesn't exist
    if(window.pieChart === undefined) {
        window.pieChart = new Chart($('canvas')[0].getContext('2d'), config)
    }
    window.pieChart.update()
}

module.exports = function() {
    
    try {
        run($('#input').val())
    } catch(error) {

        // Show error message, hide other stuff
        showResults(true)
    }
}
