import * as discord from "discord.js";

let interactionData = {};

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
            const indexes = {
                "high_cone": 0,
                "mid_cone": 1,
                "low_cone": 2,
                "high_cube": 0,
                "mid_cube": 1,
                "low_cube": 2,
            }

            const vars = {
                "high_cone": "highCone",
                "mid_cone": "midCone",
                "low_cone": "lowCone",
                "high_cube": "highCube",
                "mid_cube": "midCube",
                "low_cube": "lowCube",
            }

            if (id.endsWith("cone")) {
                rowBuilder = discord.ActionRowBuilder.from(message.components[0]);
                rows.push(rowBuilder, message.components[1]);

            } else {
                rowBuilder = discord.ActionRowBuilder.from(message.components[1]);
                rows.push(message.components[0], rowBuilder);
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
        console.log(interactionData[message.id]);
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

        if (value == "game_piece") {
            let coneBuilder = new discord.ActionRowBuilder();
            let cubeBuilder = new discord.ActionRowBuilder();


            function constructButton(id: string, label: string) {
                return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(discord.ButtonStyle.Secondary);
            }

            
            coneBuilder.addComponents(constructButton("high_cone", "High Cone"));
            coneBuilder.addComponents(constructButton("mid_cone", "Mid Cone"));
            coneBuilder.addComponents(constructButton("low_cone", "Low Cone"));
            cubeBuilder.addComponents(constructButton("high_cube", "High Cube"));
            cubeBuilder.addComponents(constructButton("mid_cube", "Mid Cube"));
            cubeBuilder.addComponents(constructButton("low_cube", "Low Cube"));
            
            rows.push(coneBuilder, cubeBuilder)
            
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
export async function handleInteraction(interaction: discord.Interaction) {
    console.log(interaction.isButton());
    if (interaction.isStringSelectMenu()) {
        await handlerStringSelectInteraction(interaction);
    } else if (interaction.isButton()) {
        await handlerButtonInteraction(interaction);
    }
}