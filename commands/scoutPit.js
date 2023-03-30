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
var database_1 = require("../database");
exports.data = new discord.SlashCommandBuilder()
    .setName('scoutpit')
    .setDescription('piss your\'e pant')
    .addNumberOption(function (option) {
    return option.setName("teamnumber")
        .setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
        .setRequired(true);
});
function handleButtonInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var message, interactionData, rows, selectRow, updateEmbed, rowBuilder, rowBuilder, rowBuilder, rowBuilder, rowBuilder, h_cone, m_cone, l_cone, modal, h_cone, m_cone, l_cone, modal, h_cone, m_cone, l_cone, modal, h_cone, m_cone, l_cone, modal, rowBuilder, rowBuilder, rowBuilder, rowBuilder, indexes, vals, rowBuilder, rowBuilder, indexes, variableNames, data_1, newEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = interaction.message;
                    interactionData = interactionHandler.interactionData[message.id];
                    rows = [];
                    selectRow = message.components[message.components.length - 1];
                    updateEmbed = true;
                    if (interaction.customId == "mobility") {
                        rows.push(message.components[0]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
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
                        rows.push(message.components[0]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
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
                        rows.push(message.components[0]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
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
                        rows.push(message.components[0]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
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
                        rows.push(rowBuilder, message.components[2]);
                    }
                    if (interaction.customId == "balance_tb") {
                        rows.push(message.components[0]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
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
                        rows.push(rowBuilder, message.components[2]);
                    }
                    if (!(interaction.customId == "high_cone")) return [3, 2];
                    h_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("high_cones")
                        .setLabel("High");
                    m_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("mid_cones")
                        .setLabel("Middle");
                    l_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("low_cones")
                        .setLabel("Low");
                    modal = new discord.ModalBuilder()
                        .setCustomId("set_cone_" + message.channelId + "_" + message.id)
                        .setTitle("Input Cones")
                        .addComponents(new discord.ActionRowBuilder().addComponents(h_cone), new discord.ActionRowBuilder().addComponents(m_cone), new discord.ActionRowBuilder().addComponents(l_cone));
                    return [4, interaction.showModal(modal)];
                case 1:
                    _a.sent();
                    updateEmbed = false;
                    _a.label = 2;
                case 2:
                    if (!(interaction.customId == "high_cube")) return [3, 4];
                    h_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("high_cubes")
                        .setLabel("High");
                    m_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("mid_cubes")
                        .setLabel("Middle");
                    l_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("low_cubes")
                        .setLabel("Low");
                    modal = new discord.ModalBuilder()
                        .setCustomId("set_cube_" + message.channelId + "_" + message.id)
                        .setTitle("Input Cube")
                        .addComponents(new discord.ActionRowBuilder().addComponents(h_cone), new discord.ActionRowBuilder().addComponents(m_cone), new discord.ActionRowBuilder().addComponents(l_cone));
                    return [4, interaction.showModal(modal)];
                case 3:
                    _a.sent();
                    updateEmbed = false;
                    _a.label = 4;
                case 4:
                    if (!(interaction.customId == "high_cube_a")) return [3, 6];
                    h_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("high_cubes")
                        .setLabel("High");
                    m_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("mid_cubes")
                        .setLabel("Middle");
                    l_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("low_cubes")
                        .setLabel("Low");
                    modal = new discord.ModalBuilder()
                        .setCustomId("aset_cube_" + message.channelId + "_" + message.id)
                        .setTitle("Input Cube")
                        .addComponents(new discord.ActionRowBuilder().addComponents(h_cone), new discord.ActionRowBuilder().addComponents(m_cone), new discord.ActionRowBuilder().addComponents(l_cone));
                    return [4, interaction.showModal(modal)];
                case 5:
                    _a.sent();
                    updateEmbed = false;
                    _a.label = 6;
                case 6:
                    if (!(interaction.customId == "high_cone_a")) return [3, 8];
                    h_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("high_cones")
                        .setLabel("High");
                    m_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("mid_cones")
                        .setLabel("Middle");
                    l_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
                        .setRequired(false)
                        .setCustomId("low_cones")
                        .setLabel("Low");
                    modal = new discord.ModalBuilder()
                        .setCustomId("aset_cone_" + message.channelId + "_" + message.id)
                        .setTitle("Input Cone")
                        .addComponents(new discord.ActionRowBuilder().addComponents(h_cone), new discord.ActionRowBuilder().addComponents(m_cone), new discord.ActionRowBuilder().addComponents(l_cone));
                    return [4, interaction.showModal(modal)];
                case 7:
                    _a.sent();
                    updateEmbed = false;
                    _a.label = 8;
                case 8:
                    if (interaction.customId == "pre_cone") {
                        rows.push(message.components[0]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
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
                        rows.push(rowBuilder, message.components[2]);
                    }
                    if (interaction.customId == "pre_cube") {
                        rows.push(message.components[0]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
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
                        rows.push(rowBuilder, message.components[2]);
                    }
                    if (interaction.customId == "playing_station_single") {
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
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
                        rows.push(message.components[0], message.components[1]);
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
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
                    if (["tank", "swerve", "other"].indexOf(interaction.customId) != -1) {
                        rows.push(message.components[0], message.components[1]);
                        indexes = { "tank": 1, "swerve": 0, "other": 2 };
                        vals = { "tank": 0, "swerve": 1, "other": 2 };
                        rowBuilder = discord.ActionRowBuilder.from(message.components[2]);
                        rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[indexes[interaction.customId]].setStyle(discord.ButtonStyle.Success);
                        interactionData.drivetrain = vals[interaction.customId];
                        rows.push(rowBuilder);
                    }
                    if (["top_pos", "mid_pos", "low_pos"].indexOf(interaction.customId) != -1) {
                        rowBuilder = discord.ActionRowBuilder.from(message.components[0]);
                        rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                        rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
                        indexes = { "top_pos": 0, "mid_pos": 1, "low_pos": 2 };
                        variableNames = { "top_pos": "startTop", "mid_pos": "startMid", "low_pos": "startLow" };
                        rowBuilder.components[indexes[interaction.customId]].setStyle(discord.ButtonStyle.Success);
                        interactionData.top_pos = false;
                        interactionData.mid_pos = false;
                        interactionData.low_pos = false;
                        interactionData[variableNames[interaction.customId]] = true;
                        rows.push(rowBuilder, message.components[1], message.components[2]);
                    }
                    if (!(interaction.customId == "submit_button")) return [3, 11];
                    data_1 = {
                        teamNumber: interactionData.teamNumber,
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
                        scouter: 82734023,
                        drivetrain: interactionData.drivetrain,
                        botNote: interactionData.miscNotes
                    };
                    (0, database_1.addBotData)(data_1);
                    return [4, interaction.update({ content: "" })];
                case 9:
                    _a.sent();
                    return [4, message.delete()];
                case 10:
                    _a.sent();
                    return [2];
                case 11:
                    rows.push(selectRow);
                    if (!updateEmbed) return [3, 15];
                    return [4, interaction.deferUpdate()];
                case 12:
                    _a.sent();
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, interactionHandler.applyEmbedEdit(newEmbed, interactionData)];
                case 13:
                    _a.sent();
                    return [4, interaction.editReply({ content: "", embeds: [newEmbed], components: rows })];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15: return [2];
            }
        });
    });
}
exports.handleButtonInteraction = handleButtonInteraction;
function handleStringSelectInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        function constructButton(id, label, key) {
            var style = discord.ButtonStyle.Secondary;
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        function constructButton(id, label, key) {
            var style = discord.ButtonStyle.Secondary;
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        var message, selectRow, selectMenu, interactionData, i, j, rows, updateInteraction, value, newEmbed, coneBuilder, endgameBuilder, playerStationBuilder, positionBuilder, preloadRow, driveTrainRow, coneBuilder, autoBuilder, auto, misc, tele, modal, row, label, i;
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
                    if (!(value == "game_piece")) return [3, 1];
                    coneBuilder = new discord.ActionRowBuilder();
                    endgameBuilder = new discord.ActionRowBuilder();
                    playerStationBuilder = new discord.ActionRowBuilder();
                    coneBuilder.addComponents(constructButton("high_cone", "Cones", ""));
                    coneBuilder.addComponents(constructButton("high_cube", "Cubes", ""));
                    endgameBuilder.addComponents(new discord.ButtonBuilder().setCustomId("balance_tu").setLabel("Charge Station")
                        .setStyle(interactionData.endgameChargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder()
                        .setCustomId("balance_tb").setLabel("Balanced Station")
                        .setStyle(interactionData.endgameChargeStationBalanced ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    playerStationBuilder.addComponents(new discord.ButtonBuilder().setCustomId("playing_station_single").setLabel("Single Player Station")
                        .setStyle(interactionData.playerStationSingle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setCustomId("playing_station_double").setLabel("Playing Station Double")
                        .setStyle(interactionData.playerStationDouble ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    rows.push(coneBuilder, endgameBuilder, playerStationBuilder);
                    newEmbed.setFooter({ text: "Editing game piece data." });
                    return [3, 6];
                case 1:
                    if (!(value == "game_data")) return [3, 2];
                    positionBuilder = new discord.ActionRowBuilder()
                        .addComponents(new discord.ButtonBuilder().setLabel("Top").setCustomId("top_pos")
                        .setStyle(interactionData.startTop ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Middle").setCustomId("mid_pos")
                        .setStyle(interactionData.startMiddle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Low").setCustomId("low_pos")
                        .setStyle(interactionData.startLow ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    preloadRow = new discord.ActionRowBuilder()
                        .addComponents(new discord.ButtonBuilder().setLabel("Preloaded Cone").setCustomId("pre_cone")
                        .setStyle(interactionData.preloadedCone ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Preloaded Cube").setCustomId("pre_cube")
                        .setStyle(interactionData.preloadedCube ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    driveTrainRow = new discord.ActionRowBuilder()
                        .addComponents(new discord.ButtonBuilder().setLabel("Swerve").setCustomId("swerve")
                        .setStyle(interactionData.drivetrain == 1 ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Tank").setCustomId("tank")
                        .setStyle(interactionData.drivetrain == 0 ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger), new discord.ButtonBuilder().setLabel("Other").setCustomId("other")
                        .setStyle(interactionData.drivetrain == 2 ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                    rows.push(positionBuilder, preloadRow, driveTrainRow);
                    newEmbed.setFooter({ text: "Editing game data." });
                    return [3, 6];
                case 2:
                    if (!(value == "autonomous")) return [3, 3];
                    coneBuilder = new discord.ActionRowBuilder();
                    autoBuilder = new discord.ActionRowBuilder();
                    coneBuilder.addComponents(constructButton("high_cone_a", "Cone", "highConeAuto"));
                    coneBuilder.addComponents(constructButton("high_cube_a", "Cube", "midConeAuto"));
                    autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("mobility")
                        .setStyle(interactionData.mobility ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Mobility"));
                    autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_u")
                        .setStyle(interactionData.chargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Charge Station"));
                    autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_b")
                        .setStyle(interactionData.chargeStationBalance ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                        .setLabel("Balanced Station"));
                    rows.push(coneBuilder, autoBuilder);
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
                        row = new discord.ActionRowBuilder().addComponents(new discord.ButtonBuilder().setCustomId("submit_button").setLabel("Confirm").setStyle(discord.ButtonStyle.Success));
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
                    rows.push(selectRow);
                    selectMenu.data.placeholder = label;
                    if (!updateInteraction) return [3, 9];
                    return [4, interaction.deferUpdate()];
                case 7:
                    _a.sent();
                    return [4, interaction.editReply({ embeds: [newEmbed], components: rows })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2];
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
                    if (!(interaction.channel != null && !interaction.channel.isDMBased())) return [3, 3];
                    return [4, interaction.deferReply({ ephemeral: true })];
                case 1:
                    _a.sent();
                    return [4, interaction.user.send({ embeds: [embed], components: [row] })];
                case 2:
                    message = _a.sent();
                    interactionHandler.commandMessages[message.id] = {};
                    interactionHandler.commandMessages[message.id].command = "scoutPit";
                    interactionHandler.doDmInit(message, teamNumber, Number(interaction.user.id));
                    interaction.editReply({ content: "Scout sheet has been sent to your dm" });
                    return [3, 7];
                case 3: return [4, interaction.deferReply({ ephemeral: true })];
                case 4:
                    _a.sent();
                    return [4, interaction.user.send({ embeds: [embed], components: [row] })];
                case 5:
                    message = _a.sent();
                    interactionHandler.commandMessages[message.id] = {};
                    interactionHandler.commandMessages[message.id].command = "scoutPit";
                    interactionHandler.doDmInit(message, teamNumber, Number(interaction.user.id));
                    return [4, interaction.deleteReply()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2];
            }
        });
    });
}
exports.execute = execute;
