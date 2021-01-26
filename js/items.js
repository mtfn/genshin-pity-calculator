// Item pool + background colors for pie chart

const items = {
    "Amos' Bow": {
        "color": "#c9c3d9",
        "isCharacter": false
    },

    "Aquila Favonia": {
        "color": "#d7e2dd",
        "isCharacter": false
    },

    "Diluc": {
        "color": "#ff5555",
        "isCharacter": true
    },

    "Ganyu": {
        "color": "#000000",
        "isCharacter": true
    },

    "Jean": {
        "color": "#324651",
        "isCharacter": true
    },

    "Keqing": {
        "color": "#9e93aa",
        "isCharacter": true
    },

    "Lost Prayer to the Sacred Winds": {
        "color": "#9db3be",
        "isCharacter": false
    },

    "Mona": {
        "color": "#423247",
        "isCharacter": true
    },

    "Primordial Jade Winged-Spear": {
        "color": "#4f503a",
        "isCharacter": false
    },

    "Qiqi": {
        "color": "#201b3f",
        "isCharacter": true
    },

    "Skyward Atlas": {
        "color": "#d9dbd6",
        "isCharacter": false
    },

    "Skyward Blade": {
        "color": "#eddac7",
        "isCharacter": false
    },

    "Skyward Harp": {
        "color": "#d7e2dd",
        "isCharacter": false
    },

    "Skyward Pride": {
        "color": "#4bd7de",
        "isCharacter": false
    },

    "Skyward Spine": {
        "color": "#e8d3c0",
        "isCharacter": false
    },
    
    "Wolf's Gravestone": {
        "color": "#2e211f",
        "isCharacter": false
    }
}

// List of item names
const itemNames = Object.keys(items)

// Grab colors from array of item names
function getColors(arr) {
    return arr.map(x => items[x].color)
}