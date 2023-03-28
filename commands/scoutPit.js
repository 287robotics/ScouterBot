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
// @ts-ignore
exports.data = new discord.SlashCommandBuilder()
    .setName('scoutpit')
    .setDescription('piss in the ball pit')
    .addNumberOption(option => option.setName("teamnumber")
    .setDescription("Cloth Gowns")
    .setRequired(true));
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        let teamNumber = interaction.options.getNumber("teamnumber");
        const embed = new discord.EmbedBuilder()
            .setTitle("Scouting " + teamNumber);
        // interaction.parent = {driveTrain: null, cycles: null, idealPlacement: null};
        let row = new discord.ActionRowBuilder()
            .addComponents(new discord.StringSelectMenuBuilder()
            .setCustomId('selections')
            .setPlaceholder('Nothing selected')
            .addOptions({
            label: 'Game Pieces',
            description: 'This is a description',
            value: 'game_piece',
        }));
        let message = yield interaction.reply({ embeds: [embed], components: [row] });
    });
}
exports.execute = execute;
//# sourceMappingURL=scoutPit.js.map