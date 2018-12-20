$(document).ready(function initGame () {

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
    let numAttacks = 0;
    let defenderSelected = false;

    // Display character selection menu
    characters.forEach(function (element) {
        displayCharacterSelect(element);
    });

    // Upon clicking a character from character-select menu
    $(".character-option").on("click", function () {

        // This if statement stops from adding more characters to attacker menu
        // should probably be replaced with something better later
        if ($(this).parent().attr("id") === "character-row") {


            //Display various menu headings
            $("#attacker-menu").prepend("Your character:")
            $("#enemies-menu").prepend("Enemies to attack:")
            

            // Move character to 'Your Character' attacker menu section 
            $("#attacker-row").append($(this));
            $(this).attr("class", "attacker-option");

            // Move other characters to enemies menu to select an opponent
            $("#enemies-row").append($("#character-row").contents());

            // Add character-option class with enemies-option class
            $('#enemies-row').children($('.character-option')).each(function () {
                $(this).attr("class", "enemies-option");

                // Remove attack power stat from displaying
                $(this).find($(".character-stats")).empty();
                $(this).find($(".character-stats")).append("Counter Power: " + $(this).attr("counterAttackPower") + "<br>");
                $(this).find($(".character-stats")).append("HP: " + $(this).attr("HP"));
            });

            // Remove original character-select menu
            $("#character-menu").detach();
        }
        else if ($(this).parent().attr("id") === "enemies-row" && !defenderSelected) {
            defenderSelected = true;

            // Move character to 'Defender' section 
            $("#defender-row").empty();
            $("#defender-row").append($(this));

            // // Add character-option class with defender-option class
            $(this).attr("class", "defender-option");
        }
    });

    $("#attackBtn").on("click", function () {
        if (defenderSelected) {
            numAttacks++;
            let attackerHP = parseInt($(".attacker-option").attr("HP"));
            let defenderHP = parseInt($(".defender-option").attr("HP"));
            let currentAttack = parseInt($(".attacker-option").attr("attackPower")) * numAttacks;
            let counterAttack = parseInt($(".defender-option").attr("counterAttackPower"));
            attackerHP = attackerHP - counterAttack;
            defenderHP = defenderHP - currentAttack;
            $(".attacker-option").attr("HP", attackerHP);
            $(".defender-option").attr("HP", defenderHP);
            $(".attacker-option").find($(".character-stats")).empty();
            $(".attacker-option").find($(".character-stats")).append("Attack Power: " + currentAttack + "<br>");
            $(".attacker-option").find($(".character-stats")).append("HP: " + attackerHP);
            $(".defender-option").find($(".character-stats")).empty();
            $(".defender-option").find($(".character-stats")).append("Counter Power: " + counterAttack + "<br>");
            $(".defender-option").find($(".character-stats")).append("HP: " + defenderHP);

            if (attackerHP <= 0) {
                // Create Restart button, display losing message
                $("#defender-row").text("You've been defeated! Hit restart to redeem yourself.")

            } else if (defenderHP <= 0) {
                $(".defender-option").detach();
                defenderSelected = false;
                if ($('.enemies-option').length !== 0 ) {
                    $("#defender-row").text("Opponent defeated! Select another defender.")
                } 
                else {
                    //Create Restart button, display winning message
                    $("#defender-row").text("All opponents defeated! Warwick Davis would be proud.")
                }
            }
        }
        else {
            $("#defender-row").text("No opponent selected.")
        }
    });

    function displayCharacterSelect(character) {
        let newDiv = $("<div>");
        let newDivPic = $("<div>");
        let newDivStats = $("<div>");

        newDiv.attr("class", "character-option");
        newDiv.attr("name", character.name);
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