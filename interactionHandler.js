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
exports.handleInteraction = void 0;
var discord = require("discord.js");
var interactionData = {};
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
            var indexes = {
                "high_cone": 0,
                "mid_cone": 1,
                "low_cone": 2,
                "high_cube": 0,
                "mid_cube": 1,
                "low_cube": 2
            };
            var vars = {
                "high_cone": "highCone",
                "mid_cone": "midCone",
                "low_cone": "lowCone",
                "high_cube": "highCube",
                "mid_cube": "midCube",
                "low_cube": "lowCube"
            };
            if (id.endsWith("cone")) {
                rowBuilder = discord.ActionRowBuilder.from(message_1.components[0]);
                rows_1.push(rowBuilder, message_1.components[1]);
            }
            else {
                rowBuilder = discord.ActionRowBuilder.from(message_1.components[1]);
                rows_1.push(message_1.components[0], rowBuilder);
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
                    if (!(interaction["message"].interaction.commandName == "scoutteam")) return [3, 2];
                    message_1 = interaction["message"];
                    rows_1 = [];
                    selectRow = message_1.components[message_1.components.length - 1];
                    if (["high_cone", "mid_cone", "low_cone", "high_cube", "mid_cube", "low_cube"].indexOf(interaction.customId) != -1) {
                        updateConeCube(interaction.customId);
                    }
                    return [4, interaction.update({ content: "" })];
                case 1:
                    _a.sent();
                    console.log(interactionData[message_1.id]);
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
        function constructButton(id, label) {
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(discord.ButtonStyle.Secondary);
        }
        var message, selectRow, selectMenu, i, j, rows, value, newEmbed, coneBuilder, cubeBuilder, label, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction["message"].interaction.commandName == "scoutteam")) return [3, 2];
                    message = interaction["message"];
                    selectRow = null;
                    selectMenu = null;
                    for (i = 0; i < message.components.length; i++) {
                        for (j = 0; j < message.components[j].components.length; j++) {
                            if (message.components[i].components[j].customId == "selections") {
                                selectRow = message.components[i];
                                selectMenu = message.components[i].components[j];
                                break;
                            }
                        }
                    }
                    if (!(message.id in interactionData)) {
                        interactionData[message.id] = {};
                    }
                    rows = [];
                    value = interaction.values[0];
                    newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
                    if (value == "game_piece") {
                        coneBuilder = new discord.ActionRowBuilder();
                        cubeBuilder = new discord.ActionRowBuilder();
                        coneBuilder.addComponents(constructButton("high_cone", "High Cone"));
                        coneBuilder.addComponents(constructButton("mid_cone", "Mid Cone"));
                        coneBuilder.addComponents(constructButton("low_cone", "Low Cone"));
                        cubeBuilder.addComponents(constructButton("high_cube", "High Cube"));
                        cubeBuilder.addComponents(constructButton("mid_cube", "Mid Cube"));
                        cubeBuilder.addComponents(constructButton("low_cube", "Low Cube"));
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
                    message.edit({ embeds: [newEmbed], components: rows });
                    _a.label = 2;
                case 2: return [2];
            }
        });
    });
}
function handleInteraction(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(interaction.isButton());
                    if (!interaction.isStringSelectMenu()) return [3, 2];
                    return [4, handlerStringSelectInteraction(interaction)];
                case 1:
                    _a.sent();
                    return [3, 4];
                case 2:
                    if (!interaction.isButton()) return [3, 4];
                    return [4, handlerButtonInteraction(interaction)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2];
            }
        });
    });
}
exports.handleInteraction = handleInteraction;
