import *  as discord from "discord.js";
import * as blueAlliance from "../blueAlliance";
import * as main from "../main";
// @ts-ignore
export let data: discord.SlashCommandBuilder = new discord.SlashCommandBuilder()
		.setName('scout')
		.setDescription('piss your\'e pant AGIAN')
		.addNumberOption(option =>
			option.setName("teamnumber")
				.setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
				.setRequired(true));

export async function execute(interaction: discord.ChatInputCommandInteraction) {
	let teamNumber: number = interaction.options.getNumber("teamnumber");
	
    const embed: discord.EmbedBuilder = new discord.EmbedBuilder()
			.setTitle("Scouting " + teamNumber);

    interaction
    
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

			
	interaction.reply({embeds: [embed], components: [row]} as discord.InteractionReplyOptions);
}

