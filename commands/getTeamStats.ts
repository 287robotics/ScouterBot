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

export async function execute(interaction) {
	let teamNumber: number = interaction.options.getNumber("teamnumber");
	blueAlliance.requestTeamData(teamNumber, async (teamData: blueAlliance.TeamData) => {
	blueAlliance.requestEventData(teamNumber, async (eventData) => {
		
		const embed: discord.EmbedBuilder = new discord.EmbedBuilder()
			.setTitle(teamData.nickname);

			console.log(eventData);

		for (const eventName in eventData) {
			if (eventData[eventName] == null) {
				continue;
			}

			let fieldData = {name: eventName, value: ""};
			let dataString: string = "";
			let event = eventData[eventName];

			if ("qual" in event) {
				let matches = event.qual;
				dataString += "**__Qualifications__**\n";
				dataString += "**Wins**: " + matches.ranking.record.wins + '\n';
				dataString += "**Losses**: " + matches.ranking.record.losses + '\n';
				dataString += "**Draws**: " + matches.ranking.record.ties + '\n';
				dataString += "**Ranking**: " + matches.ranking.rank + "/" + matches.num_teams + '\n';
			}
			
			fieldData.value = dataString;
			embed.addFields(fieldData);
		}

		await interaction.reply({ embeds: [embed] });
	})});
}