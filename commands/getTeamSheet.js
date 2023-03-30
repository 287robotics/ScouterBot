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
exports.execute = exports.data = exports.handleButtonInteraction = void 0;
var discord = require("discord.js");
var interactionHandler = require("../interactionHandler");
var database = require("../database");
var sheetInteractionData = {};
function initData(message) {
    sheetInteractionData[message.id] = {};
    sheetInteractionData[message.id].index = 0;
}
function trunc(n, t) {
    if (t === void 0) { t = 2; }
    return (~~(n / 5)) % t;
}
function handleButtonInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var message, interactionData;
        return __generator(this, function (_a) {
            message = interaction.message;
            interactionData = sheetInteractionData[interaction.message.id];
            return [2];
        });
    });
}
exports.handleButtonInteraction = handleButtonInteraction;
exports.data = new discord.SlashCommandBuilder()
    .setName('getteamsheet')
    .setDescription('piss your\'e pant AGIAN t')
    .addNumberOption(function (option) {
    return option.setName("teamnumber")
        .setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
        .setRequired(true);
});
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var teamNumber, embedBuilder, botStats, botNotes, botData, averages, dt, basicInfo, message, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    teamNumber = interaction.options.getNumber("teamnumber");
                    embedBuilder = new discord.EmbedBuilder()
                        .setTitle("Scout Sheet for " + teamNumber);
                    return [4, interaction.deferReply()];
                case 1:
                    _a.sent();
                    return [4, database.getBotStats(teamNumber)];
                case 2:
                    botStats = _a.sent();
                    return [4, database.getBotNotes(teamNumber)];
                case 3:
                    botNotes = _a.sent();
                    return [4, database.getBotData(teamNumber)];
                case 4:
                    botData = _a.sent();
                    if (!(botData.teamNumber == undefined)) return [3, 6];
                    return [4, interaction.deleteReply()];
                case 5:
                    _a.sent();
                    return [2];
                case 6:
                    averages = {
                        name: "**Averages**",
                        value: "**Avg High Cones(Auto)**: " + trunc(botStats.avgConesTele.high) + '\n' +
                            "**Avg Mid Cones(Auto)**: " + trunc(botStats.avgConesTele.mid) + '\n' +
                            "**Avg Low Cones(Auto)**: " + trunc(botStats.avgConesTele.low) + '\n' +
                            "**Avg High Cubes(Auto)**: " + trunc(botStats.avgCubesTele.high) + '\n' +
                            "**Avg Mid Cubes(Auto)**: " + trunc(botStats.avgCubesTele.mid) + '\n' +
                            "**Avg Low Cubes(Auto)**: " + trunc(botStats.avgCubesTele.low) + '\n' +
                            "**Avg High Cones(TeleOp)**: " + trunc(botStats.avgConesTele.high) + '\n' +
                            "**Avg Mid Cones(TeleOp)**: " + trunc(botStats.avgConesTele.mid) + '\n' +
                            "**Avg Low Cones(TeleOp)**: " + trunc(botStats.avgConesTele.low) + '\n' +
                            "**Avg High Cubes(TeleOp)**: " + trunc(botStats.avgCubesTele.high) + '\n' +
                            "**Avg Mid Cubes(TeleOp)**: " + trunc(botStats.avgCubesTele.mid) + '\n' +
                            "**Avg Low Cubes(TeleOp)**: " + trunc(botStats.avgCubesTele.low) + '\n' +
                            "**Avg Cycles Per Game**: " + trunc(botStats.avgCycles) + '\n',
                        inline: true
                    };
                    dt = "";
                    switch (botData.drivetrain) {
                        case (0):
                            dt = "Tank";
                            break;
                        case (1):
                            dt = "Swerve";
                            break;
                        case (2):
                            dt = "Other";
                            break;
                        default:
                            dt = "Not Scouted";
                            break;
                    }
                    basicInfo = {
                        name: "**Basic Info**",
                        value: "**Drivetrain**" + dt + '\n' +
                            "**Endgame Charge Station %**: " + botStats.charge + "\n" +
                            "**Endgame Charge Station Balance %**: " + botStats.balance + '\n' +
                            "**Charge Station(Auto)**: " + botStats.autoCharge + "\n" +
                            "**Charge Station Balanced(Auto)**: " + botStats.autoBalance + "\n" +
                            "**Mobility(Auto)**" + botStats.autoMobility + "\n",
                        inline: true
                    };
                    embedBuilder.addFields(averages, basicInfo);
                    if (!(interaction.channel != null && !interaction.channel.isDMBased())) return [3, 9];
                    return [4, interaction.channel.send({ embeds: [embedBuilder] })];
                case 7:
                    message = _a.sent();
                    return [4, interaction.deleteReply()];
                case 8:
                    _a.sent();
                    interactionHandler.commandMessages[message.id] = {};
                    interactionHandler.commandMessages[message.id].command = "getTeamSheet";
                    return [3, 12];
                case 9: return [4, interaction.user.send({ embeds: [embedBuilder] })];
                case 10:
                    message = _a.sent();
                    return [4, interaction.deleteReply()];
                case 11:
                    _a.sent();
                    interactionHandler.commandMessages[message.id] = {};
                    interactionHandler.commandMessages[message.id].command = "getTeamSheet";
                    _a.label = 12;
                case 12: return [2];
            }
        });
    });
}
exports.execute = execute;
