"use strict";
exports.__esModule = true;
exports.requestEventData = exports.requestTeamData = exports.EventData = exports.Team = void 0;
var request = require("request");
var BLUE_ALLIANCE_API = process.env.BLUE_ALLIANCE_API;
var Team = (function () {
    function Team() {
    }
    return Team;
}());
exports.Team = Team;
var EventData = (function () {
    function EventData() {
    }
    return EventData;
}());
exports.EventData = EventData;
function requestTeamData(teamNumber) {
    var prom = new Promise(function (resolve, reject) {
        request({
            headers: {
                "Accept": "application/json",
                "X-TBA-Auth-Key": BLUE_ALLIANCE_API
            },
            uri: "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber,
            method: "GET"
        }, function (err, res, body) { return resolve(JSON.parse(body)); });
    });
    return prom;
}
exports.requestTeamData = requestTeamData;
function requestEventData(teamNumber) {
    var prom = new Promise(function (resolve, reject) {
        var year = new Date().getFullYear();
        request({
            headers: {
                "Accept": "application/json",
                "X-TBA-Auth-Key": BLUE_ALLIANCE_API
            },
            uri: "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber + "/events/" + year + "/statuses",
            method: "GET"
        }, function (err, res, body) { return resolve(JSON.parse(body)); });
    });
    return prom;
}
exports.requestEventData = requestEventData;
