import *  as discord from "discord.js";
import * as blueAlliance from "../blueAlliance";
import * as main from "../main";
import * as interactionHandler from "../interactionHandler";

export let data = new discord.SlashCommandBuilder()
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

    
    let row = new discord.ActionRowBuilder<discord.MessageActionRowComponentBuilder>()
			.addComponents(
				new discord.StringSelectMenuBuilder()
					.setCustomId('selections')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'TeleOp',
							description: 'This is a description',
							value: 'game_data',
						},
						{
							label: 'Game Pieces',
							description: 'This is a description',
							value: 'game_piece',
						},
						{
							label: "Autonomous",
							description: "FUCK YOU",
							value: "autonomous"
						},
						{
							label: "Notes",
							description: "FUCK YOU TOO",
							value: "notes"
						}
					),
			);

	if (interaction.channel != null && !interaction.channel.isDMBased()) {
		let message: discord.Message = await interaction.user.send({embeds: [embed], components: [row]});
		
		interactionHandler.commandMessages[message.id] = {}
		interactionHandler.commandMessages[message.id].command = "scout"

		interactionHandler.doDmInit(message, teamNumber);
		
		interaction.reply({content: "Scout sheet has been sent to your dm", ephemeral: true});
	} else {
		let message: discord.Message = await interaction.user.send({embeds: [embed], components: [row]});
		
		interactionHandler.commandMessages[message.id] = {}
		interactionHandler.commandMessages[message.id].command = "scout"
		interactionHandler.doDmInit(message, teamNumber);
		
		await interaction.deferReply();
		await interaction.deleteReply();
	}
}

