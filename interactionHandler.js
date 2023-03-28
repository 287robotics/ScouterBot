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
exports.handleInteraction = void 0;
var discord = require("discord.js");
var interactionData = {};
function applyEmbedEdit(embedBuilder, interactionData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            embedBuilder.setFields({ name: "**__Game Pieces**__", value: ("**High Cone**: " + (interactionData.highCone ? "Yes" : "No") + "\n" +
                    "**Mid Cone**: " + (interactionData.midCone ? "Yes" : "No") + "\n" +
                    "**Low Cone**: " + (interactionData.lowCone ? "Yes" : "No") + "\n" +
                    "**High Cube**: " + (interactionData.highCube ? "Yes" : "No") + "\n" +
                    "**Mid Cube**: " + (interactionData.midCube ? "Yes" : "No") + "\n" +
                    "**Low Cube**: " + (interactionData.lowCube ? "Yes" : "No") + "\n" +
                    "**Cycles**: " + interactionData.cycles + "\n")
            });
            return [2];
        });
    });
}
function initInteractionDataPit() {
    var data = {};
    data.highCone = false;
    data.midCone = false;
    data.lowCone = false;
    data.highCube = false;
    data.midCube = false;
    data.lowCube = false;
    data.cycles = 0;
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
            var indexes = { "high_cone": 0, "mid_cone": 1, "low_cone": 2, "high_cube": 0, "mid_cube": 1, "low_cube": 2 };
            var vars = { "high_cone": "highCone", "mid_cone": "midCone", "low_cone": "lowCone", "high_cube": "highCube", "mid_cube": "midCube", "low_cube": "lowCube" };
            if (id.endsWith("cone")) {
                rowBuilder = discord.ActionRowBuilder.from(message_1.components[0]);
                rows_1.push(rowBuilder, message_1.components[1], message_1.components[2]);
            }
            else {
                rowBuilder = discord.ActionRowBuilder.from(message_1.components[1]);
                rows_1.push(message_1.components[0], rowBuilder, message_1.components[2]);
            }
            if (interaction.component.style == discord.ButtonStyle.Secondary) {
                interactionData[message_1.id][vars[id]] = true;
                rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Primary);
            }
            else {
                interactionData[message_1.id][vars[id]] = false;
                rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Secondary);
            }
        }
        var message_1, rows_1, selectRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction["message"].interaction.commandName == "scout")) return [3, 2];
                    message_1 = interaction["message"];
                    rows_1 = [];
                    selectRow = message_1.components[message_1.components.length - 1];
                    if (["high_cone", "mid_cone", "low_cone", "high_cube", "mid_cube", "low_cube"].indexOf(interaction.customId) != -1) {
                        updateConeCube(interaction.customId);
                    }
                    return [4, interaction.update({ content: "" })];
                case 1:
                    _a.sent();
                    rows_1.push(selectRow);
                    message_1.edit({ embeds: message_1.embeds, components: rows_1 });
                    _a.label = 2;
                case 2: return [2];
            }
        });
    });
}
function handlerStringSelectInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        function constructButton(id, label, key) {
            var style = discord.ButtonStyle.Secondary;
            if (interactionData[message_2.id][key]) {
                style = discord.ButtonStyle.Primary;
            }
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        var message_2, selectRow, selectMenu, i, j, rows, value, newEmbed, coneBuilder, cubeBuilder, textBuilder, label, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction["message"].interaction.commandName == "scout")) return [3, 2];
                    message_2 = interaction["message"];
                    selectRow = null;
                    selectMenu = null;
                    for (i = 0; i < message_2.components.length; i++) {
                        for (j = 0; j < message_2.components[j].components.length; j++) {
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
                    value = interaction.values[0];
                    newEmbed = discord.EmbedBuilder.from(message_2.embeds[0]);
                    console.log(message_2.id);
                    if (value == "game_piece") {
                        coneBuilder = new discord.ActionRowBuilder();
                        cubeBuilder = new discord.ActionRowBuilder();
                        textBuilder = new discord.ActionRowBuilder();
                        coneBuilder.addComponents(constructButton("high_cone", "High Cone", "highCone"));
                        coneBuilder.addComponents(constructButton("mid_cone", "Mid Cone", "midCone"));
                        coneBuilder.addComponents(constructButton("low_cone", "Low Cone", "lowCone"));
                        cubeBuilder.addComponents(constructButton("high_cube", "High Cube", "highCube"));
                        cubeBuilder.addComponents(constructButton("mid_cube", "Mid Cube", "midCube"));
                        cubeBuilder.addComponents(constructButton("low_cube", "Low Cube", "lowCone"));
                        coneBuilder.addComponents(new discord.ButtonBuilder().setCustomId("cycles_button").setStyle(discord.ButtonStyle.Primary));
                        rows.push(coneBuilder, cubeBuilder);
                        newEmbed.setFooter({ text: "Editing game piece data." });
                    }
                    label = null;
                    for (i = 0; i < selectMenu.data.options.length; i++) {
                        if (selectMenu.data.options[i].value == value) {
                            label = selectMenu.data.options[i].label;
                            break;
                        }
                    }
                    selectMenu.data.placeholder = label;
                    return [4, interaction.update({ content: "" })];
                case 1:
                    _a.sent();
                    rows.push(selectRow);
                    message_2.edit({ embeds: [newEmbed], components: rows });
                    _a.label = 2;
                case 2: return [2];
            }
        });
    });
}
function handleChatInputCommandInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var message, embedBuilder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.commandName == "scout")) return [3, 4];
                    return [4, interaction.fetchReply()];
                case 1:
                    message = _a.sent();
                    interactionData[message.id] = initInteractionDataPit();
                    embedBuilder = discord.EmbedBuilder.from(message.embeds[0]);
                    return [4, applyEmbedEdit(embedBuilder, interactionData[message.id])];
                case 2:
                    _a.sent();
                    return [4, message.edit({ embeds: [embedBuilder] })];
                case 3:
                    _a.sent();
                    console.log("?");
                    _a.label = 4;
                case 4: return [2];
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
                    return [3, 6];
                case 2:
                    if (!interaction.isButton()) return [3, 4];
                    return [4, handlerButtonInteraction(interaction)];
                case 3:
                    _a.sent();
                    return [3, 6];
                case 4:
                    if (!interaction.isChatInputCommand()) return [3, 6];
                    return [4, handleChatInputCommandInteraction(interaction)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2];
            }
        });
    });
}
exports.handleInteraction = handleInteraction;
