import *  as discord from "discord.js";
import * as blueAlliance from "../blueAlliance";
import * as database from "../database";
import * as interactionHandler from "../interactionHandler";

// @ts-ignore
export let data: discord.SlashCommandBuilder = new discord.SlashCommandBuilder()
		.setName('scoutpit')
		.setDescription('piss in the ball pit')
		.addNumberOption(option =>
			option.setName("teamnumber")
				.setDescription("Cloth Gowns")
				.setRequired(true));

export async function execute(interaction: discord.ChatInputCommandInteraction) {
	let teamNumber: number = interaction.options.getNumber("teamnumber");
	
    const embed: discord.EmbedBuilder = new discord.EmbedBuilder()
			.setTitle("Scouting " + teamNumber);

    // interaction.parent = {driveTrain: null, cycles: null, idealPlacement: null};
    
    let row: discord.ActionRowBuilder = new discord.ActionRowBuilder()
			.addComponents(
				new discord.StringSelectMenuBuilder()
					.setCustomId('selections')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'Game Pieces',
							description: 'This is a description',
							value: 'game_piece',
						}
					),
			);
	
    let message: discord.InteractionResponse = await interaction.reply({embeds: [embed], components: [row]} as discord.InteractionReplyOptions);
}