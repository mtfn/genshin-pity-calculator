// I'm new to unit testing, maybe you have better ideas?
const { Values } = require('../src/utils')

test('63 pity on character banner', () => {
    expect(new Values(63, 'character event wish'))
        .toEqual({
            pity: 63,
            hardpity: 90,
            tohardpity: 27,
            tosoftpity: 13,
            pitytype: 'soft',
            primogems: 2080,
            commissions: 35,
            welkinmoon: 14
        })
})

test('63 pity on weapon banner', () => {
    expect(new Values(63, 'weapon event wish'))
        .toEqual({
            pity: 63,
            hardpity: 80,
            tohardpity: 17,
            tosoftpity: 3,
            pitytype: 'soft',
            primogems: 480,
            commissions: 8,
            welkinmoon: 4
        })
})

test('76 pity on character banner', () => {
    expect(new Values(76, 'character event wish'))
        .toEqual({
            pity: 76,
            hardpity: 90,
            tohardpity: 14,
            tosoftpity: 0,
            pitytype: 'soft',
            primogems: 0,
            commissions: 0,
            welkinmoon: 0
        })
})

test('76 pity on weapon banner', () => {
    expect(new Values(76, 'weapon event wish'))
        .toEqual({
            pity: 76,
            hardpity: 80,
            tohardpity: 4,
            tosoftpity: 0,
            pitytype: 'soft',
            primogems: 0,
            commissions: 0,
            welkinmoon: 0
        })
})
