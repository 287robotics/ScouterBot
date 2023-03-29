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
        while (_) try {
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
exports.__esModule = true;
exports.execute = exports.data = void 0;
var discord = require("discord.js");
var stats = require("../statbotics");
exports.data = new discord.SlashCommandBuilder()
    .setName('predict')
    .setDescription('get match prediction from statbotics')
    .addNumberOption(function (option) {
    return option.setName("matchnumber")
        .setDescription("number of the match")
        .setRequired(true);
});
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var matchNumber, matchData, embed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    matchNumber = interaction.options.getNumber("matchnumber");
                    return [4, stats.requestMatchData(matchNumber)];
                case 1:
                    matchData = _a.sent();
                    embed = new discord.EmbedBuilder()
                        .setTitle("Qualification " + matchNumber + " Predictions by Statbotics");
                    embed.addFields({ name: "Winner:", value: (matchData.epa_winner == "red" ? "Red" : "Blue") + " - " +
                            Math.round((matchData.epa_winner == "red" ? matchData.epa_win_prob : (1 - matchData.epa_win_prob)) * 100) + "% certainty" });
                    embed.addFields({ name: "Scores:", value: "Red: " + Math.round(matchData.red_epa_sum) + "\nBlue: " + Math.round(matchData.blue_epa_sum) });
                    console.log(matchData);
                    return [4, interaction.reply({ embeds: [embed] })];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.execute = execute;
