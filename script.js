// JavaScript File
/*global $*/
/*global localStorage*/

$("#submit").click(function() {
    var input_genre = $("fav_genre").val();
    var input_era = $("fav_era").val();
    var input_artist = $("fav_artist").val();
    
    var starting_quiz_answers = {
        favorite_genre: input_genre,
        favorite_era: input_era,
        favorite_artist: input_artist,
    };
    
    var user_object_string= JSON.stringify(starting_quiz_answers);
    
    localStorage.setItem("stored_answers", user_object_string);
});

function access_stored_answers() {
    var stored_object_string= localStorage.getItem("stored_answers");
    var object_user_answers= JSON.parse(stored_object_string);
};

access_stored_answers();