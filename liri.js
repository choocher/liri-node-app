// READ and SET any environment variables with the .env package.
require("dotenv").config();

// LINK KEYS.JS PAGE
var keys = require("./keys.js");
// console.log(keys);

// REQUIRE REQUEST
var request = require('request');

// REQUIRE MOMENT
var moment = require('moment');
moment().format();

// REQUIRE DATA FROM FILING SYSTEM (NPM)
var fs = require('fs');

// INTIALIZE SPOTIFY
var Spotify = require('node-spotify-api');
// below variable needs to be with in "spotify function"
// var spotify = new Spotify(keys.spotify);
// // console.log(spotify);

// INTIALIZE OMDB
const omdb = require('omdbapi');
// console.log(omdb);

// INTIALIZE BANDSINTOWN
var bandsintown = require('bandsintown')(keys.bandsInTown.id);
// console.log(bandsintown);

// TAKE USER COMMAND AND INPUT
var input = process.argv;
var action = input[2];
var inputs = input[3];

//APP LOGIC -  Make it so liri.js can take in one of the following commands: 
switch (action) {
    case "concert-this":
        bandsInTown(inputs);
        break;

    case "spotify-this-song":
        spotify(inputs);
        break;

    case "movie-this":
        movie(inputs);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
};

//---added Bands In Town function---
function bandsInTown(inputs) {
}
console.log("Best band ever!");
// bandsInTown(inputs);

    // bandsInTown function WIP 
    // https://www.npmjs.com/package/bandsintown
    //     var artist = inputs;
    //     var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.id;


    function spotify(inputs) {

        // Storing API keys in variable.
        var spotify = new Spotify(keys.spotify);
        if (!inputs) {
            inputs = 'The Sign Ace of Base';
        }
        spotify.search({ type: 'track', query: inputs }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var songInfo = data.tracks.items;
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song Name: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
        });
    }


    function movie(inputs) {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey="+keys.omdb.id;

        request(queryUrl, function (error, response, body) {
            if (!inputs) {
                inputs = 'Mr. Nobody';
                console.log(inputs);
            }
            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    };

    function doWhatItSays() {
        fs.readFile('random.txt', "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
            if (dataArr[0] === "spotify-this-song") {
                var songcheck = dataArr[1].slice(1, -1);
                spotify(songcheck);
            } else if (dataArr[0] === "concert-this") {
                var concert_name = dataArr[1].slice(1, -1);
                concert(concert_name);
            } else if (dataArr[0] === "movie-this") {
                var movie_name = dataArr[1].slice(1, -1);
                movie(movie_name);
            }

        });

    };
