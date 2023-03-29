import *  as discord from "discord.js";
import * as stats from "../statbotics";

// @ts-ignore
export let data: discord.SlashCommandBuilder = new discord.SlashCommandBuilder()
		.setName('predict')
		.setDescription('get match prediction from statbotics')
		.addNumberOption(option =>
			option.setName("matchnumber")
				.setDescription("number of the match")
				.setRequired(true));

export async function execute(interaction: discord.ChatInputCommandInteraction) {
	let matchNumber = interaction.options.getNumber("matchnumber");
	let matchData = await stats.requestMatchData(matchNumber);

	const embed: discord.EmbedBuilder = new discord.EmbedBuilder()
			.setTitle("Qualification " + matchNumber + " Predictions by Statbotics");

	embed.addFields({name: "Winner:", value: (matchData.epa_winner == "red" ? "Red" : "Blue") + " - " + 
        Math.round((matchData.epa_winner == "red" ? matchData.epa_win_prob : (1 - matchData.epa_win_prob)) * 100) + "% certainty"});
    embed.addFields({name: "Scores:", value: "Red: " + Math.round(matchData.red_epa_sum) + "\nBlue: " + Math.round(matchData.blue_epa_sum)});
    console.log(matchData);

	await interaction.reply({ embeds: [embed] });
}