
window.powers = {
    "support": {
        neighbor: {
            "all": true,
            "bonus": 1,
            "phase": "defense",
        },
        "receivesBonus": true,
    },
    "squire": {
        "squire": true,
    },
    "stonewall": {
        "neighbor":
        {
            "dice": 1,
            "phase": "defense",
            "self": true,
        },
    },
    "speedy": {
        "action": 1,
        "afterAttack": "move",
    },
    "melee": {
        "neighbor": {
            "bonus": 3,
            "neighborOnly": true,
            "self": true,
        },
    },
    "commander": {
        "bonusAction": 1,
    },
    "officer": {
        "maxSquireIncrement": 2
    },
    "artillery": {
        "unblocked": true,
        "afterAttack": "attack",
    },
};