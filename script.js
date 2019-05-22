// JavaScript File
/*global $*/
/*global localStorage*/
$("button").click(function(){
    
    $.ajax({
        url: "https://api.soundcloud.com/tracks?q=beyonce&client_id=5aa8e389ba4e24b6106af5159ab3e344",
        method: "GET",
        success: function(response) {
            $(".imageContainer").html("<img src='" + response.file + "'>");   
        }
    });
});

$("#quizQ").hide();

var isClicked = localStorage.getItem("isClicked");
function check_if_quiz_clicked() {
    if (isClicked) {
        $("#newUser_quiz").hide();
    }
    else {
        $("#newUser_quiz").show();
    }
}

check_if_quiz_clicked();

$("#submit").click(function() {
    localStorage.setItem("isClicked", true);
    $("#quizQ").hide();
    
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
    
    isClicked = localStorage.getItem("isClicked");
    check_if_quiz_clicked();
});

function access_stored_answers() {
    var stored_object_string = localStorage.getItem("stored_answers");
    var object_user_answers = JSON.parse(stored_object_string);
}

access_stored_answers();

$("#newQuiz").click(function() {
    $("#newUser_quiz").hide();
    $("#quizQ").show();
});
