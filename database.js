"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotData = exports.addBotData = exports.getBotNotes = exports.getBotStats = exports.getMatchData = exports.addMatchRecord = exports.getTeamData = exports.addNewTeamByBlueAlliance = exports.doesTeamExist = exports.MatchData = exports.BotData = void 0;
var mysql = require("mysql");
var blueAlliance = require("./blueAlliance");
var BotData = (function () {
    function BotData(row) {
        this.teamNumber = row.teamNumber;
        this.autoJson = JSON.parse(row.autoJson);
        this.teleJson = JSON.parse(row.teleJson);
        this.mobility = row.mobility;
        this.startingGrid = row.startingGrid;
        this.substation = row.substation;
        this.cycleTime = row.cycleTime;
        this.scouter = row.scouter;
        this.drivetrain = row.drivetrain;
        this.botNote = row.botNote;
    }
    return BotData;
}());
exports.BotData = BotData;
;
var MatchData = (function () {
    function MatchData(row) {
        this.teamNumber = row.teamNumber;
        this.qualNumber = row.qualNumber;
        this.autoJson = JSON.parse(row.autoJson);
        this.teleJson = JSON.parse(row.teleJson);
        this.mobility = row.mobility;
        this.startingGrid = row.startingGrid;
        this.substation = row.substation;
        this.cycleTime = row.cycleTime;
        this.scouter = row.scouter;
    }
    return MatchData;
}());
exports.MatchData = MatchData;
var con = mysql.createConnection({
    host: "192.168.1.247",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: "scouter"
});
con.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MySQL connected successfully");
    }
});
function doesTeamExist(teamNumber) {
    var prom = new Promise(function (resolve, reject) {
        con.query("SELECT * FROM teamData WHERE teamNumber=" + teamNumber, function (err, results, fields) {
            resolve(results.length > 0);
        });
    });
    return prom;
}
exports.doesTeamExist = doesTeamExist;
function addNewTeamByBlueAlliance(teamNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var teamData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    teamData = blueAlliance.requestTeamData(teamNumber);
                    return [4, doesTeamExist(teamNumber)];
                case 1:
                    if (!!(_b.sent())) return [3, 3];
                    _a = addNewTeam;
                    return [4, teamData];
                case 2:
                    _a.apply(void 0, [_b.sent()]);
                    _b.label = 3;
                case 3: return [2];
            }
        });
    });
}
exports.addNewTeamByBlueAlliance = addNewTeamByBlueAlliance;
function addNewTeam(teamData) {
    con.query("INSERT INTO teamData VALUES (" + teamData.team_number + ", \"" + teamData.nickname + "\", " + teamData.rookie_year + ")", function (err, results, fields) {
        if (err)
            console.log(err);
    });
}
function getTeamData(teamNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var prom;
        var _this = this;
        return __generator(this, function (_a) {
            prom = new Promise(function (resolve, reject) {
                con.query("SELECT * FROM teamData WHERE teamNumber=" + teamNumber, function (err, results, fields) { return __awaiter(_this, void 0, void 0, function () {
                    var td;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err)
                                    console.log(err);
                                if (!(results.length > 0)) return [3, 1];
                                resolve(results[0]);
                                return [3, 3];
                            case 1: return [4, blueAlliance.requestTeamData(teamNumber)];
                            case 2:
                                td = _a.sent();
                                resolve({ teamNumber: td.team_number, teamName: td.nickname, rookieYear: td.rookie_year });
                                addNewTeam(td);
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                }); });
            });
            return [2, prom];
        });
    });
}
exports.getTeamData = getTeamData;
function addMatchRecord(data) {
    con.query("INSERT INTO matchData VALUES (" + data.teamNumber +
        ", " + data.qualNumber +
        ", \"" + JSON.stringify(data.autoJson).replaceAll("\"", "\\\"") +
        "\", \"" + JSON.stringify(data.teleJson).replaceAll("\"", "\\\"") +
        "\", " + data.mobility +
        ", " + data.startingGrid +
        ", " + data.substation +
        ", " + data.cycleTime +
        ", " + data.scouter +
        ")", function (err, results, fields) {
        if (err)
            console.log(err);
    });
}
exports.addMatchRecord = addMatchRecord;
function getMatchData(teamNumber, qualNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var prom;
        var _this = this;
        return __generator(this, function (_a) {
            prom = new Promise(function (resolve, reject) {
                con.query("SELECT * FROM matchData WHERE teamNumber=" + teamNumber + " AND qualNumber=" + qualNumber, function (err, results, fields) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (err)
                            console.log(err);
                        if (results.length > 0) {
                            resolve(new MatchData(results[0]));
                        }
                        else {
                            resolve({});
                        }
                        return [2];
                    });
                }); });
            });
            return [2, prom];
        });
    });
}
exports.getMatchData = getMatchData;
function getBotStats(teamNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var prom;
        var _this = this;
        return __generator(this, function (_a) {
            prom = new Promise(function (resolve, reject) {
                con.query("SELECT * FROM matchData WHERE teamNumber=" + teamNumber, function (err, results, fields) { return __awaiter(_this, void 0, void 0, function () {
                    var botStats, i, data;
                    return __generator(this, function (_a) {
                        if (err)
                            console.log(err);
                        if (results.length > 0) {
                            botStats = {
                                teamNumber: teamNumber,
                                avgConesAuto: {
                                    low: 0,
                                    mid: 0,
                                    high: 0
                                },
                                avgConesTele: {
                                    low: 0,
                                    mid: 0,
                                    high: 0
                                },
                                avgCubesAuto: {
                                    low: 0,
                                    mid: 0,
                                    high: 0
                                },
                                avgCubesTele: {
                                    low: 0,
                                    mid: 0,
                                    high: 0
                                },
                                avgCycles: 0,
                                charge: 0,
                                balance: 0,
                                autoCharge: false,
                                autoBalance: false,
                                autoMobility: false
                            };
                            for (i = 0; i < results.length; i++) {
                                data = new MatchData(results[i]);
                                botStats.avgConesAuto.high += data.autoJson.cones.high;
                                botStats.avgConesAuto.mid += data.autoJson.cones.mid;
                                botStats.avgConesAuto.low += data.autoJson.cones.low;
                                botStats.avgConesTele.high += data.teleJson.cones.high;
                                botStats.avgConesTele.mid += data.teleJson.cones.mid;
                                botStats.avgConesTele.low += data.teleJson.cones.low;
                                botStats.avgCubesAuto.high += data.autoJson.cubes.high;
                                botStats.avgCubesAuto.mid += data.autoJson.cubes.mid;
                                botStats.avgCubesAuto.low += data.autoJson.cubes.low;
                                botStats.avgCubesTele.high += data.teleJson.cubes.high;
                                botStats.avgCubesTele.mid += data.teleJson.cubes.mid;
                                botStats.avgCubesTele.low += data.teleJson.cubes.low;
                                botStats.avgCycles += data.teleJson.cones.high + data.teleJson.cones.mid + data.teleJson.cones.low +
                                    data.teleJson.cubes.high + data.teleJson.cubes.mid + data.teleJson.cubes.low;
                                botStats.charge += data.teleJson.onCharge ? 1 : 0;
                                botStats.balance += data.teleJson.balance ? 1 : 0;
                                botStats.autoCharge = botStats.autoCharge || data.autoJson.onCharge;
                                botStats.autoBalance = botStats.autoBalance || data.autoJson.balance;
                                botStats.autoMobility = botStats.autoMobility || data.mobility;
                            }
                            botStats.avgConesAuto.high /= results.length;
                            botStats.avgConesAuto.mid /= results.length;
                            botStats.avgConesAuto.low /= results.length;
                            botStats.avgConesTele.high /= results.length;
                            botStats.avgConesTele.mid /= results.length;
                            botStats.avgConesTele.low /= results.length;
                            botStats.avgCubesAuto.high /= results.length;
                            botStats.avgCubesAuto.mid /= results.length;
                            botStats.avgCubesAuto.low /= results.length;
                            botStats.avgCubesTele.high /= results.length;
                            botStats.avgCubesTele.mid /= results.length;
                            botStats.avgCubesTele.low /= results.length;
                            botStats.avgCycles /= results.length;
                            botStats.charge /= results.length;
                            botStats.balance /= results.length;
                            resolve(botStats);
                        }
                        else {
                            resolve({});
                        }
                        return [2];
                    });
                }); });
            });
            return [2, prom];
        });
    });
}
exports.getBotStats = getBotStats;
function getBotNotes(teamNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var prom;
        var _this = this;
        return __generator(this, function (_a) {
            prom = new Promise(function (resolve, reject) {
                con.query("SELECT * FROM matchData WHERE teamNumber=" + teamNumber, function (err, results, fields) { return __awaiter(_this, void 0, void 0, function () {
                    var r, botData, i, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err)
                                    console.log(err);
                                if (!(results.length > 0)) return [3, 2];
                                r = [];
                                return [4, getBotData(teamNumber)];
                            case 1:
                                botData = _a.sent();
                                r.push(botData.autoJson.notes);
                                r.push(botData.teleJson.notes);
                                r.push(botData.botNote);
                                for (i = 0; i < results.length; i++) {
                                    data = new MatchData(results[i]);
                                    r.push(data.autoJson.notes);
                                    r.push(data.teleJson.notes);
                                }
                                resolve(r);
                                return [3, 3];
                            case 2:
                                resolve([]);
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                }); });
            });
            return [2, prom];
        });
    });
}
exports.getBotNotes = getBotNotes;
function addBotData(data) {
    con.query("INSERT INTO botData VALUES (" + data.teamNumber +
        ", \"" + JSON.stringify(data.autoJson).replaceAll("\"", "\\\"") +
        "\", \"" + JSON.stringify(data.teleJson).replaceAll("\"", "\\\"") +
        "\", " + data.mobility +
        ", " + data.startingGrid +
        ", " + data.substation +
        ", " + data.cycleTime +
        ", " + data.scouter +
        ", " + data.drivetrain +
        ", \"" + data.botNote +
        "\")", function (err, results, fields) {
        if (err)
            console.log(err);
    });
}
exports.addBotData = addBotData;
function getBotData(teamNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var prom;
        var _this = this;
        return __generator(this, function (_a) {
            prom = new Promise(function (resolve, reject) {
                con.query("SELECT * FROM botData WHERE teamNumber=" + teamNumber, function (err, results, fields) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (err)
                            console.log(err);
                        if (results.length > 0) {
                            resolve(new BotData(results[0]));
                        }
                        else {
                            resolve({});
                        }
                        return [2];
                    });
                }); });
            });
            return [2, prom];
        });
    });
}
exports.getBotData = getBotData;
