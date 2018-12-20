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
        if ($(this).parent().attr("id") === "character-row") {
            // Move character to 'Your Character' attacker menu section 
            $("#attacker-row").append($(this));
            $(this).attr("class", "attacker-option");

            // Move other characters to enemies menu to select an opponent
            $("#enemies-row").append($("#character-row").contents());

            // Add character-option class with enemies-option class
            $('#enemies-row').children($('.character-option')).each(function () {
                $(this).attr("class", "character-option enemies-option");
            });

            // Remove original character-select menu
            $("#character-menu").detach();
        }
        else if ($(this).parent().attr("id") === "enemies-row") {
            console.log("check!")
            // Move character to 'Defender' section 
            $("#defender-row").append($(this));

            // // Add character-option class with defender-option class
            $(this).attr("class", "character-option defender-option");
        }
    });

    function displayCharacterSelect(character) {
        let newDiv = $("<div>");
        let newDivPic = $("<div>");
        let newDivStats = $("<div>");

        newDiv.attr("class", "character-option");
        newDiv.attr("attackPower", character.attackPower);
        newDiv.attr("counterAttackPower", character.counterAttackPower);
        newDiv.attr("HP", character.HP);
        newDiv.append(character.name);

        newDivPic.attr("class", "character-pic");
        newDivPic.append(character.picture);
        newDiv.append(newDivPic);

        newDivStats.attr("class", "character-stats");
        newDivStats.append("Attack Power: " + newDiv.attr("attackPower") + "<br>");
        newDivStats.append("HP: " + newDiv.attr("HP"));
        newDiv.append(newDivStats);

        $("#character-row").append(newDiv)
    }
});