$(document).ready(function () {

    let wicket = {
        name: "Wicket",
        picture: "<img src='assets/images/Wicket-small.png' />",
        attackPower: 6,
        counterAttackPower: 7,
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
        attackPower: 2,
        counterAttackPower: 10,
        HP: 140
    }

    let wollivan = {
        name: "Wollivan",
        picture: "<img src='assets/images/Wollivan-small.png' />",
        attackPower: 3,
        counterAttackPower: 9,
        HP: 120
    }

    let characters = [wicket, weazel, wodibin, wollivan];
    let numAttacks = 0;
    let defenderSelected = false;

    let restartBtn = $("<button>");
    restartBtn.text("Restart");
    restartBtn.attr("id", "restartBtn");

    let startGame = function initGame() {

        // Display character selection menu
        characters.forEach(function (element) {
            displayCharacterSelect(element);
        });
        $("#character-menu").prepend("<p>Select a character:</p>")

        // Hide fight-section and defender menu until attacker and defender are selected
        $("#fight-section").hide();
        $("#defender-menu").hide();
    };

    startGame();

    // Upon clicking a character 
    $(".character-option").on("click", function () {

        // If character clicked is from character-select menu
        if ($(this).parent().attr("id") === "character-row") {

            //Display various menu headings
            $("#attacker-menu").prepend("<p>Your character:</p>")
            $("#enemies-menu").prepend("<p>Select an opponent:</p>")

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
            $("#character-menu").empty();
        }

        // If character clicked is from enemy-select menu (and an enemy hasn't already been selected)
        else if ($(this).parent().attr("id") === "enemies-row" && !defenderSelected) {
            defenderSelected = true;

            // Move character to 'Defender' section 
            $("#defender-row").empty();
            // $("#defender-menu").prepend("Defender: <br>");
            $("#defender-row").append($(this));

            // Clear old fight message
            $("#fight-message").empty();

            // // Add character-option class with defender-option class
            $(this).attr("class", "defender-option");

            // Hide enemies-menu temporarily
            $("#enemies-menu").hide();

            // Show fight-section and defender menu again
            $("#fight-section").show();
            $("#defender-menu").show();
        }
    });

    // Upon clicking attack button
    $("#attackBtn").on("click", function () {
        if (defenderSelected) {
            // Calculate damage variables
            let defender = $(".defender-option");
            numAttacks++;
            let attackerHP = parseInt($(".attacker-option").attr("HP"));
            let defenderHP = parseInt(defender.attr("HP"));
            let currentAttack = parseInt($(".attacker-option").attr("attackPower")) * numAttacks;
            let counterAttack = parseInt(defender.attr("counterAttackPower"));
            attackerHP = attackerHP - counterAttack;
            defenderHP = defenderHP - currentAttack;

            // Update fight message
            $("#fight-message").html("You dealt " + currentAttack + " damage to " + defender.attr("name") + ". <br>" + defender.attr("name") + " dealt you " + counterAttack + " damage.");

            // Update character stats for attacker and defender
            $(".attacker-option").attr("HP", attackerHP);
            defender.attr("HP", defenderHP);
            $(".attacker-option").find($(".character-stats")).empty();
            $(".attacker-option").find($(".character-stats")).append("Attack Power: " + currentAttack + "<br>");
            $(".attacker-option").find($(".character-stats")).append("HP: " + attackerHP);
            defender.find($(".character-stats")).empty();
            defender.find($(".character-stats")).append("Counter Power: " + counterAttack + "<br>");
            defender.find($(".character-stats")).append("HP: " + defenderHP);

            // Upon player death
            if (attackerHP <= 0) {
                // Create Restart button 
                $("#restart").append(restartBtn);

                // Display losing message
                $("#fight-message").text("You've been defeated! Hit restart to redeem yourself.")
            }
            // Upon opponent death
            else if (defenderHP <= 0) {
                //Remove opponent
                defender.detach();
                defenderSelected = false;

                // Hide defender menu
                $("#defender-menu").hide();

                // If enemies remain
                if ($('.enemies-option').length !== 0) {
                // Hide fight-section until new opponent is selected
                $("#fight-section").hide();

                    // Show enemies menu again
                    $("#enemies-menu").show();
                    $("#fight-message").text("You defeated " + defender.attr("name") + "!")
                }
                else {
                    // Create Restart button
                    $("#restart").append(restartBtn);
                    $("#restart").html("<button id='restartBtn'>Restart</button>");

                    // Hide attack button
                    $("#attackBtn").hide();

                    // Display winning message
                    $("#fight-message").text("All opponents defeated! Warwick Davis would be proud.")
                    
                }
            }
        }
        else {
            $("#fight-message").empty();
            $("#defender-row").text("<p>No opponent selected.</p>")
        }
    });

    // Upon clicking restart button
    $("#restart").on("click", restartBtn, function () {
        document.location.reload(true);
    });

    function displayCharacterSelect(character) {
        let newDiv = $("<div>");
        let newDivPic = $("<div>");
        let newDivStats = $("<aside>");

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