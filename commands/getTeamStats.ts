import *  as discord from "discord.js";
import * as blueAlliance from "../blueAlliance";

// @ts-ignore
export let data: discord.SlashCommandBuilder = new discord.SlashCommandBuilder()
		.setName('getteamstats')
		.setDescription('piss your\'e pant')
		.addNumberOption(option =>
			option.setName("teamnumber")
				.setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
				.setRequired(true));

export async function execute(interaction: discord.ChatInputCommandInteraction) {
	let teamNumber = interaction.options.getNumber("teamnumber");
	let teamData = await blueAlliance.requestTeamData(teamNumber);
	let eventData = await blueAlliance.requestEventData(teamNumber);

	const embed: discord.EmbedBuilder = new discord.EmbedBuilder()
			.setTitle(teamData.nickname);

		for (const eventName in eventData) {
			if (eventData[eventName] == null) {
				continue;
			}

			let fieldData = {name: eventName, value: ""};
			let dataString: string = "";
			let event = eventData[eventName];

			if ("qual" in event) {
				if(event.qual != null) {
					let matches = event.qual;
					dataString += "**__Qualifications__**\n";
					dataString += "**Wins**: " + matches.ranking.record.wins + '\n';
					dataString += "**Losses**: " + matches.ranking.record.losses + '\n';
					dataString += "**Draws**: " + matches.ranking.record.ties + '\n';
					dataString += "**Ranking**: " + matches.ranking.rank + "/" + matches.num_teams + '\n';
				} else {
					dataString += "Event has not started";
				}
			}
			
			fieldData.value = dataString;
			embed.addFields(fieldData);
		}

		await interaction.reply({ embeds: [embed] });
}