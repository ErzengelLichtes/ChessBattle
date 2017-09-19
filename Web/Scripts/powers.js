(function() {
    var powersArr = [
        {
            name: "support",
            neighbor: {
                "all": true,
                "bonus": 1,
                "phase": "defense",
            },
            "receivesBonus": true,
        },
        {
            name: "squire",
            "squire": true,
        },
        {
            name: "stonewall",
            "neighbor":
            {
                "dice": 1,
                "phase": "defense",
                "self": true,
            },
        },
        {
            name: "speedy",
            "action": 1,
            "afterAttack": "move",
        },
        {
            name: "melee",
            "neighbor": {
                "bonus": 3,
                "neighborOnly": true,
                "self": true,
            },
        },
        {
            name: "commander",
            "bonusAction": 1,
        },
        {
            name: "officer",
            "maxSquireIncrement": 2
        },
        {
            name: "artillery",
            "unblocked": true,
            "afterAttack": "attack",
        },
    ];
    window.powers = {};
    powersArr.forEach(function(x) {
        window.powers[x.name] = x;
    });
})();