import * as discord from "discord.js";
import * as interactionHandler from "../interactionHandler";
import * as database from "../database";

let sheetInteractionData = {};

function initData(message: discord.Message) {
    sheetInteractionData[message.id] = {}
    sheetInteractionData[message.id].index = 0;
}

function trunc(n, t=2) {
    return (~~(n/5)) % t
}
export async function handleButtonInteraction(interaction: discord.ButtonInteraction) {
    let message: discord.Message = interaction.message;
    let interactionData = sheetInteractionData[interaction.message.id];

}

export let data = new discord.SlashCommandBuilder()
		.setName('getteamsheet')
		.setDescription('piss your\'e pant AGIAN t')
		.addNumberOption(option =>
			option.setName("teamnumber")
				.setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
				.setRequired(true));

export async function execute(interaction: discord.ChatInputCommandInteraction) {
    let teamNumber = interaction.options.getNumber("teamnumber");
    let embedBuilder = new discord.EmbedBuilder()
        .setTitle("Scout Sheet for " + teamNumber);

    await interaction.deferReply();

    let botStats = await database.getBotStats(teamNumber);
    let botNotes = await database.getBotNotes(teamNumber);
    let botData = await database.getBotData(teamNumber);

    if (botData.teamNumber == undefined) {
        await interaction.deleteReply();
        return;
    }

    let averages = {
        name: "**Averages**",
        value: "**Avg High Cones(Auto)**: " + trunc(botStats.avgConesTele.high) + '\n' +
               "**Avg Mid Cones(Auto)**: " + trunc(botStats.avgConesTele.mid) + '\n' +
               "**Avg Low Cones(Auto)**: " + trunc(botStats.avgConesTele.low) + '\n' +
               "**Avg High Cubes(Auto)**: " + trunc(botStats.avgCubesTele.high) + '\n' +
               "**Avg Mid Cubes(Auto)**: " + trunc(botStats.avgCubesTele.mid) + '\n' +
               "**Avg Low Cubes(Auto)**: " + trunc(botStats.avgCubesTele.low) + '\n' +
               "**Avg High Cones(TeleOp)**: " + trunc(botStats.avgConesTele.high) + '\n' +
               "**Avg Mid Cones(TeleOp)**: " + trunc(botStats.avgConesTele.mid) + '\n' +
               "**Avg Low Cones(TeleOp)**: " + trunc(botStats.avgConesTele.low) + '\n' +
               "**Avg High Cubes(TeleOp)**: " + trunc(botStats.avgCubesTele.high) + '\n' +
               "**Avg Mid Cubes(TeleOp)**: " + trunc(botStats.avgCubesTele.mid) + '\n' +
               "**Avg Low Cubes(TeleOp)**: " + trunc(botStats.avgCubesTele.low) + '\n' +
               "**Avg Cycles Per Game**: " + trunc(botStats.avgCycles) + '\n',
        inline: true
    }

    let dt: string = "";

    switch (botData.drivetrain) {
        case (0):
            dt = "Tank";
            break;
        case (1):
            dt = "Swerve";
            break;
        case(2):
            dt = "Other";
            break;
        default:
            dt = "Not Scouted";
            break;
    }
    let basicInfo = {
        name: "**Basic Info**",
        value: "**Drivetrain**" + dt + '\n' +
               "**Endgame Charge Station %**: " + botStats.charge + "\n" +
               "**Endgame Charge Station Balance %**: " + botStats.balance + '\n' + 
               "**Charge Station(Auto)**: " + botStats.autoCharge + "\n" +
               "**Charge Station Balanced(Auto)**: " + botStats.autoBalance + "\n" +
               "**Mobility(Auto)**" + botStats.autoMobility + "\n",

        inline: true
    }

    embedBuilder.addFields(averages, basicInfo);

    if (interaction.channel != null && !interaction.channel.isDMBased()) {
        let message: discord.Message = await interaction.channel.send({embeds: [embedBuilder]});
        await interaction.deleteReply();
        interactionHandler.commandMessages[message.id] = {};
        interactionHandler.commandMessages[message.id].command = "getTeamSheet";
    } else {
        
        let message: discord.Message = await interaction.user.send({embeds: [embedBuilder]});
        await interaction.deleteReply();
        interactionHandler.commandMessages[message.id] = {};
        interactionHandler.commandMessages[message.id].command = "getTeamSheet";
    }
    
}