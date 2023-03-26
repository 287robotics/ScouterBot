"use strict";
exports.__esModule = true;
exports.requestEventData = exports.requestTeamData = exports.EventData = exports.Team = void 0;
var request = require("request");
var teams = [];
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
function teamDataCallback(err, res, body, callback) {
    callback(JSON.parse(body));
}
function eventDataCallback(err, res, body, callback) {
    callback(JSON.parse(body));
}
function requestTeamData(teamNumber, callback) {
    request({
        headers: {
            "Accept": "application/json",
            "X-TBA-Auth-Key": BLUE_ALLIANCE_API
        },
        uri: "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber,
        method: "GET"
    }, function (err, res, body) { return teamDataCallback(err, res, body, callback); });
}
exports.requestTeamData = requestTeamData;
function requestEventData(teamNumber, callback) {
    var year = new Date().getFullYear();
    request({
        headers: {
            "Accept": "application/json",
            "X-TBA-Auth-Key": BLUE_ALLIANCE_API
        },
        uri: "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber + "/events/" + year + "/statuses",
        method: "GET"
    }, function (err, res, body) { return eventDataCallback(err, res, body, callback); });
}
exports.requestEventData = requestEventData;
