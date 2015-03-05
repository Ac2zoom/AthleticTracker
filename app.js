/**
 * Created by Akshay on 3/4/2015.
 */
var egghead = angular.module("egghead", [])

egghead.controller("AppCtrl", function ($http) {
    var app = this;

    $http.post("http://localhost:3000/", JSON.stringify(athletes[nameSearch(athleteName)])).success(function () {
        alert(athleteName + "'s time saved!");
    });
});