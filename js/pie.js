Chart.defaults.global.tooltips.custom = function(tooltip) {
    // Tooltip Element
    const $hoverDiv = $('#pie-hover')

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        $hoverDiv.css('opacity', 0)
        return
    }

    // Set Text
    if (tooltip.body) {
        let innerHtml = '<tbody>'

        tooltip.body.map(x => x.lines).forEach(function(body) {

            // Get image filename
            let item = body[0]
            item = item.substring(0, item.lastIndexOf(' ') - 1)
            let image = item.replace(/ /g, '_') + '.png'

            innerHtml += '<tr><td>' + '<img src="https://rerollcdn.com/GENSHIN/' + (items[item].isCharacter ? 'Characters' : 'Weapon/NEW')
                + '/' + image + '" onerror="this.onerror=null; this.src=\'./assets/' + image + '\'">' + '<p>' + body + '%</p></td></tr>'
        })
        innerHtml += '</tbody>'

        $('#pie-hover table').html(innerHtml)
    }

    $hoverDiv.css({
        'opacity': 1,
        'left': this._chart.canvas.offsetLeft + tooltip.caretX + 'px',
        'top': this._chart.canvas.offsetTop + tooltip.caretY + 'px',
        'font-family': tooltip._bodyFontFamily,
        'font-size': tooltip.bodyFontSize,
        'font-style': tooltip._bodyFontStyle,
        'padding': tooltip.yPadding + 'px ' + tooltip.xPadding + 'px'
    })
}

let config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [10, 10, 10, 10, 10, 50],
            backgroundColor: [
                '#ff5555',
                '#95fffa',
                '#50abff',
                '#c179ff',
                '#75ffaf',
                '#000000'
            ],
        }],
        labels: [
            'Diluc',
            'Qiqi',
            'Mona',
            'Keqing',
            'Jean',
            'Promotional Character'
        ]
    },
    options: {
        responsive: true,
        legend: {
            display: false
        },
        tooltips: {
            enabled: false,
        }
    }
}