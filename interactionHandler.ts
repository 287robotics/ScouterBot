import * as discord from "discord.js";

let interactionData = {};
export let commandMessages = {};
export let dmChannels = {};

export let client: discord.Client = null;

export function setClient(obj: discord.Client) {
    client = obj;
}

async function applyEmbedEdit(embedBuilder: discord.EmbedBuilder, interactionData) {
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
        "**Charge Station Balance**: " + (interactionData.chargeStationBalance ? "Yes" : "No") + "\n"
    )};

    embedBuilder.setFields(game_piece, autonomous);
    embedBuilder.setDescription("**__Autonomous Notes__**\n" + interactionData.autoNotes + "\n" + "**__TeleOp Notes__**\n" + interactionData.teleNotes + "**__Misc Notes__**\n" + interactionData.miscNotes);
    console.log(interactionData);
    embedBuilder.setTitle("Scouting " + interactionData.teamNumber + " in Match " + interactionData.matchNumber);
}

export async function doDmInit(message: discord.Message, teamNumber: number) {
    interactionData[message.id] = initInteractionDataPit();
    interactionData[message.id].teamNumber = teamNumber;

    let embedBuilder: discord.EmbedBuilder = discord.EmbedBuilder.from(message.embeds[0]);
    interactionData[message.id].messageId = message.id
    await applyEmbedEdit(embedBuilder, interactionData[message.id]);
    await message.edit({embeds: [embedBuilder]});
}

function initInteractionDataPit() {
    let data: any = {}

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

    data.autoNotes = "";
    data.teleNotes = "";
    data.miscNotes = "";

    data.cycles = 0;
    data.matchNumber = "NOT SET";
    data.teamNumber = "NOT SET";

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

async function handlerButtonInteraction(interaction: discord.ButtonInteraction) {
    if (interaction.message.id in commandMessages && commandMessages[interaction.message.id].command == "scout") {
        let message: discord.Message = interaction["message"];
        let rows = [];
        let selectRow: discord.ActionRow<discord.MessageActionRowComponent> = message.components[message.components.length - 1];
        
        let updateEmbed = true;

        const indexes = {"high_cone": 0, "mid_cone": 1, "low_cone": 2, "high_cube": 0, "mid_cube": 1, "low_cube": 2,
                         "high_cone_a": 0, "mid_cone_a": 1, "low_cone_a": 2, "high_cube_a": 0, "mid_cube_a": 1, "low_cube_a": 2};

        const vars = {"high_cone": "highCone", "mid_cone": "midCone", "low_cone": "lowCone", "high_cube": "highCube", "mid_cube": "midCube", "low_cube": "lowCube",
                      "high_cone_a": "highConeAuto", "mid_cone_a": "midConeAuto", "low_cone_a": "lowConeAuto", "high_cube_a": "highCubeAuto", "mid_cube_a": "midCubeAuto", "low_cube_a": "lowCubeAuto"};

        function updateConeCube(id: string) {
            let rowBuilder: discord.ActionRowBuilder<discord.ButtonBuilder> = null;
            
            commandMessages[interaction.message.id].lastGamePieceId = id;

            if (id.indexOf("cone") != -1) {
                rowBuilder = discord.ActionRowBuilder.from(message.components[0] as discord.APIActionRowComponent<discord.APIButtonComponent>);
                rows.push(rowBuilder, message.components[1], message.components[2], message.components[3]);

            } else {
                rowBuilder = discord.ActionRowBuilder.from(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
                rows.push(message.components[0], rowBuilder, message.components[2], message.components[3]);
            }
            
            interactionData[message.id][vars[id]] += 1;
            
            if (interactionData[message.id][vars[id]] > 0) {
                rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Success);
            } else {
                rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Secondary);
            
            }
        }

        if (["high_cone", "mid_cone", "low_cone", "high_cube", "mid_cube", "low_cube",
             "high_cone_a", "mid_cone_a", "low_cone_a", "high_cube_a", "mid_cube_a", "low_cube_a"].indexOf(interaction.customId) != -1) {
            updateConeCube(interaction.customId);
        }

        
        if (interaction.customId == "cycles_button_dec" || interaction.customId == "cycles_button_dec_a" && "lastGamePieceId" in commandMessages[message.id]) {  
            let lastGamePieceId = commandMessages[message.id].lastGamePieceId;
            
            if (interactionData[message.id][vars[lastGamePieceId]] > 0) {
                interactionData[message.id][vars[lastGamePieceId]] -= 2
                updateConeCube(lastGamePieceId);
            } else {
                rows.push(message.components[0], message.components[1]);
            }
        }

        if (interaction.customId == "cycles_button_dec_a") {
            rows.push(message.components[2]);
        }
        
        if (["high_cone_a", "mid_cone_a", "low_cone_a", "high_cube_a", "mid_cube_a", "low_cube_a"].indexOf(interaction.customId) != -1) {
            rows.push(message.components[2]);
        }

        if (interaction.customId == "mobility") {
            rows.push(message.components[0], message.components[1]);

            let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
            
            if (!interactionData[message.id].mobility) {
                interactionData[message.id].mobility = true;
                rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
            } else {
                interactionData[message.id].mobility = false;
                rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
            }
            rows.push(rowBuilder);
        }

        if (interaction.customId == "charge_station_u") {
            rows.push(message.components[0], message.components[1]);
            
            let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
            
            if (!interactionData[message.id].chargeStation) {
                interactionData[message.id].chargeStation = true;
                rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
            } else {
                interactionData[message.id].chargeStation = false;
                rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
                interactionData[message.id].chargeStationBalance = false;
                rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
            }
            rows.push(rowBuilder);
        }

        if (interaction.customId == "charge_station_b") {
            rows.push(message.components[0], message.components[1]);
            
            let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
            
            if (!interactionData[message.id].chargeStationBalance) {
                interactionData[message.id].chargeStationBalance = true;
                rowBuilder.components[2].setStyle(discord.ButtonStyle.Success);
                interactionData[message.id].chargeStation = true;
                rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
            } else {
                interactionData[message.id].chargeStationBalance = false;
                rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
            }

            rows.push(rowBuilder);
        }
        
        

        if (interaction.customId == "balance_tu") {
            rows.push(message.components[0], message.components[1]);
            
            let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
            
            if (!interactionData[message.id].endgameChargeStation) {
                interactionData[message.id].endgameChargeStation = true;
                rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
            } else {
                interactionData[message.id].endgameChargeStation = false;
                rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
                interactionData[message.id].endgameChargeStationBalanced = false;
                rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
            }
            rows.push(rowBuilder, message.components[3]);
        }

        if (interaction.customId == "balance_tb") {
            rows.push(message.components[0], message.components[1]);
            
            let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
            
            if (!interactionData[message.id].endgameChargeStationBalanced) {
                interactionData[message.id].endgameChargeStationBalanced = true;
                rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
                interactionData[message.id].endgameChargeStation = true;
                rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
            } else {
                interactionData[message.id].endgameChargeStationBalanced = false;
                rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
            }

            rows.push(rowBuilder, message.components[3]);
        }

        if (interaction.customId == "playing_station_single") {
            rows.push(message.components[0], message.components[1], message.components[2]);
            
            let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[3] as discord.APIActionRowComponent<discord.APIButtonComponent>);
            
            if (!interactionData[message.id].playerStationSingle) {
                interactionData[message.id].playerStationSingle = true;
                rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
            } else {
                interactionData[message.id].playerStationSingle = false;
                rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
            }

            rows.push(rowBuilder);
        }

        if (interaction.customId == "playing_station_double") {
            rows.push(message.components[0], message.components[1], message.components[2]);
            
            let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[3] as discord.APIActionRowComponent<discord.APIButtonComponent>);
            
            if (!interactionData[message.id].playerStationDouble) {
                interactionData[message.id].playerStationDouble = true;
                rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
            } else {
                interactionData[message.id].playerStationDouble = false;
                rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
            }

            rows.push(rowBuilder);
        }

        if (["top_pos", "mid_pos", "low_pos"].indexOf(interaction.customId) != -1) {
            let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
            
            rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
            rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
            rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
            
            const indexes = {"top_pos": 0, "mid_pos": 1, "low_pos": 2};
            const variableNames = {"top_pos": "startTop", "mid_pos": "startMid", "low_pos": "startLow"};
            rowBuilder.components[indexes[interaction.customId]].setStyle(discord.ButtonStyle.Success);
            
            interactionData[message.id].top_pos = false;
            interactionData[message.id].mid_pos = false;
            interactionData[message.id].low_pos = false;

            interactionData[message.id][variableNames[interaction.customId]] = true;
            
            rows.push(message.components[0], rowBuilder);
        }
        
        if (interaction.customId == "match_number") {
            let text = new discord.TextInputBuilder()
                .setStyle(discord.TextInputStyle.Short)
                .setLabel("Match Number")
                .setMinLength(1)
                .setMaxLength(2)
                .setCustomId("set_match_number");
                
            let modal = new discord.ModalBuilder()
                .setCustomId("match_number_" + message.channelId + "_" + message.id)
                .setTitle("Input")
                .addComponents(new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(text));

            await interaction.showModal(modal);
            updateEmbed = false;
        }

        rows.push(selectRow);
        if (updateEmbed) {
            await interaction.deferUpdate();
            
            let newEmbed = discord.EmbedBuilder.from(message.embeds[0])
            await applyEmbedEdit(newEmbed, interactionData[message.id])
            await interaction.editReply({content: "", embeds: [newEmbed], components: rows});
        }
    }
}

async function handlerStringSelectInteraction(interaction: discord.StringSelectMenuInteraction) {
    if (interaction.message.id in commandMessages && commandMessages[interaction.message.id].command == "scout") {
        let message: discord.Message = interaction.message;

        let selectRow: discord.ActionRow<discord.MessageActionRowComponent> = null;
        let selectMenu: any = null;

        for (let i = 0; i < message.components.length; i++) {
            for (let j = 0; j < message.components[i].components.length; j++) {
                if (message.components[i].components[j].customId == "selections") {
                    selectRow = message.components[i];
                    selectMenu = message.components[i].components[j];
                    break;
                }
            }
        }
        if (!(message.id in interactionData)) {
            interactionData[message.id] = {}
        }

        let rows = [];
        let updateInteraction = true;
        let value: string = interaction.values[0];
        let newEmbed: discord.EmbedBuilder = discord.EmbedBuilder.from(message.embeds[0]);

        console.log(message.id);

        if (value == "game_piece") {
            let coneBuilder = new discord.ActionRowBuilder();
            let cubeBuilder = new discord.ActionRowBuilder();
            let endgameBuilder = new discord.ActionRowBuilder();
            let playerStationBuilder = new discord.ActionRowBuilder();

            function constructButton(id: string, label: string, key: string) {
                let style: discord.ButtonStyle = discord.ButtonStyle.Secondary;
                
                if (interactionData[message.id][key] > 0) {
                    style = discord.ButtonStyle.Success;
                }

                return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
            }
            
            coneBuilder.addComponents(constructButton("high_cone", "High Cone", "highCone"));
            coneBuilder.addComponents(constructButton("mid_cone", "Mid Cone", "midCone"));
            coneBuilder.addComponents(constructButton("low_cone", "Low Cone", "lowCone"));
            cubeBuilder.addComponents(constructButton("high_cube", "High Cube", "highCube"));
            cubeBuilder.addComponents(constructButton("mid_cube", "Mid Cube", "midCube"));
            cubeBuilder.addComponents(constructButton("low_cube", "Low Cube", "lowCone"));
            cubeBuilder.addComponents(new discord.ButtonBuilder().setCustomId("cycles_button_dec").setStyle(discord.ButtonStyle.Danger).setLabel("-1 Last Button"));
            
            endgameBuilder.addComponents(new discord.ButtonBuilder().setCustomId("balance_tu").setLabel("Charge Station")
                        .setStyle(interactionData[message.id].endgameChargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
                    new discord.ButtonBuilder()
                        .setCustomId("balance_tb").setLabel("Balanced Station")
                        .setStyle(interactionData[message.id].endgameChargeStationBalanced ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));

            
            playerStationBuilder.addComponents(new discord.ButtonBuilder().setCustomId("playing_station_single").setLabel("Single Player Station")
                        .setStyle(interactionData[message.id].playerStationSingle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
                    new discord.ButtonBuilder().setCustomId("playing_station_double").setLabel("Playing Station Double")
                        .setStyle(interactionData[message.id].playerStationDouble ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));

                

            rows.push(coneBuilder, cubeBuilder, endgameBuilder, playerStationBuilder);
            
            newEmbed.setFooter({text: "Editing game piece data."});
        } else if (value == "game_data") {
            let builder = new discord.ActionRowBuilder()
                .addComponents(new discord.ButtonBuilder().setLabel("Set Match Number").setCustomId("match_number").setStyle(discord.ButtonStyle.Secondary));
            
            let positionBuilder = new discord.ActionRowBuilder()
                .addComponents(new discord.ButtonBuilder().setLabel("Top").setCustomId("top_pos")
                    .setStyle(interactionData[message.id].startTop ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
                new discord.ButtonBuilder().setLabel("Middle").setCustomId("mid_pos")
                    .setStyle(interactionData[message.id].stopMiddle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
                new discord.ButtonBuilder().setLabel("Low").setCustomId("low_pos")
                    .setStyle(interactionData[message.id].stopLow ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
                
            rows.push(builder, positionBuilder);
            newEmbed.setFooter({text: "Editing game data."});
        } else if (value == "autonomous") {
            let coneBuilder = new discord.ActionRowBuilder();
            let cubeBuilder = new discord.ActionRowBuilder();
            let autoBuilder = new discord.ActionRowBuilder();

            function constructButton(id: string, label: string, key: string) {
                let style: discord.ButtonStyle = discord.ButtonStyle.Secondary;
                
                if (interactionData[message.id][key] > 0) {
                    style = discord.ButtonStyle.Success;
                }

                return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
            }
            
            coneBuilder.addComponents(constructButton("high_cone_a", "High Cone", "highConeAuto"));
            coneBuilder.addComponents(constructButton("mid_cone_a", "Mid Cone", "midConeAuto"));
            coneBuilder.addComponents(constructButton("low_cone_a", "Low Cone", "lowConeAuto"));
            cubeBuilder.addComponents(constructButton("high_cube_a", "High Cube", "highCubeAuto"));
            cubeBuilder.addComponents(constructButton("mid_cube_a", "Mid Cube", "midCubeAuto"));
            cubeBuilder.addComponents(constructButton("low_cube_a", "Low Cube", "lowConeAuto"));
            coneBuilder.addComponents(new discord.ButtonBuilder().setCustomId("cycles_button_dec_a").setStyle(discord.ButtonStyle.Danger).setLabel("-1 Last Button"));
            autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("mobility")
                .setStyle(interactionData[message.id].mobility ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                .setLabel("Mobility"));
            autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_u")
                .setStyle(interactionData[message.id].chargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                .setLabel("Charge Station"));
            autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_b")
                .setStyle(interactionData[message.id].chargeStationBalance ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
                .setLabel("Balanced Station"));
            rows.push(coneBuilder, cubeBuilder, autoBuilder);
            newEmbed.setFooter({text: "Editing autonomous data."});

        } else if (value == "notes") {
            let auto = new discord.TextInputBuilder()
                .setStyle(discord.TextInputStyle.Paragraph)
                .setLabel("Autonomous Notes")
                .setMinLength(0)
                .setMaxLength(2000)
                .setCustomId("auto_notes")
                .setPlaceholder("No notes")
                .setRequired(false)
                .setValue(interactionData[message.id].autoNotes);

            let misc = new discord.TextInputBuilder()
                .setStyle(discord.TextInputStyle.Paragraph)
                .setLabel("Autonomous Notes")
                .setMinLength(0)
                .setMaxLength(2000)
                .setPlaceholder("No notes")
                .setCustomId("tele_notes")
                .setRequired(false)
                .setValue(interactionData[message.id].teleNotes);

            let tele = new discord.TextInputBuilder()
                .setStyle(discord.TextInputStyle.Paragraph)
                .setLabel("Autonomous Notes")
                .setMinLength(0)
                .setMaxLength(2000)
                .setPlaceholder("No notes")
                .setCustomId("misc_notes")
                .setRequired(false)
                .setValue(interactionData[message.id].miscNotes);
                
            let modal = new discord.ModalBuilder()
                .setCustomId("set_notes_" + message.channelId + "_" + message.id)
                .setTitle("Input")
                .addComponents(new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(auto),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(tele),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(misc));

            await interaction.showModal(modal);
            updateInteraction = false;
        }

        let label: string = null;
        
        for (let i = 0; i < selectMenu.data.options.length; i++) {
            if (selectMenu.data.options[i].value == value) {
                label = selectMenu.data.options[i].label;
                break;
            }
        }
        
        selectMenu.data.placeholder = label;
        if (updateInteraction) {
            await interaction.update({content: ""});
        }
        rows.push(selectRow)
        message.edit({embeds: [newEmbed], components: rows});

    }
}

async function handleChatInputCommandInteraction(interaction: discord.ChatInputCommandInteraction) {
    if (interaction.commandName == "scout") {
        
        
    }
}

async function handleModalSubmitInteraction(interaction: discord.ModalSubmitInteraction) {
    if (interaction.customId.startsWith("cycle_modal")) {
        let split: any = interaction.customId.split("_")
        
        let messageId: string = split[2];
        let channelId: string = split[3];

        let channel: discord.DMChannel = client.channels.cache.get(channelId) as discord.DMChannel;
        let message: discord.Message = channel.messages.cache.get(messageId);
        
        interactionData[messageId].cycles = (interaction.fields.getField("cycle_input") as discord.TextInputModalData).value;

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

        interactionData[messageId].matchNumber = (interaction.fields.getField("set_match_number") as discord.TextInputModalData).value;

        let newEmbed = discord.EmbedBuilder.from(message.embeds[0]);

        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }

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

        await interaction.deferUpdate();
        await applyEmbedEdit(newEmbed, interactionData[message.id]);
        await message.edit({content: "", embeds: [newEmbed], components: message.components});
    }
}

export async function handleInteraction(interaction: discord.Interaction) {
    if (interaction.isStringSelectMenu()) {
        await handlerStringSelectInteraction(interaction);
    } else if (interaction.isButton()) {
        await handlerButtonInteraction(interaction);
    } else if (interaction.isChatInputCommand()) {
        await handleChatInputCommandInteraction(interaction);
    } else if (interaction.isModalSubmit()) {
        await handleModalSubmitInteraction(interaction);
    }

}