var ms = 0;
var state = 0;
var then;
var now;
var store = 0;
function format(date) {
    "use strict";
    return Math.floor(date / 3600000) + ":" + Math.floor(date / 60000) + ":" + Math.floor(date / 1000) + "." + date % 1000;
}
function startstop() {
    "use strict";
    if (state === 0) {
        then = new Date();
		state = 1;
	} else {
        state = 0;
        now = new Date();
        store += ms;
        ms = now.getTime() - then.getTime();
        document.getElementById('time').value = format(ms);
    }
}
function swreset() {
    "use strict";
    store = 0;
    state = 0;
    ms = 0;
    document.getElementById('time').value = format(ms);
}
function display() {
    "use strict";
    ms = new Date();
    setTimeout("display();", 50);
    if (state === 1) {
        now = new Date();
        ms = store + now.getTime() - then.getTime();
        document.getElementById('time').value = format(ms);
    }
}