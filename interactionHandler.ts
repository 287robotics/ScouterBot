import * as discord from "discord.js";
import * as scoutCommand from "./commands/scout";
import * as scoutPitCommand from "./commands/scoutPit";
import * as getTeamSheet from "./commands/getTeamSheet";

export let interactionData: { [fuck: string]: scoutCommand.ScoutData }  = {};
export let commandMessages = {};
export let dmChannels = {};

export let client: discord.Client = null;

export function setClient(obj: discord.Client) {
    client = obj;
}

export async function applyEmbedEdit(embedBuilder: discord.EmbedBuilder, interactionData) {
    let game_piece = {name: "**Game Pieces**", value: (
        "**High Cone**: " + interactionData.highCone + "\n" +
        "**Mid Cone**: " + interactionData.midCone + "\n" +
        "**Low Cone**: " + interactionData.lowCone + "\n" +
        "**High Cube**: " + interactionData.highCube + "\n" +
        "**Mid Cube**: " + interactionData.midCube + "\n" +
        "**Low Cube**: " + interactionData.lowCube + "\n" +
        "**Player Station Single**: " + (interactionData.playerStationSingle ? "Yes" : "No") + "\n" + 
        "**Player Station Double**: " + (interactionData.playerStationDouble ? "Yes" : "No") + "\n" + 
        "**Endgame Charge Station**: " + (interactionData.endgameChargeStation ? "Yes" : "No") + "\n" + 
        "**Endgame Charge Station Balanced**: " + (interactionData.endgameChargeStationBalanced ? "Yes" : "No") + "\n" + 
        "**Cycles**: " + (interactionData.highCone + interactionData.midCone + interactionData.lowCone + interactionData.highCube + interactionData.midCube + interactionData.lowCube) + "\n"
    )};

    let autonomous = {name: "**Autonomous**", value: (
        "**High Cone**: " + interactionData.highConeAuto + "\n" +
        "**Mid Cone**: " + interactionData.midConeAuto + "\n" +
        "**Low Cone**: " + interactionData.lowConeAuto + "\n" +
        "**High Cube**: " + interactionData.highCubeAuto + "\n" +
        "**Mid Cube**: " + interactionData.midCubeAuto + "\n" +
        "**Low Cube**: " + interactionData.lowCubeAuto + "\n" +
        "**Mobility**: " + (interactionData.mobility ? "Yes" : "No") + "\n" +
        "**Charge Station**: " + (interactionData.chargeStation ? "Yes" : "No") + "\n" +
        "**Charge Station Balance**: " + (interactionData.chargeStationBalance ? "Yes" : "No") + "\n" + 
        "**Preloaded Cube**: " + (interactionData.preloadedCube ? "Yes" : "No") + "\n" +
        "**Preloaded Cone**: " + (interactionData.preloadedCone ? "Yes" : "No") + "\n"
    )};

    embedBuilder.setFields(game_piece, autonomous);
    embedBuilder.setDescription("**__Autonomous Notes__**\n" + interactionData.autoNotes + "\n" + "**__TeleOp Notes__**\n" + interactionData.teleNotes + "**__Misc Notes__**\n" + interactionData.miscNotes);
    
    let matchString = "";

    if (interactionData.matchNumber != -1) {
        matchString = (interactionData.quals ? " in qualification match " : " in practice match ") + interactionData.matchNumber
    }
    embedBuilder.setTitle("Scouting " + interactionData.teamNumber + matchString);
}

export async function doDmInit(message: discord.Message, teamNumber: number, scouter: number) {
    interactionData[message.id] = initInteractionDataPit();
    interactionData[message.id].teamNumber = teamNumber;
    interactionData[message.id].scouter = scouter;
    let embedBuilder: discord.EmbedBuilder = discord.EmbedBuilder.from(message.embeds[0]);
    await applyEmbedEdit(embedBuilder, interactionData[message.id]);
    await message.edit({embeds: [embedBuilder]});
}

function initInteractionDataPit() {
    let data: scoutCommand.ScoutData = {
        highConeAuto: 0,
        midConeAuto: 0,
        lowConeAuto: 0,
        highCubeAuto: 0,
        midCubeAuto: 0,
        lowCubeAuto: 0,
        startTop: false,
        startMiddle: false,
        startLow: false,
        autoNotes: "",
        teleNotes: "",
        miscNotes: "",
        cycles: 0,
        quals: false,
        teamNumber: 0,
        playerStationSingle: false,
        playerStationDouble: false,
        top_pos: false,
        mid_pos: false,
        low_pos: false,
        preloadedCone: false,
        preloadedCube: false,
        mobility: false,
        chargeStation: false,
        chargeStationBalance: false,
        endgameChargeStation: false,
        endgameChargeStationBalanced: false,
        matchNumber: 0,
        highCone: 0,
        midCone: 0,
        lowCone: 0,
        highCube: 0,
        midCube: 0,
        lowCube: 0,
        drivetrain: -1,
        scouter: -1
    }

    data.highCone = 0;
    data.midCone = 0;
    data.lowCone = 0;
    data.highCube = 0;
    data.midCube = 0;
    data.lowCube = 0;
    
    data.highConeAuto = 0;
    data.midConeAuto = 0;
    data.lowConeAuto = 0;
    data.highCubeAuto = 0;
    data.midCubeAuto = 0;
    data.lowCubeAuto = 0;
    data.mobility = false;
    data.chargeStation = false;
    data.chargeStationBalance = false;

    data.startTop = false;
    data.startMiddle = false;
    data.startLow = false;

    data.playerStationDouble = false;
    data.playerStationSingle = false;

    data.endgameChargeStation = false;
    data.endgameChargeStationBalanced = false;

    data.preloadedCube = false;
    data.preloadedCone = false;

    data.autoNotes = "";
    data.teleNotes = "";
    data.miscNotes = "";

    data.cycles = 0;
    data.matchNumber = -1;
    data.teamNumber = -1;

    data.quals = true;

    return data;
}

function getComponentById(components: discord.ActionRow<discord.MessageActionRowComponent>, id: string): any {
    for (let i = 0; i < components.components.length; i++) {
        if (components.components[i].customId == id) {
            return components.components[i]
        }
    }

    return null;
}

async function handleButtonInteraction(interaction: discord.ButtonInteraction) {
    if (interaction.message.id in commandMessages && commandMessages[interaction.message.id].command == "scout") {
        await scoutCommand.handleButtonInteraction(interaction);
    } else if (interaction.message.id in commandMessages && commandMessages[interaction.message.id].command == "scoutPit") {
        await scoutPitCommand.handleButtonInteraction(interaction);
    } else if (interaction.message.id in commandMessages && commandMessages[interaction.message.id].command == "getTeamSheet") {
        await getTeamSheet.handleButtonInteraction(interaction);
    }
}

async function handleStringSelectInteraction(interaction: discord.StringSelectMenuInteraction) {
    if (interaction.message.id in commandMessages && commandMessages[interaction.message.id].command == "scout") {
        await scoutCommand.handleStringSelectInteraction(interaction);
    } else if (interaction.message.id in commandMessages && commandMessages[interaction.message.id].command == "scoutPit") {
        await scoutPitCommand.handleStringSelectInteraction(interaction);
    }
}

async function handleModalSubmitInteraction(interaction: discord.ModalSubmitInteraction) {
    if (interaction.customId.startsWith("cycle_modal")) {
        let split: any = interaction.customId.split("_")
        
        let messageId: string = split[2];
        let channelId: string = split[3];

        let channel: discord.DMChannel = client.channels.cache.get(channelId) as discord.DMChannel;
        let message: discord.Message = channel.messages.cache.get(messageId);
        
        // interactionData[messageId].cycles = (interaction.fields.getField("cycle_input") as discord.TextInputModalData).value;

        let newEmbed = discord.EmbedBuilder.from(message.embeds[0]);

        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }

    if (interaction.customId.startsWith("match_number")) {
        let split: string[] = interaction.customId.split("_")

        let channelId = split[2];
        let messageId = split[3];

        let channel: discord.DMChannel = client.channels.cache.get(channelId) as discord.DMChannel;
        let message: discord.Message = channel.messages.cache.get(messageId);

        interactionData[messageId].matchNumber = Number((interaction.fields.getField("set_match_number") as discord.TextInputModalData).value);

        let newEmbed = discord.EmbedBuilder.from(message.embeds[0]);

        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }
    console.log(interaction.customId);
    
    if (interaction.customId.startsWith("set_notes")) {
        let split: string[] = interaction.customId.split("_")

        let channelId = split[2];
        let messageId = split[3];

        let channel: discord.DMChannel = client.channels.cache.get(channelId) as discord.DMChannel;
        let message: discord.Message = channel.messages.cache.get(messageId);

        interactionData[messageId].autoNotes = (interaction.fields.getField("auto_notes") as discord.TextInputModalData).value;
        interactionData[messageId].teleNotes = (interaction.fields.getField("tele_notes") as discord.TextInputModalData).value;
        interactionData[messageId].miscNotes = (interaction.fields.getField("misc_notes") as discord.TextInputModalData).value;
        
        let newEmbed = discord.EmbedBuilder.from(message.embeds[0]);
        console.log("?")
        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }

    if (interaction.customId.startsWith("set_cone")) {
        let split: string[] = interaction.customId.split("_")

        let channelId = split[2];
        let messageId = split[3];

        let channel: discord.DMChannel = client.channels.cache.get(channelId) as discord.DMChannel;
        let message: discord.Message = channel.messages.cache.get(messageId);

        interactionData[messageId].highCone = Number((interaction.fields.getField("high_cones") as discord.TextInputModalData).value);
        interactionData[messageId].midCone = Number((interaction.fields.getField("mid_cones") as discord.TextInputModalData).value);
        interactionData[messageId].lowCone = Number((interaction.fields.getField("low_cones") as discord.TextInputModalData).value);


        let newEmbed = discord.EmbedBuilder.from(message.embeds[0]);

        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }

    if (interaction.customId.startsWith("set_cube")) {
        let split: string[] = interaction.customId.split("_")

        let channelId = split[2];
        let messageId = split[3];

        let channel: discord.DMChannel = client.channels.cache.get(channelId) as discord.DMChannel;
        let message: discord.Message = channel.messages.cache.get(messageId);

        interactionData[messageId].highCube = Number((interaction.fields.getField("high_cubes") as discord.TextInputModalData).value);
        interactionData[messageId].midCube = Number((interaction.fields.getField("mid_cubes") as discord.TextInputModalData).value);
        interactionData[messageId].lowCube = Number((interaction.fields.getField("low_cubes") as discord.TextInputModalData).value);


        let newEmbed = discord.EmbedBuilder.from(message.embeds[0]);

        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }


    if (interaction.customId.startsWith("aset_cube")) {
        let split: string[] = interaction.customId.split("_")

        let channelId = split[2];
        let messageId = split[3];

        let channel: discord.DMChannel = client.channels.cache.get(channelId) as discord.DMChannel;
        let message: discord.Message = channel.messages.cache.get(messageId);

        interactionData[messageId].highCubeAuto = Number((interaction.fields.getField("high_cubes") as discord.TextInputModalData).value);
        interactionData[messageId].midCubeAuto = Number((interaction.fields.getField("mid_cubes") as discord.TextInputModalData).value);
        interactionData[messageId].lowCubeAuto = Number((interaction.fields.getField("low_cubes") as discord.TextInputModalData).value);


        let newEmbed = discord.EmbedBuilder.from(message.embeds[0]);

        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }

    if (interaction.customId.startsWith("aset_cone")) {
        let split: string[] = interaction.customId.split("_")

        let channelId = split[2];
        let messageId = split[3];

        let channel: discord.DMChannel = client.channels.cache.get(channelId) as discord.DMChannel;
        let message: discord.Message = channel.messages.cache.get(messageId);

        interactionData[messageId].highConeAuto = Number((interaction.fields.getField("high_cones") as discord.TextInputModalData).value);
        interactionData[messageId].midConeAuto = Number((interaction.fields.getField("mid_cones") as discord.TextInputModalData).value);
        interactionData[messageId].lowConeAuto = Number((interaction.fields.getField("low_cones") as discord.TextInputModalData).value);


        let newEmbed = discord.EmbedBuilder.from(message.embeds[0]);

        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }
}

export async function handleInteraction(interaction: discord.Interaction) {
    if (interaction.isStringSelectMenu()) {
        await handleStringSelectInteraction(interaction);
    } else if (interaction.isButton()) {
        await handleButtonInteraction(interaction);
    } else if (interaction.isChatInputCommand()) {
    } else if (interaction.isModalSubmit()) {
        await handleModalSubmitInteraction(interaction);
    }

}