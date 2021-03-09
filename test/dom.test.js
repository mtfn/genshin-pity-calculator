const $ = require('cash-dom')
const { togglePity } = require('../src/utils')

test('Toggle soft/hard pity with 0 pity', () => {

    // Arrange
    const softPityHtml = `
        <span id="tohardpity">90</span>
        <span id="tosoftpity">76</span>
        <span id="primogems">12,160</span>
        <a id="pitytype">soft</a>
        <span id="commissions">203</span>
        <span id="welkinmoon">82</span>
    `
    const hardPityHtml = `
        <span id="tohardpity">90</span>
        <span id="tosoftpity">76</span>
        <span id="primogems">14,400</span>
        <a id="pitytype">hard</a>
        <span id="commissions">240</span>
        <span id="welkinmoon">96</span>
    `
    document.body.innerHTML = softPityHtml
    
    $('#pitytype').on('click', togglePity)
    const clickMe = document.getElementById('pitytype')

    // Toggle once
    clickMe.click()
    expect(document.body.innerHTML).toBe(hardPityHtml)
    
    // And back again
    clickMe.click()
    expect(document.body.innerHTML).toBe(softPityHtml)
})