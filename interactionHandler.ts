import * as discord from "discord.js";

let interactionData = {};

async function applyEmbedEdit(embedBuilder: discord.EmbedBuilder, interactionData) {
    embedBuilder.setFields({name: "**__Game Pieces**__", value: 
        ("**High Cone**: " + (interactionData.highCone ? "Yes" : "No") + "\n" +
        "**Mid Cone**: " + (interactionData.midCone ? "Yes" : "No") + "\n" +
        "**Low Cone**: " + (interactionData.lowCone ? "Yes" : "No") + "\n" +
        "**High Cube**: " + (interactionData.highCube ? "Yes" : "No") + "\n" +
        "**Mid Cube**: " + (interactionData.midCube ? "Yes" : "No") + "\n" +
        "**Low Cube**: " + (interactionData.lowCube ? "Yes" : "No" )+ "\n" +
        "**Cycles**: " + interactionData.cycles + "\n")
    })
}

function initInteractionDataPit() {
    let data: any = {}
    data.highCone = false;
    data.midCone = false;
    data.lowCone = false;
    data.highCube = false;
    data.midCube = false;
    data.lowCube = false;
    data.cycles = 0;
    
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
    if (interaction["message"].interaction.commandName == "scout") {
        let message: discord.Message = interaction["message"];
        
        let rows = [];

        let selectRow: discord.ActionRow<discord.MessageActionRowComponent> = message.components[message.components.length - 1];

        
        function updateConeCube(id: string) {
            let rowBuilder: discord.ActionRowBuilder = null;
            const indexes = {"high_cone": 0, "mid_cone": 1, "low_cone": 2, "high_cube": 0, "mid_cube": 1, "low_cube": 2}

            const vars = {"high_cone": "highCone", "mid_cone": "midCone", "low_cone": "lowCone", "high_cube": "highCube", "mid_cube": "midCube", "low_cube": "lowCube"}

            if (id.endsWith("cone")) {
                rowBuilder = discord.ActionRowBuilder.from(message.components[0]);
                rows.push(rowBuilder, message.components[1], message.components[2]);

            } else {
                rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
                rows.push(message.components[0], rowBuilder, message.components[2]);
            }

            if (interaction.component.style == discord.ButtonStyle.Secondary) {
                interactionData[message.id][vars[id]] = true;
                // @ts-ignore
                rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Primary);
            } else {
                interactionData[message.id][vars[id]] = false;
                // @ts-ignore
                rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Secondary);
            }
        }

        if (["high_cone", "mid_cone", "low_cone", "high_cube", "mid_cube", "low_cube"].indexOf(interaction.customId) != -1) {
            updateConeCube(interaction.customId)
        }
        await interaction.update({content: ""});
        rows.push(selectRow);
        // @ts-ignore
        message.edit({embeds: message.embeds, components: rows})

    }

}

async function handlerStringSelectInteraction(interaction: discord.StringSelectMenuInteraction) {
    if (interaction["message"].interaction.commandName == "scout") {
        let message: discord.Message = interaction["message"];
        let selectRow: discord.ActionRow<discord.MessageActionRowComponent> = null;
        let selectMenu: any = null;

        for (let i = 0; i < message.components.length; i++) {
            for (let j = 0; j < message.components[j].components.length; j++) {
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
        
        // @ts-ignore
        let value: string = interaction.values[0];
        let newEmbed: discord.EmbedBuilder = discord.EmbedBuilder.from(message.embeds[0]);

        console.log(message.id);

        if (value == "game_piece") {
            let coneBuilder = new discord.ActionRowBuilder();
            let cubeBuilder = new discord.ActionRowBuilder();
            let textBuilder = new discord.ActionRowBuilder();

            function constructButton(id: string, label: string, key: string) {
                let style: discord.ButtonStyle = discord.ButtonStyle.Secondary;
                
                if (interactionData[message.id][key]) {
                    style = discord.ButtonStyle.Primary;
                }

                return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
            }
            
            coneBuilder.addComponents(constructButton("high_cone", "High Cone", "highCone"));
            coneBuilder.addComponents(constructButton("mid_cone", "Mid Cone", "midCone"));
            coneBuilder.addComponents(constructButton("low_cone", "Low Cone", "lowCone"));
            cubeBuilder.addComponents(constructButton("high_cube", "High Cube", "highCube"));
            cubeBuilder.addComponents(constructButton("mid_cube", "Mid Cube", "midCube"));
            cubeBuilder.addComponents(constructButton("low_cube", "Low Cube", "lowCone"));
            coneBuilder.addComponents(new discord.ButtonBuilder().setCustomId("cycles_button").setStyle(discord.ButtonStyle.Primary));
            rows.push(coneBuilder, cubeBuilder);
            
            newEmbed.setFooter({text: "Editing game piece data."});
        }
        
        let label: string = null;
        
        for (let i = 0; i < selectMenu.data.options.length; i++) {
            if (selectMenu.data.options[i].value == value) {
                label = selectMenu.data.options[i].label;
                break;
            }
        }
        
        selectMenu.data.placeholder = label;
        await interaction.update({content: ""});

        rows.push(selectRow)
        // @ts-ignore
        message.edit({embeds: [newEmbed], components: rows});

    }
}

async function handleChatInputCommandInteraction(interaction: discord.ChatInputCommandInteraction) {
    if (interaction.commandName == "scout") {
        let message: discord.Message = await interaction.fetchReply();
        interactionData[message.id] = initInteractionDataPit(); 
        let embedBuilder: discord.EmbedBuilder = discord.EmbedBuilder.from(message.embeds[0]);
        await applyEmbedEdit(embedBuilder, interactionData[message.id]);
        await message.edit({embeds: [embedBuilder]});
        console.log("?");
    }
}

export async function handleInteraction(interaction: discord.Interaction) {
    if (interaction.isStringSelectMenu()) {
        await handlerStringSelectInteraction(interaction);
    } else if (interaction.isButton()) {
        await handlerButtonInteraction(interaction);
    } else if (interaction.isChatInputCommand()) {
        await handleChatInputCommandInteraction(interaction);
    }

}