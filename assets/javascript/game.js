$(document).ready(function () {

    let wicket = {
        name: "Wicket",
        picture: "<img src='assets/images/Wicket-small.png' />",
        attackPower: 8,
        counterAttackPower: 6,
        HP: 100
    };

    let weazel = {
        name: "Weazel",
        picture: "<img src='assets/images/Weazel-small.png' />",
        attackPower: 9,
        counterAttackPower: 5,
        HP: 90
    }

    let wodibin = {
        name: "Wodibin",
        picture: "<img src='assets/images/Wodibin-small.png' />",
        attackPower: 5,
        counterAttackPower: 8,
        HP: 150
    }

    let wollivan = {
        name: "Wollivan",
        picture: "<img src='assets/images/Wollivan-small.png' />",
        attackPower: 7,
        counterAttackPower: 7,
        HP: 130
    }

    let characters = [wicket, weazel, wodibin, wollivan];

    // Display character selection menu
    characters.forEach(function (element) {
        displayCharacterSelect(element);
    });

    // Upon clicking a character from character-select menu
    $(".character-option").on("click", function () {

        // This if statement stops from adding more characters to attacker menu
        // should probably be replaced with something better later
        if (this.getAttribute("class") === "character-option") {
            // Move character to 'Your Character' attacker menu section 
            $("#attacker-row").append($(this));
            $(this).attr("class", "attacker-option");

            // Move other characters to enemies menu to select an opponent
            $("#enemies-row").append($("#character-row").contents());

            // Replace character-option class with enemy-option class
            $('#enemies-row').children($('.character-option')).each(function () {
                $(this).attr("class", "enemy-option");
            });

            // Remove original character-select menu
            $("#character-menu").detach();
        }
    });

    // Upon clicking a character in the enemies available menu
    $(".enemy-option").on("click", function () {

        // This if statement should probably be replaced with something better later
        // if (this.getAttribute("class") === "enemy-option") {
        console.log("check!")
        // Move character to 'Defender' section 
        $("#defender-row").append($(this));
        $(this).attr("class", "defender-option");
        // }
    });

    function displayCharacterSelect(character) {
        let newDiv = $("<div>");
        let newDivPic = $("<div>");
        let newDivStats = $("<div>");

        newDiv.attr("class", "character-option");
        newDiv.append(character.name);

        newDivPic.attr("class", "character-pic");
        newDivPic.append(character.picture);
        newDiv.append(newDivPic);

        newDivStats.attr("class", "character-stats");
        newDivStats.append("Attack Power: " + character.attackPower + "<br>");
        newDivStats.append("HP: " + character.HP);
        newDiv.append(newDivStats);

        $("#character-row").append(newDiv)
    }
});