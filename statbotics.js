"use strict";
exports.__esModule = true;
exports.requestMatchData = exports.Stats = void 0;
var request = require("request");
var Stats = (function () {
    function Stats() {
    }
    return Stats;
}());
exports.Stats = Stats;
function requestMatchData(matchNumber) {
    var prom = new Promise(function (resolve, reject) {
        request({
            headers: {
                "Accept": "application/json"
            },
            uri: "https://api.statbotics.io/v2/match/2023nyli2_qm" + matchNumber,
            method: "GET"
        }, function (err, res, body) { return resolve(JSON.parse(body)); });
    });
    return prom;
}
exports.requestMatchData = requestMatchData;
