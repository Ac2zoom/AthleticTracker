var egghead = angular.module("egghead", [])
var ms = 0;
var state = 0;
var then;
var now;
var store = 0;
var athletes = [];
var sport = "";

function format(date) {
    "use strict";
    var hour = Math.floor(date / 3600000),
        minute = Math.floor(date / 60000) - hour * 60,
        second = Math.floor(date / 1000) - minute * 60;
    return hour + ":" + minute + ":" + second + "." + date % 1000;
}

function startstop() {
    "use strict";
    if (state === 0) {
        then = new Date();
		state = 1;
	} else {
        state = 0;
        now = new Date();
        ms = store + now.getTime() - then.getTime();
        store = ms;
        $('#time').text(format(ms));
    }
}

function swreset() {
    "use strict";
    store = 0;
    state = 0;
    ms = 0;
    $('#time').text(format(ms));
}

function display() {
    "use strict";
    setTimeout("display();", 50);
    if (state === 1) {
        now = new Date();
        ms = store + now.getTime() - then.getTime();
        $("#time").text(format(ms));
    }
}

function nameSearch(name) {
	for(var i = 0; i < athletes.length; i++) {
		if(athletes[i].name === name) {
			return i;
		}
	}
}

function save(athleteName, time) { //edit once get requests allow persistence of athletes: just pass relevant sport
    var athlete = nameSearch(athleteName);
    athlete[sport]=new TimeDatum(time);
    athlete.sport = sport;
    var athleteNameString = JSON.stringify(athlete);
    egghead.controller("AppCtrl", function ($http) {
        var app = this;

        $http.post("http://localhost:3000/", JSON.stringify(athleteNameString)).success(function () {
            alert(athleteName + "'s time saved!");
        });
    });
    /**req.write(athleteNameString);
    req.end();**/
    alert(athleteName + "'s time saved!");
}

function createNewAthlete() {
    "use strict";
    var name = prompt("What is the name of your new Athlete?", "Enter name here");
    if(typeof athletes !== 'object'){
        athletes = [];
    }
    athletes.push(new Athlete(name));
	var button = $("<input type='button'>").attr("id", name);
	$("#athleteContainer").append(button);
	var id = "#" + name;
	$(id).val(name);
	$(id).attr("onClick", "save('" + name + "', store)");
	$(id).attr("class", "athleteContainerContents btn btn-default btn-lg");
}

function requestSport() {
    "use strict";
    sport = prompt("What sport are you recording a time for?", "Enter sport here");
    $("#sport").text(sport);
}