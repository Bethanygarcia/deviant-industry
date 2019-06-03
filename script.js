// JavaScript File
/*global $*/
/*global localStorage*/

$("#adding").hide();

var saveASong;
var savedSongs = [];
var temp = localStorage.getItem("librarySongs");

if(temp != "") {
    savedSongs = temp.split(",");
}

console.log(savedSongs);


var orderOfSongs = [];
var songIDs = [];

//search for a song
$("#search").click(function() {
    var user_song_input = $("#user_input").val();
    var api_song_link = "https://api.soundcloud.com/tracks?q=" + user_song_input + "&client_id=5aa8e389ba4e24b6106af5159ab3e344";
    
    orderOfSongs = [];
    songIDs = [];
    
    $.ajax({
        url: api_song_link,
        method: "GET",
        success: function(response) {
            $("#searchResults").empty();
            
            var count;
            for (count = 0; count < response.length; count++) {
                $("#searchResults").append((count + 1) + ". ");
                $("#searchResults").append("Song Name: " + response[count].title + "<br>");
                $("#searchResults").append("Posted by: " + response[count].user.username + "<br>");
                $("#searchResults").append("Genre: " + response[count].genre + "<br>");
                $("#searchResults").append("Soundcloud Link: <a href='" + response[count].permalink_url + "'>" + response[count].permalink_url + "<a/><br><br>");
                
                orderOfSongs.push(count);
                songIDs.push(response[count].id);
            }
            
            $("#searchResults").append("<br><br>");
            $("#adding").show();
            
            $("#addingSongs").click(function() {
                var user_input = $("#numOfSong").val();
                $("#numOfSong").val("");
        
                var tempNumber = parseInt(user_input);
                var number = tempNumber - 1;
        
                orderOfSongs.forEach(function(index) {
                    if (number === index) {
                        saveASong = songIDs[number];
                        
                        savedSongs.push(saveASong);
                        console.log(savedSongs);
                    }
                });
                
                localStorage.setItem("librarySongs", savedSongs);
            });
        },
    });
});

$("#accessSongs").click(function() {
    $("#accessSongs").hide();
    
    if (temp != "") {
        var randNum = 0;
        
        for(var songNums = 0; songNums < savedSongs.length; songNums++) {
            $.ajax({
                url: "https://api.soundcloud.com/tracks/" + savedSongs[songNums] + "?&client_id=5aa8e389ba4e24b6106af5159ab3e344",
                method: "GET",
                success: function(response) {
                    randNum++;
                    $("#savedMusic").append(randNum + ". ");
                    $("#savedMusic").append("Song Name: " + response.title + "<br>");
                    $("#savedMusic").append("Posted by: " + response.user.username + "<br>");
                    $("#savedMusic").append("Genre: " + response.genre + "<br>");
                    $("#savedMusic").append("Soundcloud Link: <a href='" + response.permalink_url + "'>" + response.permalink_url + "<a/><br><br>");
                },
            });
        }
    }
    else {
        $("#savedMusic").append("No music found!");
    }
});
