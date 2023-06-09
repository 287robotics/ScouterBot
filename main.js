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
var dotenv = require("dotenv");
dotenv.config();
var discord = require("discord.js");
var fs = require("node:fs");
var path = require("node:path");
var interactionHandler = require("./interactionHandler");
var DISCORD_BOT_API = process.env.DISCORD_BOT_API;
var DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
var client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });
var commandsPath = path.join(__dirname, 'commands');
var commandFiles = fs.readdirSync(commandsPath).filter(function (file) { return file.endsWith('.js'); });
var commands = new discord.Collection();
var jsonCommands = [];
var rest = new discord.REST({ version: "10" }).setToken(DISCORD_BOT_API);
interactionHandler.setClient(client);
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var filePath = path.join(commandsPath, file);
    var command = require(filePath);
    if ('data' in command && 'execute' in command) {
        console.log(command.data.name);
        commands.set(command.data.name, command);
        jsonCommands.push(command.data.toJSON());
    }
    else {
        console.log("[WARNING] The command at ".concat(filePath, " is missing a required \"data\" or \"execute\" property."));
    }
}
client.once(discord.Events.ClientReady, function (c) {
    console.log("Ready! Logged in as ".concat(c.user.tag));
});
client.on(discord.Events.InteractionCreate, function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var command, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isChatInputCommand())
                    return [2];
                command = commands.get(interaction.commandName);
                if (!command) {
                    console.error("No command matching ".concat(interaction.commandName, " was found."));
                    return [2];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 8]);
                return [4, command.execute(interaction)];
            case 2:
                _a.sent();
                return [3, 8];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                if (!(interaction.replied || interaction.deferred)) return [3, 5];
                return [4, interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })];
            case 4:
                _a.sent();
                return [3, 7];
            case 5: return [4, interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3, 8];
            case 8: return [2];
        }
    });
}); });
client.on(discord.Events.InteractionCreate, function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, interactionHandler.handleInteraction(interaction)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, rest.put(discord.Routes.applicationCommands(DISCORD_CLIENT_ID), { body: jsonCommands })];
            case 1:
                _a.sent();
                return [3, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [3, 3];
            case 3: return [2];
        }
    });
}); })();
client.login(DISCORD_BOT_API);
