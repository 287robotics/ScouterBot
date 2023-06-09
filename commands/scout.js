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
exports.execute = exports.handleStringSelectInteraction = exports.handleButtonInteraction = exports.data = void 0;
var discord = require("discord.js");
var interactionHandler = require("../interactionHandler");
var database = require("../database");
exports.data = new discord.SlashCommandBuilder()
    .setName('scout')
    .setDescription('piss your\'e pant AGIAN')
    .addNumberOption(function (option) {
    return option.setName("teamnumber")
        .setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
        .setRequired(true);
});
function handleButtonInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        function updateConeCube(id) {
            var rowBuilder = null;
            interactionHandler.commandMessages[interaction.message.id].lastGamePieceId = id;
            if (id.indexOf("cone") != -1) {
                rowBuilder = discord.ActionRowBuilder.from(message.components[0]);
                rows.push(rowBuilder, message.components[1], message.components[2]);
            }
            else {
                rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
                rows.push(message.components[0], rowBuilder, message.components[2]);
            }
            if (message.components.length == 5) {
                rows.push(message.components[3]);
            }
            interactionData[vars[id]] += 1;
            if (interactionData[vars[id]] > 0) {
                rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Success);
            }
            else {
                rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Secondary);
            }
        }
        var message, rows, selectRow, updateEmbed, interactionData, indexes, vars, lastGamePieceId, rowBuilder, rowBuilder, rowBuilder, rowBuilder, rowBuilder, data_1, rowBuilder, rowBuilder, rowBuilder, indexes_1, variableNames, rowBuilder, rowBuilder, rowBuilder, text, modal, newEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = interaction["message"];
                    rows = [];
                    selectRow = message.components[message.components.length - 1];
                    updateEmbed = true;
                    interactionData = interactionHandler.interactionData[message.id];
                    indexes = { "high_cone": 0, "mid_cone": 1, "low_cone": 2, "high_cube": 0, "mid_cube": 1, "low_cube": 2,
                        "high_cone_a": 0, "mid_cone_a": 1, "low_cone_a": 2, "high_cube_a": 0, "mid_cube_a": 1, "low_cube_a": 2 };
                    vars = { "high_cone": "highCone", "mid_cone": "midCone", "low_cone": "lowCone", "high_cube": "highCube", "mid_cube": "midCube", "low_cube": "lowCube",
                        "high_cone_a": "highConeAuto", "mid_cone_a": "midConeAuto", "low_cone_a": "lowConeAuto", "high_cube_a": "highCubeAuto", "mid_cube_a": "midCubeAuto", "low_cube_a": "lowCubeAuto" };
                    if (["high_cone", "mid_cone", "low_cone", "high_cube", "mid_cube", "low_cube",
                        "high_cone_a", "mid_cone_a", "low_cone_a", "high_cube_a", "mid_cube_a", "low_cube_a"].indexOf(interaction.customId) != -1) {
                        updateConeCube(interaction.customId);
                    }
                    if ((interaction.customId == "cycles_button_dec" || interaction.customId == "cycles_button_dec_a") && "lastGamePieceId") {
                        lastGamePieceId = interactionHandler.commandMessages[message.id].lastGamePieceId;
                        if (lastGamePieceId && interactionData[vars[lastGamePieceId]] > 0) {
                            interactionData[vars[lastGamePieceId]] -= 2;
                            updateConeCube(lastGamePieceId);
                        }
                        else {
                            rows.push(message.components[0], message.components[1], message.components[2]);
                            if (message.components.length == 5) {
                                rows.push(message.components[3]);
                            }
                        }
                    }
                    if (interaction.customId == "cycles_button_dec_a") {
                    }
                    if (interaction.customId == "mobility") {
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
                        if (!interactionData.mobility) {
                            interactionData.mobility = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData.mobility = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder);
                    }
                    if (interaction.customId == "charge_station_u") {
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
                        if (!interactionData.chargeStation) {
                            interactionData.chargeStation = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData.chargeStation = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                            interactionData.chargeStationBalance = false;
                            rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder);
                    }
                    if (interaction.customId == "charge_station_b") {
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
                        if (!interactionData.chargeStationBalance) {
                            interactionData.chargeStationBalance = true;
                            rowBuilder.components[2].setStyle(discord.ButtonStyle.Success);
                            interactionData.chargeStation = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData.chargeStationBalance = false;
                            rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder);
                    }
                    if (interaction.customId == "balance_tu") {
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
                        if (!interactionData.endgameChargeStation) {
                            interactionData.endgameChargeStation = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData.endgameChargeStation = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                            interactionData.endgameChargeStationBalanced = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder, message.components[3]);
                    }
                    if (interaction.customId == "balance_tb") {
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
                        if (!interactionData.endgameChargeStationBalanced) {
                            interactionData.endgameChargeStationBalanced = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                            interactionData.endgameChargeStation = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData.endgameChargeStationBalanced = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder, message.components[3]);
                    }
                    if (!(interaction.customId == "submit_button")) return [3, 3];
                    return [4, interaction.update({ content: "" })];
                case 1:
                    _a.sent();
                    return [4, message.delete()];
                case 2:
                    _a.sent();
                    data_1 = {
                        teamNumber: interactionData.teamNumber,
                        qualNumber: interactionData.matchNumber,
                        autoJson: {
                            cubes: {
                                low: interactionData.lowCubeAuto,
                                mid: interactionData.midCubeAuto,
                                high: interactionData.highCubeAuto
                            },
                            cones: {
                                low: interactionData.lowConeAuto,
                                mid: interactionData.midConeAuto,
                                high: interactionData.highConeAuto
                            },
                            onCharge: interactionData.chargeStation,
                            balance: interactionData.chargeStationBalance,
                            totalPoints: 0,
                            notes: interactionData.autoNotes
                        },
                        teleJson: {
                            cubes: {
                                low: interactionData.lowCube,
                                mid: interactionData.midCube,
                                high: interactionData.highCube
                            },
                            cones: {
                                low: interactionData.lowCone,
                                mid: interactionData.midCone,
                                high: interactionData.highCone
                            },
                            onCharge: interactionData.endgameChargeStation,
                            balance: interactionData.endgameChargeStationBalanced,
                            totalPoints: 0,
                            notes: interactionData.teleNotes
                        },
                        mobility: interactionData.mobility,
                        startingGrid: interactionData.startTop ? 0 : (interactionData.startMiddle ? 1 : 2),
                        substation: (interactionData.playerStationSingle ? 1 : 0) + (interactionData.playerStationDouble ? 2 : 0),
                        cycleTime: 120 / (interactionData.cycles + 1),
                        scouter: 82734023
                    };
                    database.addMatchRecord(data_1);
                    return [2];
                case 3:
                    if (interaction.customId == "playing_station_single") {
                        rows.push(message.components[0], message.components[1], message.components[2]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[3]);
                        if (!interactionData.playerStationSingle) {
                            interactionData.playerStationSingle = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData.playerStationSingle = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder);
                    }
                    if (interaction.customId == "playing_station_double") {
                        rows.push(message.components[0], message.components[1], message.components[2]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[3]);
                        if (!interactionData.playerStationDouble) {
                            interactionData.playerStationDouble = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData.playerStationDouble = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder);
                    }
                    if (["top_pos", "mid_pos", "low_pos"].indexOf(interaction.customId) != -1) {
                        rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
                        rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
                        indexes_1 = { "top_pos": 0, "mid_pos": 1, "low_pos": 2 };
                        variableNames = { "top_pos": "startTop", "mid_pos": "startMid", "low_pos": "startLow" };
                        rowBuilder.components[indexes_1[interaction.customId]].setStyle(discord.ButtonStyle.Success);
                        interactionData.top_pos = false;
                        interactionData.mid_pos = false;
                        interactionData.low_pos = false;
                        interactionData[variableNames[interaction.customId]] = true;
                        rows.push(message.components[0], rowBuilder, message.components[2]);
                    }
                    if (interaction.customId == "qual") {
                        rowBuilder = discord.ActionRowBuilder.from(message.components[0]);
                        if (!interactionData.quals) {
                            interactionData.quals = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                        }
                        else {
                            interactionData.quals = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder, message.components[1], message.components[2]);
                    }
                    if (interaction.customId == "pre_cone") {
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
                        if (!interactionData.preloadedCone) {
                            interactionData.preloadedCone = true;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
                            interactionData.preloadedCube = false;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        }
                        else {
                            interactionData.preloadedCone = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder);
                    }
                    if (interaction.customId == "pre_cube") {
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
                        if (!interactionData.preloadedCube) {
                            interactionData.preloadedCube = true;
                            rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                            interactionData.preloadedCone = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        }
                        else {
                            interactionData.preloadedCube = false;
                            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        }
                        rows.push(rowBuilder);
                    }
                    if (!(interaction.customId == "match_number")) return [3, 5];
                    text = new discord.TextInputBuilder()
                        .setStyle(discord.TextInputStyle.Short)
                        .setLabel("Match Number")
                        .setMinLength(1)
                        .setMaxLength(2)
                        .setCustomId("set_match_number");
                    modal = new discord.ModalBuilder()
                        .setCustomId("match_number_" + message.channelId + "_" + message.id)
                        .setTitle("Input")
                        .addComponents(new discord.ActionRowBuilder().addComponents(text));
                    return [4, interaction.showModal(modal)];
                case 4:
                    _a.sent();
                    updateEmbed = false;
                    _a.label = 5;
                case 5:
                    if (!(interaction.customId == "discard_button")) return [3, 8];
                    return [4, interaction.update({ content: "" })];
                case 6:
                    _a.sent();
                    return [4, message.delete()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    rows.push(selectRow);
                    if (!updateEmbed) return [3, 12];
                    return [4, interaction.deferUpdate()];
                case 9:
                    _a.sent();
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interactionHandler.applyEmbedEdit(newEmbed, interactionData)];
                case 10:
                    _a.sent();
                    return [4, interaction.editReply({ content: "", embeds: [newEmbed], components: rows })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2];
            }
        });
    });
}
exports.handleButtonInteraction = handleButtonInteraction;
function handleStringSelectInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        function constructButton(id, label, key) {
            var style = discord.ButtonStyle.Secondary;
            if (interactionData[key] > 0) {
                style = discord.ButtonStyle.Success;
            }
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        function constructButton(id, label, key) {
            var style = discord.ButtonStyle.Secondary;
            if (interactionData[key] > 0) {
                style = discord.ButtonStyle.Success;
            }
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        var message, selectRow, selectMenu, interactionData, i, j, rows, updateInteraction, value, newEmbed, coneBuilder, cubeBuilder, endgameBuilder, playerStationBuilder, builder, positionBuilder, preloadRow, coneBuilder, cubeBuilder, autoBuilder, auto, misc, tele, modal, row, label, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = interaction.message;
                    selectRow = null;
                    selectMenu = null;
                    interactionData = interactionHandler.interactionData[message.id];
                    for (i = 0; i < message.components.length; i++) {
                        for (j = 0; j < message.components[i].components.length; j++) {
                            if (message.components[i].components[j].customId == "selections") {
                                selectRow = message.components[i];
                                selectMenu = message.components[i].components[j];
                                break;
                            }
                        }
                    }
                    rows = [];
                    updateInteraction = true;
                    value = interaction.values[0];
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    console.log(message.id);
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
                        .setStyle(interactionData.endgameChargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder()
                        .setCustomId("balance_tb").setLabel("Balanced Station")
                        .setStyle(interactionData.endgameChargeStationBalanced ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    playerStationBuilder.addComponents(new discord.ButtonBuilder().setCustomId("playing_station_single").setLabel("Single Player Station")
                        .setStyle(interactionData.playerStationSingle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setCustomId("playing_station_double").setLabel("Playing Station Double")
                        .setStyle(interactionData.playerStationDouble ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    rows.push(coneBuilder, cubeBuilder, endgameBuilder, playerStationBuilder);
                    newEmbed.setFooter({ text: "Editing game piece data." });
                    return [3, 6];
                case 1:
                    if (!(value == "game_data")) return [3, 2];
                    builder = new discord.ActionRowBuilder()
                        .addComponents(new discord.ButtonBuilder().setLabel("Set Match Number").setCustomId("match_number").setStyle(discord.ButtonStyle.Secondary), new discord.ButtonBuilder().setLabel("Qualification").setCustomId("qual")
                        .setStyle(interactionData.quals ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    positionBuilder = new discord.ActionRowBuilder()
                        .addComponents(new discord.ButtonBuilder().setLabel("Top").setCustomId("top_pos")
                        .setStyle(interactionData.startTop ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Middle").setCustomId("mid_pos")
                        .setStyle(interactionData.startMiddle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Low").setCustomId("low_pos")
                        .setStyle(interactionData.startLow ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    preloadRow = new discord.ActionRowBuilder()
                        .addComponents(new discord.ButtonBuilder().setLabel("Preloaded Cone").setCustomId("pre_cone")
                        .setStyle(interactionData.preloadedCone ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Preloaded Cube").setCustomId("pre_cube")
                        .setStyle(interactionData.preloadedCube ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    rows.push(builder, positionBuilder, preloadRow);
                    newEmbed.setFooter({ text: "Editing game data." });
                    return [3, 6];
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
                        .setStyle(interactionData.mobility ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Mobility"));
                    autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_u")
                        .setStyle(interactionData.chargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Charge Station"));
                    autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_b")
                        .setStyle(interactionData.chargeStationBalance ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Balanced Station"));
                    rows.push(coneBuilder, cubeBuilder, autoBuilder);
                    newEmbed.setFooter({ text: "Editing autonomous data." });
                    return [3, 6];
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
                        .setValue(interactionData.autoNotes);
                    misc = new discord.TextInputBuilder()
                        .setStyle(discord.TextInputStyle.Paragraph)
                        .setLabel("TeleOp Notes")
                        .setMinLength(0)
                        .setMaxLength(2000)
                        .setPlaceholder("No notes")
                        .setCustomId("tele_notes")
                        .setRequired(false)
                        .setValue(interactionData.teleNotes);
                    tele = new discord.TextInputBuilder()
                        .setStyle(discord.TextInputStyle.Paragraph)
                        .setLabel("Misc Notes")
                        .setMinLength(0)
                        .setMaxLength(2000)
                        .setPlaceholder("No notes")
                        .setCustomId("misc_notes")
                        .setRequired(false)
                        .setValue(interactionData.miscNotes);
                    modal = new discord.ModalBuilder()
                        .setCustomId("set_notes_" + message.channelId + "_" + message.id)
                        .setTitle("Input")
                        .addComponents(new discord.ActionRowBuilder().addComponents(auto), new discord.ActionRowBuilder().addComponents(tele), new discord.ActionRowBuilder().addComponents(misc));
                    return [4, interaction.showModal(modal)];
                case 4:
                    _a.sent();
                    updateInteraction = false;
                    return [3, 6];
                case 5:
                    if (value == "submit") {
                        row = new discord.ActionRowBuilder().addComponents(new discord.ButtonBuilder().setCustomId("submit_button").setLabel("Confirm")
                            .setStyle(discord.ButtonStyle.Success), new discord.ButtonBuilder().setCustomId("discard_button").setLabel("Discard")
                            .setStyle(discord.ButtonStyle.Danger));
                        rows.push(row);
                    }
                    _a.label = 6;
                case 6:
                    label = null;
                    for (i = 0; i < selectMenu.data.options.length; i++) {
                        if (selectMenu.data.options[i].value == value) {
                            label = selectMenu.data.options[i].label;
                            break;
                        }
                    }
                    selectMenu.data.placeholder = label;
                    if (!updateInteraction) return [3, 8];
                    return [4, interaction.update({ content: "" })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    rows.push(selectRow);
                    message.edit({ embeds: [newEmbed], components: rows });
                    return [2];
            }
        });
    });
}
exports.handleStringSelectInteraction = handleStringSelectInteraction;
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var teamNumber, embed, row, message, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    teamNumber = interaction.options.getNumber("teamnumber");
                    embed = new discord.EmbedBuilder()
                        .setTitle("Scouting " + teamNumber);
                    row = new discord.ActionRowBuilder()
                        .addComponents(new discord.StringSelectMenuBuilder()
                        .setCustomId('selections')
                        .setPlaceholder('Nothing selected')
                        .addOptions({
                        label: 'Prematch Data',
                        description: 'Pre-Match data.',
                        value: 'game_data',
                    }, {
                        label: "Autonomous",
                        description: "Autonomous data",
                        value: "autonomous"
                    }, {
                        label: 'TeleOp',
                        description: 'TeleOp data',
                        value: 'game_piece',
                    }, {
                        label: "Notes",
                        description: "Notes and stuff",
                        value: "notes"
                    }, {
                        label: "Submit",
                        description: "Submit information",
                        value: "submit"
                    }));
                    if (!(interaction.channel != null && !interaction.channel.isDMBased())) return [3, 4];
                    return [4, interaction.deferReply({ ephemeral: true })];
                case 1:
                    _a.sent();
                    return [4, interaction.user.send({ embeds: [embed], components: [row] })];
                case 2:
                    message = _a.sent();
                    interactionHandler.commandMessages[message.id] = {};
                    interactionHandler.commandMessages[message.id].command = "scout";
                    interactionHandler.doDmInit(message, teamNumber, Number(interaction.user.id));
                    return [4, interaction.editReply({ content: "Scout sheet has been sent to your dm" })];
                case 3:
                    _a.sent();
                    return [3, 8];
                case 4: return [4, interaction.deferReply({ ephemeral: true })];
                case 5:
                    _a.sent();
                    return [4, interaction.user.send({ embeds: [embed], components: [row] })];
                case 6:
                    message = _a.sent();
                    interactionHandler.commandMessages[message.id] = {};
                    interactionHandler.commandMessages[message.id].command = "scout";
                    interactionHandler.doDmInit(message, teamNumber, Number(interaction.user.id));
                    return [4, interaction.deleteReply()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2];
            }
        });
    });
}
exports.execute = execute;
