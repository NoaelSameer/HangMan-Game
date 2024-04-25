$(document).ready(function(){
    //Array of words for the game
const words = ["Superhero", "Avengers", "Villain", "Comic", "Web", "Marvel", "Hero", "Universe", "Power", "Infinity", "Secret", "Weapon", "Shield", "Gamma", "Mutant", "Origin", "Cosmic", "Vibranium", "Asgard"];


    //Choose random word using index
    var chosenWord = words[Math.floor(Math.random()*words.length)]
    var guessedLetters= []
    var remainingGuesses = 6

    // Display underscores for each letter of the chose word
    for(var i=0;i< chosenWord.length;i++){
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }

    //Function to update the display of the guessed letters
    function updateGuesses(){
        $('#guess-container').empty()
        $('#guess-container').text(guessedLetters.join(', '))
    }

    //Function to check if the guess letter is in the chosen word
    function checkGuess(letter) {
        if (chosenWord.indexOf(letter) === -1) {
            remainingGuesses--;
            $('#remaining-guesses').text(remainingGuesses);
            console.log("Incorrect guess. Remaining guesses:", remainingGuesses);
            $("body").css("background-color", "#922724");
            $("body").css("color", "#00308F");
        } else {
            // Reveal the guessed letter
            $('.hidden-letter').each(function (index) {
                if (chosenWord[index] === letter) {
                    $(this).text(letter.toUpperCase());
                    $("body").css("background-color", "#00308F");
                    $("body").css("color", "#922724");
                }
            });
        }
        updateGuesses();
        checkGameStatus();
    }
    

    //function to check if the game has been won or lost
    function checkGameStatus(){
        if($('.hidden-letter:contains("_")').length ===0){
            alert('Congratulations You Won')
            resetGame()
        }else if(remainingGuesses === 0){
            alert("You suck the word was: " + chosenWord)
            resetGame()
        }
    }

    //Function to reset the game
    function resetGame(){
        guessedLetters = []
        remainingGuesses = 6
        $('#remaining-guesses').text(remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random() * words.length)];
        for(var i=0;i< chosenWord.length;i++){
            $('#word-container').append('<div class="hidden-letter">_</div>')
        }
        updateGuesses()
    }

    //Event handler for key presses
    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase()
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter.toUpperCase())
            checkGuess(letter)
        }
    })

    //Event handler for the reset button
    $('#reset-button').click(function(){
        resetGame()
    })

    // Initial display of remaining guesses
    $('#remaining-guesses').text(remainingGuesses);

})