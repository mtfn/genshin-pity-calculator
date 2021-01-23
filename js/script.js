// Set the % of rolling a 5*
function setBaseRate(rate) {
    document.getElementById('baserate').innerHTML = rate
    document.querySelector('#bar > div').style.width = rate
}

function run(input) {

    const data = input.toLowerCase().split(/[\r\n]+/g)
    data[1] = data[1].trim()

    let banner = 'permanent wish'
    if(['character event wish', 'weapon event wish'].includes(data[1])) {
        banner = data[1]
    }

    const hardPity = banner === 'weapon event wish' ? 80 : 90

    let fiveStarIndex = Math.floor((data.length - 5) / 3)
    let promoGuarantee = false

    for(let x of data) {

        // Found a 5-star?
        if(x.includes('5-star')) {

            // Position in table (0-5)
            fiveStarIndex = Math.floor((data.indexOf(x) - 5) / 3)

            // Return whether Jean, Qiqi, Keqing, Mona, or Diluc was rolled on the promo banner
            if(banner === 'character event wish') {
                promoGuarantee = ['jean', 'qiqi', 'keqing', 'mona', 'diluc'].some(element => x.includes(element))
            
            // This is a bit trickier
            } else if(banner === 'weapon event wish') {

                // Get when the user rolled the item, in UNIX time
                const dateRolled = new Date(data[data.indexOf(x) + 1].trim() + '+0000').getTime() / 1000
                
                // Find the right promotional weapon from the right time and check it against what was rolled
                const weaponBanners = getWeaponBanners(document.getElementById('region').value)
    
                for(let i in weaponBanners) {
        
                    let bannerEnd
                    try {
                        bannerEnd = weaponBanners[parseInt(i)+1].start
                    } catch(error) {
                        bannerEnd = Date.now() / 1000
                    }

                    if(!isNaN(dateRolled) && weaponBanners[i].start <= dateRolled && dateRolled < bannerEnd) {
                        promoGuarantee = !weaponBanners[i].promo.some(element => x.includes(element))
                        break
                    }
                }

            }

            // Quit, should there be 2 5-stars within 6 rolls of each other (I'm jealous)
            break
        }
    }

    // Calculate pity based on index in table and page number
    const pageNumber = parseInt(data[data.length - 1])
    if(isNaN(pageNumber)) {
        pageNumber = 1
    }
    const pity = 6 * (pageNumber - 1) + fiveStarIndex

    document.getElementById('pity').innerHTML = pity.toString()
    document.getElementById('tohardpity').innerHTML = (hardPity - pity).toString()
    document.getElementById('hardpity').innerHTML = hardPity.toString()
    document.getElementById('softpity').innerHTML = (hardPity - 14).toString()

    let toSoftPity = Math.max(hardPity - 14 - pity, 0)

    document.getElementById('tosoftpity').innerHTML = toSoftPity.toString()

    let primos = toSoftPity * 160
    document.querySelector('#primos > span').innerHTML = primos.toLocaleString()
    document.getElementById('commissions').innerHTML = Math.ceil(primos / 60).toString()
    document.getElementById('welkinmoon').innerHTML = Math.ceil(primos / 150).toString()

    // Set base rates for the user's next single pull
    if(toSoftPity === 0) {
        setBaseRate('32.4%')

    } else if(banner === 'weapon event wish') {
        setBaseRate('0.7%')
        document.querySelector('#left p:nth-of-type(3)').innerHTML = 'The base rate is usually 0.7% during pulls 1-65, 32.4% during pulls 66-79, and 100% at pull 80.'

    } else {
        setBaseRate('0.6%')
        document.querySelector('#left p:nth-of-type(3)').innerHTML = 'The base rate is usually 0.6% during pulls 1-75, 32.4% during pulls 76-89, and 100% at pull 90.'
    }

    // Little notice
    document.getElementById('promonotice').innerHTML = 'Assuming that you will pull your next 5-star during this banner.<br>If you\'re planning for future banners, imagine the promotional '

    // Pie chart go brrrrr
    if(banner === 'character event wish') {
        document.getElementById('promonotice').innerHTML += 'character in ' + promoCharacter + '\'s place.<br><br>'
        document.getElementById('guarantee').innerHTML = 'Your next 5-star in this banner has a <b>' + (promoGuarantee ? '100%' : '50%') + '</b> chance to be the rate-up character.'
        config.data = characterBanner(promoGuarantee)

    } else if(banner === 'weapon event wish') {
        document.getElementById('promonotice').innerHTML += 'weapons in place of ' + promoWeapons[0] + ' and ' + promoWeapons[1] + '.<br><br>'
        document.getElementById('guarantee').innerHTML = 'Your next 5-star in this banner has a <b>' + (promoGuarantee ? '100%' : '75%') + ' </b> chance to be a rate-up weapon.'
        config.data = weaponBanner(promoGuarantee)
        
    } else if(banner === 'permanent wish') {
        document.getElementById('guarantee').innerHTML = 'Your next 5-star could be any of the ones in this banner\'s item pool.'
        document.getElementById('promonotice').innerHTML = ''
        config.data = permanentBanner
    }

    document.getElementById('promonotice').innerHTML += 'Hover for details!'

    // Voila
    document.getElementById('banner').style.display = 'block'
    document.querySelector('#banner').innerHTML = 'Banner: <a href="' + urls[banner] + '" target="_blank">' + banner + '</a>'
    document.getElementById('results').style.display = 'flex'
    document.getElementById('status').style.display = 'block'

    // Oh yeah, create the chart if it doesn't exist
    if(window.pieChart === undefined) {
        window.pieChart = new Chart(document.getElementsByTagName('canvas')[0].getContext('2d'), config)
    }
    window.pieChart.update()

    // We're good, hide error message
    document.getElementById('error').style.display = 'none'
}

function main(input) {
    
    try {
        run(input)
    } catch(error) {

        // Show error message, hide other stuff
        document.getElementById('error').style.display = 'block'
        document.getElementById('banner').style.display = 'none'
        document.getElementById('results').style.display = 'none'
        document.getElementById('status').style.display = 'none'
    }
}

window.onresize = function() {
    if(document.getElementById('status').style.display === 'block') {
        document.getElementsByTagName('footer')[0].style.position = 'static'
    }
}