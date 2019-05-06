// JavaScript File
/*global $*/
/*global localStorage*/

$("#submit").click(function() {
    localStorage.setItem("isClicked", true);
    var input_genre = $("#fav_genre").val();
    var input_era = $("#fav_era").val();
    var input_artist = $("#fav_artist").val();
    var input_quote = $("#quote").val();
    
    var starting_quiz_answers = {
        favorite_genre: input_genre,
        favorite_era: input_era,
        favorite_artist: input_artist,
        user_quote: input_quote,
    };
    
    var user_object_string= JSON.stringify(starting_quiz_answers);
    
    localStorage.setItem("stored_answers", user_object_string);
    
check_if_quiz_clicked();
});

function access_stored_answers() {
    var stored_object_string= localStorage.getItem("stored_answers");
    var object_user_answers= JSON.parse(stored_object_string);
}

access_stored_answers();

var isClicked = localStorage.getItem("isClicked");

function check_if_quiz_clicked() {
    if (isClicked) {
        $("newUser_quiz").hide();
    }
    else {
        $("newUser_quiz").show();
    }
}

isClicked = localStorage.getItem("isClicked");
check_if_quiz_clicked();