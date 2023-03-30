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
exports.handleInteraction = exports.doDmInit = exports.applyEmbedEdit = exports.setClient = exports.client = exports.dmChannels = exports.commandMessages = exports.interactionData = void 0;
var discord = require("discord.js");
var scoutCommand = require("./commands/scout");
var scoutPitCommand = require("./commands/scoutPit");
var getTeamSheet = require("./commands/getTeamSheet");
exports.interactionData = {};
exports.commandMessages = {};
exports.dmChannels = {};
exports.client = null;
function setClient(obj) {
    exports.client = obj;
}
exports.setClient = setClient;
function applyEmbedEdit(embedBuilder, interactionData) {
    return __awaiter(this, void 0, void 0, function () {
        var game_piece, autonomous, matchString;
        return __generator(this, function (_a) {
            game_piece = { name: "**Game Pieces**", value: ("**High Cone**: " + interactionData.highCone + "\n" +
                    "**Mid Cone**: " + interactionData.midCone + "\n" +
                    "**Low Cone**: " + interactionData.lowCone + "\n" +
                    "**High Cube**: " + interactionData.highCube + "\n" +
                    "**Mid Cube**: " + interactionData.midCube + "\n" +
                    "**Low Cube**: " + interactionData.lowCube + "\n" +
                    "**Player Station Single**: " + (interactionData.playerStationSingle ? "Yes" : "No") + "\n" +
                    "**Player Station Double**: " + (interactionData.playerStationDouble ? "Yes" : "No") + "\n" +
                    "**Endgame Charge Station**: " + (interactionData.endgameChargeStation ? "Yes" : "No") + "\n" +
                    "**Endgame Charge Station Balanced**: " + (interactionData.endgameChargeStationBalanced ? "Yes" : "No") + "\n" +
                    "**Cycles**: " + (interactionData.highCone + interactionData.midCone + interactionData.lowCone + interactionData.highCube + interactionData.midCube + interactionData.lowCube) + "\n") };
            autonomous = { name: "**Autonomous**", value: ("**High Cone**: " + interactionData.highConeAuto + "\n" +
                    "**Mid Cone**: " + interactionData.midConeAuto + "\n" +
                    "**Low Cone**: " + interactionData.lowConeAuto + "\n" +
                    "**High Cube**: " + interactionData.highCubeAuto + "\n" +
                    "**Mid Cube**: " + interactionData.midCubeAuto + "\n" +
                    "**Low Cube**: " + interactionData.lowCubeAuto + "\n" +
                    "**Mobility**: " + (interactionData.mobility ? "Yes" : "No") + "\n" +
                    "**Charge Station**: " + (interactionData.chargeStation ? "Yes" : "No") + "\n" +
                    "**Charge Station Balance**: " + (interactionData.chargeStationBalance ? "Yes" : "No") + "\n" +
                    "**Preloaded Cube**: " + (interactionData.preloadedCube ? "Yes" : "No") + "\n" +
                    "**Preloaded Cone**: " + (interactionData.preloadedCone ? "Yes" : "No") + "\n") };
            embedBuilder.setFields(game_piece, autonomous);
            embedBuilder.setDescription("**__Autonomous Notes__**\n" + interactionData.autoNotes + "\n" + "**__TeleOp Notes__**\n" + interactionData.teleNotes + "**__Misc Notes__**\n" + interactionData.miscNotes);
            matchString = "";
            if (interactionData.matchNumber != -1) {
                matchString = (interactionData.quals ? " in qualification match " : " in practice match ") + interactionData.matchNumber;
            }
            embedBuilder.setTitle("Scouting " + interactionData.teamNumber + matchString);
            return [2];
        });
    });
}
exports.applyEmbedEdit = applyEmbedEdit;
function doDmInit(message, teamNumber, scouter) {
    return __awaiter(this, void 0, void 0, function () {
        var embedBuilder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exports.interactionData[message.id] = initInteractionDataPit();
                    exports.interactionData[message.id].teamNumber = teamNumber;
                    exports.interactionData[message.id].scouter = scouter;
                    embedBuilder = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, applyEmbedEdit(embedBuilder, exports.interactionData[message.id])];
                case 1:
                    _a.sent();
                    return [4, message.edit({ embeds: [embedBuilder] })];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.doDmInit = doDmInit;
function initInteractionDataPit() {
    var data = {
        highConeAuto: 0,
        midConeAuto: 0,
        lowConeAuto: 0,
        highCubeAuto: 0,
        midCubeAuto: 0,
        lowCubeAuto: 0,
        startTop: false,
        startMiddle: false,
        startLow: false,
        autoNotes: "",
        teleNotes: "",
        miscNotes: "",
        cycles: 0,
        quals: false,
        teamNumber: 0,
        playerStationSingle: false,
        playerStationDouble: false,
        top_pos: false,
        mid_pos: false,
        low_pos: false,
        preloadedCone: false,
        preloadedCube: false,
        mobility: false,
        chargeStation: false,
        chargeStationBalance: false,
        endgameChargeStation: false,
        endgameChargeStationBalanced: false,
        matchNumber: 0,
        highCone: 0,
        midCone: 0,
        lowCone: 0,
        highCube: 0,
        midCube: 0,
        lowCube: 0,
        drivetrain: -1,
        scouter: -1
    };
    data.highCone = 0;
    data.midCone = 0;
    data.lowCone = 0;
    data.highCube = 0;
    data.midCube = 0;
    data.lowCube = 0;
    data.highConeAuto = 0;
    data.midConeAuto = 0;
    data.lowConeAuto = 0;
    data.highCubeAuto = 0;
    data.midCubeAuto = 0;
    data.lowCubeAuto = 0;
    data.mobility = false;
    data.chargeStation = false;
    data.chargeStationBalance = false;
    data.startTop = false;
    data.startMiddle = false;
    data.startLow = false;
    data.playerStationDouble = false;
    data.playerStationSingle = false;
    data.endgameChargeStation = false;
    data.endgameChargeStationBalanced = false;
    data.preloadedCube = false;
    data.preloadedCone = false;
    data.autoNotes = "";
    data.teleNotes = "";
    data.miscNotes = "";
    data.cycles = 0;
    data.matchNumber = -1;
    data.teamNumber = -1;
    data.quals = true;
    return data;
}
function getComponentById(components, id) {
    for (var i = 0; i < components.components.length; i++) {
        if (components.components[i].customId == id) {
            return components.components[i];
        }
    }
    return null;
}
function handleButtonInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.message.id in exports.commandMessages && exports.commandMessages[interaction.message.id].command == "scout")) return [3, 2];
                    return [4, scoutCommand.handleButtonInteraction(interaction)];
                case 1:
                    _a.sent();
                    return [3, 6];
                case 2:
                    if (!(interaction.message.id in exports.commandMessages && exports.commandMessages[interaction.message.id].command == "scoutPit")) return [3, 4];
                    return [4, scoutPitCommand.handleButtonInteraction(interaction)];
                case 3:
                    _a.sent();
                    return [3, 6];
                case 4:
                    if (!(interaction.message.id in exports.commandMessages && exports.commandMessages[interaction.message.id].command == "getTeamSheet")) return [3, 6];
                    return [4, getTeamSheet.handleButtonInteraction(interaction)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2];
            }
        });
    });
}
function handleStringSelectInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.message.id in exports.commandMessages && exports.commandMessages[interaction.message.id].command == "scout")) return [3, 2];
                    return [4, scoutCommand.handleStringSelectInteraction(interaction)];
                case 1:
                    _a.sent();
                    return [3, 4];
                case 2:
                    if (!(interaction.message.id in exports.commandMessages && exports.commandMessages[interaction.message.id].command == "scoutPit")) return [3, 4];
                    return [4, scoutPitCommand.handleStringSelectInteraction(interaction)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2];
            }
        });
    });
}
function handleModalSubmitInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var split, messageId, channelId, channel, message, newEmbed, split, channelId, messageId, channel, message, newEmbed, split, channelId, messageId, channel, message, newEmbed, split, channelId, messageId, channel, message, newEmbed, split, channelId, messageId, channel, message, newEmbed, split, channelId, messageId, channel, message, newEmbed, split, channelId, messageId, channel, message, newEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!interaction.customId.startsWith("cycle_modal")) return [3, 4];
                    split = interaction.customId.split("_");
                    messageId = split[2];
                    channelId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 1:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, exports.interactionData[message.id])];
                case 2:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!interaction.customId.startsWith("match_number")) return [3, 8];
                    split = interaction.customId.split("_");
                    channelId = split[2];
                    messageId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    exports.interactionData[messageId].matchNumber = Number(interaction.fields.getField("set_match_number").value);
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 5:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, exports.interactionData[message.id])];
                case 6:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    console.log(interaction.customId);
                    if (!interaction.customId.startsWith("set_notes")) return [3, 12];
                    split = interaction.customId.split("_");
                    channelId = split[2];
                    messageId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    exports.interactionData[messageId].autoNotes = interaction.fields.getField("auto_notes").value;
                    exports.interactionData[messageId].teleNotes = interaction.fields.getField("tele_notes").value;
                    exports.interactionData[messageId].miscNotes = interaction.fields.getField("misc_notes").value;
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    console.log("?");
                    return [4, interaction.deferUpdate()];
                case 9:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, exports.interactionData[message.id])];
                case 10:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    if (!interaction.customId.startsWith("set_cone")) return [3, 16];
                    split = interaction.customId.split("_");
                    channelId = split[2];
                    messageId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    exports.interactionData[messageId].highCone = Number(interaction.fields.getField("high_cones").value);
                    exports.interactionData[messageId].midCone = Number(interaction.fields.getField("mid_cones").value);
                    exports.interactionData[messageId].lowCone = Number(interaction.fields.getField("low_cones").value);
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 13:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, exports.interactionData[message.id])];
                case 14:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    if (!interaction.customId.startsWith("set_cube")) return [3, 20];
                    split = interaction.customId.split("_");
                    channelId = split[2];
                    messageId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    exports.interactionData[messageId].highCube = Number(interaction.fields.getField("high_cubes").value);
                    exports.interactionData[messageId].midCube = Number(interaction.fields.getField("mid_cubes").value);
                    exports.interactionData[messageId].lowCube = Number(interaction.fields.getField("low_cubes").value);
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 17:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, exports.interactionData[message.id])];
                case 18:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 19:
                    _a.sent();
                    _a.label = 20;
                case 20:
                    if (!interaction.customId.startsWith("aset_cube")) return [3, 24];
                    split = interaction.customId.split("_");
                    channelId = split[2];
                    messageId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    exports.interactionData[messageId].highCubeAuto = Number(interaction.fields.getField("high_cubes").value);
                    exports.interactionData[messageId].midCubeAuto = Number(interaction.fields.getField("mid_cubes").value);
                    exports.interactionData[messageId].lowCubeAuto = Number(interaction.fields.getField("low_cubes").value);
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 21:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, exports.interactionData[message.id])];
                case 22:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 23:
                    _a.sent();
                    _a.label = 24;
                case 24:
                    if (!interaction.customId.startsWith("aset_cone")) return [3, 28];
                    split = interaction.customId.split("_");
                    channelId = split[2];
                    messageId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    exports.interactionData[messageId].highConeAuto = Number(interaction.fields.getField("high_cones").value);
                    exports.interactionData[messageId].midConeAuto = Number(interaction.fields.getField("mid_cones").value);
                    exports.interactionData[messageId].lowConeAuto = Number(interaction.fields.getField("low_cones").value);
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 25:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, exports.interactionData[message.id])];
                case 26:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 27:
                    _a.sent();
                    _a.label = 28;
                case 28: return [2];
            }
        });
    });
}
function handleInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!interaction.isStringSelectMenu()) return [3, 2];
                    return [4, handleStringSelectInteraction(interaction)];
                case 1:
                    _a.sent();
                    return [3, 7];
                case 2:
                    if (!interaction.isButton()) return [3, 4];
                    return [4, handleButtonInteraction(interaction)];
                case 3:
                    _a.sent();
                    return [3, 7];
                case 4:
                    if (!interaction.isChatInputCommand()) return [3, 5];
                    return [3, 7];
                case 5:
                    if (!interaction.isModalSubmit()) return [3, 7];
                    return [4, handleModalSubmitInteraction(interaction)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2];
            }
        });
    });
}
exports.handleInteraction = handleInteraction;
