var ms = 0;
var state = 0;
var then;
var now;
var store = 0;
var athletes = [];
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
        $('#time').val(format(ms));
    }
}
function swreset() {
    "use strict";
    store = 0;
    state = 0;
    ms = 0;
    $('#time').val(format(ms));
}
function display() {
    "use strict";
    setTimeout("display();", 50);
    if (state === 1) {
        now = new Date();
        ms = store + now.getTime() - then.getTime();
        $("#time").val(format(ms));
    }
}
function nameSearch(name) {
	for(var i = 0; i < athletes.length; i++) {
		if(athletes[i].name === name) {
			return i;
		}
	};
}
function save(athleteName, time) {
    athletes[nameSearch(athleteName)].time = time;
    alert(athleteName + "'s time saved!");
}
function createNewAthlete() {
    "use strict";
    var name = prompt("What is the name of your new Athlete?", "Enter name here");
    athletes.push(new Athlete(name));
	var button = $("<input type='button'>").attr("id", name);
	$("#athleteContainer").append(button);
	var id = "#" + name;
	$(id).val(name);
	$(id).attr("onClick", "save('" + name + "', store)");
}