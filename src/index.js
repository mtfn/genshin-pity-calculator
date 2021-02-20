import $ from 'cash-dom'
import Chart from 'chart.js'
import { togglePity } from './utils'
import main from './script'
import { tooltip } from './pie'

const utcOffset = new Date().getTimezoneOffset() * -60
$('#region').val(
    [-18000, 3600, 28800].reduce((a, b) => {
        return Math.abs(b - utcOffset) < Math.abs(a - utcOffset) ? b : a
    }).toString()
)

Chart.defaults.global.tooltips.custom = tooltip
$('#submit').on('click', main)
$('#pitytype').on('click', togglePity)
