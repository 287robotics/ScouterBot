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
exports.handleInteraction = exports.doDmInit = exports.setClient = exports.client = exports.dmChannels = exports.commandMessages = void 0;
var discord = require("discord.js");
var interactionData = {};
exports.commandMessages = {};
exports.dmChannels = {};
exports.client = null;
function setClient(obj) {
    exports.client = obj;
}
exports.setClient = setClient;
function applyEmbedEdit(embedBuilder, interactionData) {
    return __awaiter(this, void 0, void 0, function () {
        var game_piece, autonomous;
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
                    "**Charge Station Balance**: " + (interactionData.chargeStationBalance ? "Yes" : "No") + "\n") };
            embedBuilder.setFields(game_piece, autonomous);
            embedBuilder.setDescription("**__Autonomous Notes__**\n" + interactionData.autoNotes + "\n" + "**__TeleOp Notes__**\n" + interactionData.teleNotes + "**__Misc Notes__**\n" + interactionData.miscNotes);
            console.log(interactionData);
            embedBuilder.setTitle("Scouting " + interactionData.teamNumber + " in Match " + interactionData.matchNumber);
            return [2];
        });
    });
}
function doDmInit(message, teamNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var embedBuilder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    interactionData[message.id] = initInteractionDataPit();
                    interactionData[message.id].teamNumber = teamNumber;
                    embedBuilder = discord.EmbedBuilder.from(message.embeds[0]);
                    interactionData[message.id].messageId = message.id;
                    return [4, applyEmbedEdit(embedBuilder, interactionData[message.id])];
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
    var data = {};
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
    data.autoNotes = "";
    data.teleNotes = "";
    data.miscNotes = "";
    data.cycles = 0;
    data.matchNumber = "NOT SET";
    data.teamNumber = "NOT SET";
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
function handlerButtonInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        function updateConeCube(id) {
            var rowBuilder = null;
            exports.commandMessages[interaction.message.id].lastGamePieceId = id;
            if (id.indexOf("cone") != -1) {
                rowBuilder = discord.ActionRowBuilder.from(message_1.components[0]);
                rows_1.push(rowBuilder, message_1.components[1], message_1.components[2], message_1.components[3]);
            }
            else {
                rowBuilder = discord.ActionRowBuilder.from(message_1.components[1]);
                rows_1.push(message_1.components[0], rowBuilder, message_1.components[2], message_1.components[3]);
            }
            interactionData[message_1.id][vars_1[id]] += 1;
            if (interactionData[message_1.id][vars_1[id]] > 0) {
                rowBuilder.components[indexes_1[id]].setStyle(discord.ButtonStyle.Success);
            }
            else {
                rowBuilder.components[indexes_1[id]].setStyle(discord.ButtonStyle.Secondary);
            }
        }
        var message_1, rows_1, selectRow, updateEmbed, indexes_1, vars_1, lastGamePieceId, rowBuilder, rowBuilder, rowBuilder, rowBuilder, rowBuilder, rowBuilder, rowBuilder, rowBuilder, indexes_2, variableNames, text, modal, newEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.message.id in exports.commandMessages && exports.commandMessages[interaction.message.id].command == "scout")) return [3, 6];
                    message_1 = interaction["message"];
                    rows_1 = [];
                    selectRow = message_1.components[message_1.components.length - 1];
                    updateEmbed = true;
                    indexes_1 = { "high_cone": 0, "mid_cone": 1, "low_cone": 2, "high_cube": 0, "mid_cube": 1, "low_cube": 2,
                        "high_cone_a": 0, "mid_cone_a": 1, "low_cone_a": 2, "high_cube_a": 0, "mid_cube_a": 1, "low_cube_a": 2 };
                    vars_1 = { "high_cone": "highCone", "mid_cone": "midCone", "low_cone": "lowCone", "high_cube": "highCube", "mid_cube": "midCube", "low_cube": "lowCube",
                        "high_cone_a": "highConeAuto", "mid_cone_a": "midConeAuto", "low_cone_a": "lowConeAuto", "high_cube_a": "highCubeAuto", "mid_cube_a": "midCubeAuto", "low_cube_a": "lowCubeAuto" };
                    if (["high_cone", "mid_cone", "low_cone", "high_cube", "mid_cube", "low_cube",
                        "high_cone_a", "mid_cone_a", "low_cone_a", "high_cube_a", "mid_cube_a", "low_cube_a"].indexOf(interaction.customId) != -1) {
                        updateConeCube(interaction.customId);
                    }
                    if (interaction.customId == "cycles_button_dec" || interaction.customId == "cycles_button_dec_a" && "lastGamePieceId" in exports.commandMessages[message_1.id]) {
                        lastGamePieceId = exports.commandMessages[message_1.id].lastGamePieceId;
                        if (interactionData[message_1.id][vars_1[lastGamePieceId]] > 0) {
                            interactionData[message_1.id][vars_1[lastGamePieceId]] -= 2;
                            updateConeCube(lastGamePieceId);
                        }
                        else {
                            rows_1.push(message_1.components[0], message_1.components[1]);
                        }
                    }
                    if (interaction.customId == "cycles_button_dec_a") {
                        rows_1.push(message_1.components[2]);
                    }
                    if (["high_cone_a", "mid_cone_a", "low_cone_a", "high_cube_a", "mid_cube_a", "low_cube_a"].indexOf(interaction.customId) != -1) {
                        rows_1.push(message_1.components[2]);
                    }
                    if (interaction.customId == "mobility") {
                        rows_1.push(message_1.components[0], message_1.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message_1.components[2]);
                        if (!interactionData[message_1.id].mobility) {
                            interactionData[message_1.id].mobility = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData[message_1.id].mobility = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows_1.push(rowBuilder);
                    }
                    if (interaction.customId == "charge_station_u") {
                        rows_1.push(message_1.components[0], message_1.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message_1.components[2]);
                        if (!interactionData[message_1.id].chargeStation) {
                            interactionData[message_1.id].chargeStation = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData[message_1.id].chargeStation = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                            interactionData[message_1.id].chargeStationBalance = false;
                            rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows_1.push(rowBuilder);
                    }
                    if (interaction.customId == "charge_station_b") {
                        rows_1.push(message_1.components[0], message_1.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message_1.components[2]);
                        if (!interactionData[message_1.id].chargeStationBalance) {
                            interactionData[message_1.id].chargeStationBalance = true;
                            rowBuilder.components[2].setStyle(discord.ButtonStyle.Success);
                            interactionData[message_1.id].chargeStation = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData[message_1.id].chargeStationBalance = false;
                            rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows_1.push(rowBuilder);
                    }
                    if (interaction.customId == "balance_tu") {
                        rows_1.push(message_1.components[0], message_1.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message_1.components[2]);
                        if (!interactionData[message_1.id].endgameChargeStation) {
                            interactionData[message_1.id].endgameChargeStation = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData[message_1.id].endgameChargeStation = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                            interactionData[message_1.id].endgameChargeStationBalanced = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows_1.push(rowBuilder, message_1.components[3]);
                    }
                    if (interaction.customId == "balance_tb") {
                        rows_1.push(message_1.components[0], message_1.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message_1.components[2]);
                        if (!interactionData[message_1.id].endgameChargeStationBalanced) {
                            interactionData[message_1.id].endgameChargeStationBalanced = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                            interactionData[message_1.id].endgameChargeStation = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData[message_1.id].endgameChargeStationBalanced = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows_1.push(rowBuilder, message_1.components[3]);
                    }
                    if (interaction.customId == "playing_station_single") {
                        rows_1.push(message_1.components[0], message_1.components[1], message_1.components[2]);
                        rowBuilder = discord.ActionRowBuilder.from(message_1.components[3]);
                        if (!interactionData[message_1.id].playerStationSingle) {
                            interactionData[message_1.id].playerStationSingle = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData[message_1.id].playerStationSingle = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows_1.push(rowBuilder);
                    }
                    if (interaction.customId == "playing_station_double") {
                        rows_1.push(message_1.components[0], message_1.components[1], message_1.components[2]);
                        rowBuilder = discord.ActionRowBuilder.from(message_1.components[3]);
                        if (!interactionData[message_1.id].playerStationDouble) {
                            interactionData[message_1.id].playerStationDouble = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData[message_1.id].playerStationDouble = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows_1.push(rowBuilder);
                    }
                    if (["top_pos", "mid_pos", "low_pos"].indexOf(interaction.customId) != -1) {
                        rowBuilder = discord.ActionRowBuilder.from(message_1.components[1]);
                        rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
                        indexes_2 = { "top_pos": 0, "mid_pos": 1, "low_pos": 2 };
                        variableNames = { "top_pos": "startTop", "mid_pos": "startMid", "low_pos": "startLow" };
                        rowBuilder.components[indexes_2[interaction.customId]].setStyle(discord.ButtonStyle.Success);
                        interactionData[message_1.id].top_pos = false;
                        interactionData[message_1.id].mid_pos = false;
                        interactionData[message_1.id].low_pos = false;
                        interactionData[message_1.id][variableNames[interaction.customId]] = true;
                        rows_1.push(message_1.components[0], rowBuilder);
                    }
                    if (!(interaction.customId == "match_number")) return [3, 2];
                    text = new discord.TextInputBuilder()
                        .setStyle(discord.TextInputStyle.Short)
                        .setLabel("Match Number")
                        .setMinLength(1)
                        .setMaxLength(2)
                        .setCustomId("set_match_number");
                    modal = new discord.ModalBuilder()
                        .setCustomId("match_number_" + message_1.channelId + "_" + message_1.id)
                        .setTitle("Input")
                        .addComponents(new discord.ActionRowBuilder().addComponents(text));
                    return [4, interaction.showModal(modal)];
                case 1:
                    _a.sent();
                    updateEmbed = false;
                    _a.label = 2;
                case 2:
                    rows_1.push(selectRow);
                    if (!updateEmbed) return [3, 6];
                    return [4, interaction.deferUpdate()];
                case 3:
                    _a.sent();
                    newEmbed = discord.EmbedBuilder.from(message_1.embeds[0]);
                    return [4, applyEmbedEdit(newEmbed, interactionData[message_1.id])];
                case 4:
                    _a.sent();
                    return [4, interaction.editReply({ content: "", embeds: [newEmbed], components: rows_1 })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2];
            }
        });
    });
}
function handlerStringSelectInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        function constructButton(id, label, key) {
            var style = discord.ButtonStyle.Secondary;
            if (interactionData[message_2.id][key] > 0) {
                style = discord.ButtonStyle.Success;
            }
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        function constructButton(id, label, key) {
            var style = discord.ButtonStyle.Secondary;
            if (interactionData[message_2.id][key] > 0) {
                style = discord.ButtonStyle.Success;
            }
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        var message_2, selectRow, selectMenu, i, j, rows, updateInteraction, value, newEmbed, coneBuilder, cubeBuilder, endgameBuilder, playerStationBuilder, builder, positionBuilder, coneBuilder, cubeBuilder, autoBuilder, auto, misc, tele, modal, label, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.message.id in exports.commandMessages && exports.commandMessages[interaction.message.id].command == "scout")) return [3, 8];
                    message_2 = interaction.message;
                    selectRow = null;
                    selectMenu = null;
                    for (i = 0; i < message_2.components.length; i++) {
                        for (j = 0; j < message_2.components[i].components.length; j++) {
                            if (message_2.components[i].components[j].customId == "selections") {
                                selectRow = message_2.components[i];
                                selectMenu = message_2.components[i].components[j];
                                break;
                            }
                        }
                    }
                    if (!(message_2.id in interactionData)) {
                        interactionData[message_2.id] = {};
                    }
                    rows = [];
                    updateInteraction = true;
                    value = interaction.values[0];
                    newEmbed = discord.EmbedBuilder.from(message_2.embeds[0]);
                    console.log(message_2.id);
                    if (!(value == "game_piece")) return [3, 1];
                    coneBuilder = new discord.ActionRowBuilder();
                    cubeBuilder = new discord.ActionRowBuilder();
                    endgameBuilder = new discord.ActionRowBuilder();
                    playerStationBuilder = new discord.ActionRowBuilder();
                    coneBuilder.addComponents(constructButton("high_cone", "High Cone", "highCone"));
                    coneBuilder.addComponents(constructButton("mid_cone", "Mid Cone", "midCone"));
                    coneBuilder.addComponents(constructButton("low_cone", "Low Cone", "lowCone"));
                    cubeBuilder.addComponents(constructButton("high_cube", "High Cube", "highCube"));
                    cubeBuilder.addComponents(constructButton("mid_cube", "Mid Cube", "midCube"));
                    cubeBuilder.addComponents(constructButton("low_cube", "Low Cube", "lowCone"));
                    cubeBuilder.addComponents(new discord.ButtonBuilder().setCustomId("cycles_button_dec").setStyle(discord.ButtonStyle.Danger).setLabel("-1 Last Button"));
                    endgameBuilder.addComponents(new discord.ButtonBuilder().setCustomId("balance_tu").setLabel("Charge Station")
                        .setStyle(interactionData[message_2.id].endgameChargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder()
                        .setCustomId("balance_tb").setLabel("Balanced Station")
                        .setStyle(interactionData[message_2.id].endgameChargeStationBalanced ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    playerStationBuilder.addComponents(new discord.ButtonBuilder().setCustomId("playing_station_single").setLabel("Single Player Station")
                        .setStyle(interactionData[message_2.id].playerStationSingle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setCustomId("playing_station_double").setLabel("Playing Station Double")
                        .setStyle(interactionData[message_2.id].playerStationDouble ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    rows.push(coneBuilder, cubeBuilder, endgameBuilder, playerStationBuilder);
                    newEmbed.setFooter({ text: "Editing game piece data." });
                    return [3, 5];
                case 1:
                    if (!(value == "game_data")) return [3, 2];
                    builder = new discord.ActionRowBuilder()
                        .addComponents(new discord.ButtonBuilder().setLabel("Set Match Number").setCustomId("match_number").setStyle(discord.ButtonStyle.Secondary));
                    positionBuilder = new discord.ActionRowBuilder()
                        .addComponents(new discord.ButtonBuilder().setLabel("Top").setCustomId("top_pos")
                        .setStyle(interactionData[message_2.id].startTop ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Middle").setCustomId("mid_pos")
                        .setStyle(interactionData[message_2.id].stopMiddle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Low").setCustomId("low_pos")
                        .setStyle(interactionData[message_2.id].stopLow ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    rows.push(builder, positionBuilder);
                    newEmbed.setFooter({ text: "Editing game data." });
                    return [3, 5];
                case 2:
                    if (!(value == "autonomous")) return [3, 3];
                    coneBuilder = new discord.ActionRowBuilder();
                    cubeBuilder = new discord.ActionRowBuilder();
                    autoBuilder = new discord.ActionRowBuilder();
                    coneBuilder.addComponents(constructButton("high_cone_a", "High Cone", "highConeAuto"));
                    coneBuilder.addComponents(constructButton("mid_cone_a", "Mid Cone", "midConeAuto"));
                    coneBuilder.addComponents(constructButton("low_cone_a", "Low Cone", "lowConeAuto"));
                    cubeBuilder.addComponents(constructButton("high_cube_a", "High Cube", "highCubeAuto"));
                    cubeBuilder.addComponents(constructButton("mid_cube_a", "Mid Cube", "midCubeAuto"));
                    cubeBuilder.addComponents(constructButton("low_cube_a", "Low Cube", "lowConeAuto"));
                    coneBuilder.addComponents(new discord.ButtonBuilder().setCustomId("cycles_button_dec_a").setStyle(discord.ButtonStyle.Danger).setLabel("-1 Last Button"));
                    autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("mobility")
                        .setStyle(interactionData[message_2.id].mobility ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Mobility"));
                    autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_u")
                        .setStyle(interactionData[message_2.id].chargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Charge Station"));
                    autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_b")
                        .setStyle(interactionData[message_2.id].chargeStationBalance ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Balanced Station"));
                    rows.push(coneBuilder, cubeBuilder, autoBuilder);
                    newEmbed.setFooter({ text: "Editing autonomous data." });
                    return [3, 5];
                case 3:
                    if (!(value == "notes")) return [3, 5];
                    auto = new discord.TextInputBuilder()
                        .setStyle(discord.TextInputStyle.Paragraph)
                        .setLabel("Autonomous Notes")
                        .setMinLength(0)
                        .setMaxLength(2000)
                        .setCustomId("auto_notes")
                        .setPlaceholder("No notes")
                        .setRequired(false)
                        .setValue(interactionData[message_2.id].autoNotes);
                    misc = new discord.TextInputBuilder()
                        .setStyle(discord.TextInputStyle.Paragraph)
                        .setLabel("Autonomous Notes")
                        .setMinLength(0)
                        .setMaxLength(2000)
                        .setPlaceholder("No notes")
                        .setCustomId("tele_notes")
                        .setRequired(false)
                        .setValue(interactionData[message_2.id].teleNotes);
                    tele = new discord.TextInputBuilder()
                        .setStyle(discord.TextInputStyle.Paragraph)
                        .setLabel("Autonomous Notes")
                        .setMinLength(0)
                        .setMaxLength(2000)
                        .setPlaceholder("No notes")
                        .setCustomId("misc_notes")
                        .setRequired(false)
                        .setValue(interactionData[message_2.id].miscNotes);
                    modal = new discord.ModalBuilder()
                        .setCustomId("set_notes_" + message_2.channelId + "_" + message_2.id)
                        .setTitle("Input")
                        .addComponents(new discord.ActionRowBuilder().addComponents(auto), new discord.ActionRowBuilder().addComponents(tele), new discord.ActionRowBuilder().addComponents(misc));
                    return [4, interaction.showModal(modal)];
                case 4:
                    _a.sent();
                    updateInteraction = false;
                    _a.label = 5;
                case 5:
                    label = null;
                    for (i = 0; i < selectMenu.data.options.length; i++) {
                        if (selectMenu.data.options[i].value == value) {
                            label = selectMenu.data.options[i].label;
                            break;
                        }
                    }
                    selectMenu.data.placeholder = label;
                    if (!updateInteraction) return [3, 7];
                    return [4, interaction.update({ content: "" })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    rows.push(selectRow);
                    message_2.edit({ embeds: [newEmbed], components: rows });
                    _a.label = 8;
                case 8: return [2];
            }
        });
    });
}
function handleChatInputCommandInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (interaction.commandName == "scout") {
            }
            return [2];
        });
    });
}
function handleModalSubmitInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var split, messageId, channelId, channel, message, newEmbed, split, channelId, messageId, channel, message, newEmbed, split, channelId, messageId, channel, message, newEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!interaction.customId.startsWith("cycle_modal")) return [3, 4];
                    split = interaction.customId.split("_");
                    messageId = split[2];
                    channelId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    interactionData[messageId].cycles = interaction.fields.getField("cycle_input").value;
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 1:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, interactionData[message.id])];
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
                    interactionData[messageId].matchNumber = interaction.fields.getField("set_match_number").value;
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 5:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, interactionData[message.id])];
                case 6:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (!interaction.customId.startsWith("set_notes")) return [3, 12];
                    split = interaction.customId.split("_");
                    channelId = split[2];
                    messageId = split[3];
                    channel = exports.client.channels.cache.get(channelId);
                    message = channel.messages.cache.get(messageId);
                    interactionData[messageId].autoNotes = interaction.fields.getField("auto_notes").value;
                    interactionData[messageId].teleNotes = interaction.fields.getField("tele_notes").value;
                    interactionData[messageId].miscNotes = interaction.fields.getField("misc_notes").value;
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interaction.deferUpdate()];
                case 9:
                    _a.sent();
                    return [4, applyEmbedEdit(newEmbed, interactionData[message.id])];
                case 10:
                    _a.sent();
                    return [4, message.edit({ content: "", embeds: [newEmbed], components: message.components })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2];
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
                    return [4, handlerStringSelectInteraction(interaction)];
                case 1:
                    _a.sent();
                    return [3, 8];
                case 2:
                    if (!interaction.isButton()) return [3, 4];
                    return [4, handlerButtonInteraction(interaction)];
                case 3:
                    _a.sent();
                    return [3, 8];
                case 4:
                    if (!interaction.isChatInputCommand()) return [3, 6];
                    return [4, handleChatInputCommandInteraction(interaction)];
                case 5:
                    _a.sent();
                    return [3, 8];
                case 6:
                    if (!interaction.isModalSubmit()) return [3, 8];
                    return [4, handleModalSubmitInteraction(interaction)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2];
            }
        });
    });
}
exports.handleInteraction = handleInteraction;
