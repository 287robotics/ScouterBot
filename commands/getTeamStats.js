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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord = require("discord.js");
const blueAlliance = require("../blueAlliance");
// @ts-ignore
exports.data = new discord.SlashCommandBuilder()
    .setName('getteamstats')
    .setDescription('piss your\'e pant')
    .addNumberOption(option => option.setName("teamnumber")
    .setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
    .setRequired(true));
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        let teamNumber = interaction.options.getNumber("teamnumber");
        let teamData = yield blueAlliance.requestTeamData(teamNumber);
        let eventData = yield blueAlliance.requestEventData(teamNumber);
        const embed = new discord.EmbedBuilder()
            .setTitle(teamData.nickname);
        for (const eventName in eventData) {
            if (eventData[eventName] == null) {
                continue;
            }
            let fieldData = { name: eventName, value: "" };
            let dataString = "";
            let event = eventData[eventName];
            if ("qual" in event) {
                if (event.qual != null) {
                    let matches = event.qual;
                    dataString += "**__Qualifications__**\n";
                    dataString += "**Wins**: " + matches.ranking.record.wins + '\n';
                    dataString += "**Losses**: " + matches.ranking.record.losses + '\n';
                    dataString += "**Draws**: " + matches.ranking.record.ties + '\n';
                    dataString += "**Ranking**: " + matches.ranking.rank + "/" + matches.num_teams + '\n';
                }
                else {
                    dataString += "Event has not started";
                }
            }
            fieldData.value = dataString;
            embed.addFields(fieldData);
        }
        yield interaction.reply({ embeds: [embed] });
    });
}
exports.execute = execute;
//# sourceMappingURL=getTeamStats.js.map