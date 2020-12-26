// Right now:
const promoCharacter = 'Albedo'
const promoWeapons = ['Skyward Atlas', 'Summit Shaper']

const offset = new Date().getTimezoneOffset() * -1
const serverOffset = [-300, 60, 480].reduce((a, b) => {
    return Math.abs(b - offset) < Math.abs(a - offset) ? b : a;
}) * 60

const weaponBanners = [
    {
        start: 1601251200,
        promo: ['amos\' bow', 'aquila favonia']
    },
    {
        start: 1603216800,
        promo: ['lost prayer to the sacred winds', 'wolf\'s gravestone']
    },
    {
        start: 1605052800 + serverOffset,
        promo: ['skyward harp', 'memory of dust']
    },
    {
        start: 1606845600,
        promo: ['vortex vanquisher', 'the unforged']
    },
    {
        start: 1608681600 + serverOffset,
        promo: ['skyward atlas', 'summit shaper']
    }
]