import *  as discord from "discord.js";
import * as blueAlliance from "../blueAlliance";
import * as main from "../main";
import * as interactionHandler from "../interactionHandler";
import { ScoutData } from "./scout";
import { BotData, addBotData } from "../database";


export let data = new discord.SlashCommandBuilder()
		.setName('scoutpit')
		.setDescription('piss your\'e pant')
		.addNumberOption(option =>
			option.setName("teamnumber")
				.setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
				.setRequired(true));

export async function handleButtonInteraction(interaction: discord.ButtonInteraction) {
    let message = interaction.message;
    let interactionData = interactionHandler.interactionData[message.id];

    let rows = [];
    let selectRow = message.components[message.components.length - 1];
    let updateEmbed = true;

    if (interaction.customId == "mobility") {
		rows.push(message.components[0]);

		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.mobility) {
			interactionData.mobility = true;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.mobility = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		}
		rows.push(rowBuilder);
	}

	if (interaction.customId == "charge_station_u") {
		rows.push(message.components[0]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.chargeStation) {
			interactionData.chargeStation = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.chargeStation = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
			interactionData.chargeStationBalance = false;
			rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
		}
		rows.push(rowBuilder);
	}

	if (interaction.customId == "charge_station_b") {
		rows.push(message.components[0]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.chargeStationBalance) {
			interactionData.chargeStationBalance = true;
			rowBuilder.components[2].setStyle(discord.ButtonStyle.Success);
			interactionData.chargeStation = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.chargeStationBalance = false;
			rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
		}

		rows.push(rowBuilder);
	}

    if (interaction.customId == "balance_tu") {
		rows.push(message.components[0]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.endgameChargeStation) {
			interactionData.endgameChargeStation = true;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.endgameChargeStation = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
			interactionData.endgameChargeStationBalanced = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		}
		rows.push(rowBuilder, message.components[2]);
	}

	if (interaction.customId == "balance_tb") {
		rows.push(message.components[0]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.endgameChargeStationBalanced) {
			interactionData.endgameChargeStationBalanced = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
			interactionData.endgameChargeStation = true;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.endgameChargeStationBalanced = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		}

		rows.push(rowBuilder, message.components[2]);
	}


    if (interaction.customId == "high_cone") {
        let h_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("high_cones")
            .setLabel("High");

        let m_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("mid_cones")
            .setLabel("Middle");
        
        let l_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("low_cones")
            .setLabel("Low");

        let modal = new discord.ModalBuilder()
			.setCustomId("set_cone_" + message.channelId + "_" + message.id)
			.setTitle("Input Cones")
			.addComponents(new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(h_cone),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(m_cone),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(l_cone));

        await interaction.showModal(modal);

        updateEmbed = false;
    }

    if (interaction.customId == "high_cube") {
        let h_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("high_cubes")
            .setLabel("High");

        let m_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("mid_cubes")
            .setLabel("Middle");
        
        let l_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("low_cubes")
            .setLabel("Low");

        let modal = new discord.ModalBuilder()
			.setCustomId("set_cube_" + message.channelId + "_" + message.id)
			.setTitle("Input Cube")
			.addComponents(new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(h_cone),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(m_cone),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(l_cone));

        await interaction.showModal(modal);

        updateEmbed = false;
    }

    if (interaction.customId == "high_cube_a") {
        let h_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("high_cubes")
            .setLabel("High");

        let m_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("mid_cubes")
            .setLabel("Middle");
        
        let l_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("low_cubes")
            .setLabel("Low");

        let modal = new discord.ModalBuilder()
			.setCustomId("aset_cube_" + message.channelId + "_" + message.id)
			.setTitle("Input Cube")
			.addComponents(new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(h_cone),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(m_cone),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(l_cone));

        await interaction.showModal(modal);

        updateEmbed = false;
    }

    if (interaction.customId == "high_cone_a") {
        let h_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("high_cones")
            .setLabel("High");

        let m_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("mid_cones")
            .setLabel("Middle");
        
        let l_cone = new discord.TextInputBuilder().setStyle(discord.TextInputStyle.Short).setMaxLength(2).setMinLength(0)
            .setRequired(false)
            .setCustomId("low_cones")
            .setLabel("Low");

        let modal = new discord.ModalBuilder()
			.setCustomId("aset_cone_" + message.channelId + "_" + message.id)
			.setTitle("Input Cone")
			.addComponents(new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(h_cone),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(m_cone),
                new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(l_cone));

        await interaction.showModal(modal);
        // console.log("Yeah")
        updateEmbed = false;
    }

    if (interaction.customId == "pre_cone") {
		rows.push(message.components[0]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.preloadedCone) {
			interactionData.preloadedCone = true;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
			interactionData.preloadedCube = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		} else {
			interactionData.preloadedCone = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		}

		rows.push(rowBuilder, message.components[2]);
	}

	if (interaction.customId == "pre_cube") {
		rows.push(message.components[0]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.preloadedCube) {
			interactionData.preloadedCube = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
			interactionData.preloadedCone = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		} else {
			interactionData.preloadedCube = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		}
		
		rows.push(rowBuilder, message.components[2]);
	}

    if (interaction.customId == "playing_station_single") {
		rows.push(message.components[0], message.components[1]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.playerStationSingle) {
			interactionData.playerStationSingle = true;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.playerStationSingle = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		}

		rows.push(rowBuilder);
	}

	if (interaction.customId == "playing_station_double") {
		rows.push(message.components[0], message.components[1]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.playerStationDouble) {
			interactionData.playerStationDouble = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.playerStationDouble = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		}

		rows.push(rowBuilder);
	}

    if (["tank", "swerve", "other"].indexOf(interaction.customId) != -1) {
        rows.push(message.components[0], message.components[1]);
        const indexes = {"tank": 1, "swerve": 0, "other": 2};
        const vals = {"tank": 0, "swerve": 1, "other": 2};

        let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);

        rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
        rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
        rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);

        rowBuilder.components[indexes[interaction.customId]].setStyle(discord.ButtonStyle.Success);
        interactionData.drivetrain = vals[interaction.customId];

        rows.push(rowBuilder);
    }
    if (["top_pos", "mid_pos", "low_pos"].indexOf(interaction.customId) != -1) {
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[0] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		rowBuilder.components[2].setStyle(discord.ButtonStyle.Danger);
		
		const indexes = {"top_pos": 0, "mid_pos": 1, "low_pos": 2};
		const variableNames = {"top_pos": "startTop", "mid_pos": "startMid", "low_pos": "startLow"};
		rowBuilder.components[indexes[interaction.customId]].setStyle(discord.ButtonStyle.Success);
		
		interactionData.top_pos = false;
		interactionData.mid_pos = false;
		interactionData.low_pos = false;

		interactionData[variableNames[interaction.customId]] = true;
		
		rows.push(rowBuilder, message.components[1], message.components[2]);
	}

    if (interaction.customId == "submit_button") {
        let data: BotData = {
            teamNumber: interactionData.teamNumber,
			autoJson: {
				cubes: {
					low: interactionData.lowCubeAuto,
					mid: interactionData.midCubeAuto,
					high: interactionData.highCubeAuto
				},
				cones: {
					low: interactionData.lowConeAuto,
					mid: interactionData.midConeAuto,
					high: interactionData.highConeAuto
				},
				onCharge: interactionData.chargeStation,
				balance: interactionData.chargeStationBalance,
				totalPoints: 0,
				notes: interactionData.autoNotes
			},
			teleJson: {
				cubes: {
					low: interactionData.lowCube,
					mid: interactionData.midCube,
					high: interactionData.highCube
				},
				cones: {
					low: interactionData.lowCone,
					mid: interactionData.midCone,
					high: interactionData.highCone
				},
				onCharge: interactionData.endgameChargeStation,
				balance: interactionData.endgameChargeStationBalanced,
				totalPoints: 0,
				notes: interactionData.teleNotes
			},
			mobility: interactionData.mobility,
			startingGrid: interactionData.startTop ? 0 : (interactionData.startMiddle ? 1 : 2),
			substation: (interactionData.playerStationSingle ? 1 : 0) + (interactionData.playerStationDouble ? 2 : 0),
			cycleTime: 120 / (interactionData.cycles + 1),
			scouter: 82734023,
            drivetrain: interactionData.drivetrain,
            botNote: interactionData.miscNotes
        }
        addBotData(data);
        await interaction.update({content: ""});
        await message.delete();
        return;
    }

    rows.push(selectRow);

	if (updateEmbed) {		
        await interaction.deferUpdate();

		let newEmbed = discord.EmbedBuilder.from(message.embeds[0])
		await interactionHandler.applyEmbedEdit(newEmbed, interactionData)
		await interaction.editReply({content: "", embeds: [newEmbed], components: rows});
	}

}

export async function handleStringSelectInteraction(interaction: discord.StringSelectMenuInteraction) {
    let message: discord.Message = interaction.message;

    let selectRow: discord.ActionRow<discord.MessageActionRowComponent> = null;
    let selectMenu: any = null;
    let interactionData = interactionHandler.interactionData[message.id];

    for (let i = 0; i < message.components.length; i++) {
        for (let j = 0; j < message.components[i].components.length; j++) {
            if (message.components[i].components[j].customId == "selections") {
                selectRow = message.components[i];
                selectMenu = message.components[i].components[j];
                break;
            }
        }
    }

    let rows = [];
    let updateInteraction = true;
    let value: string = interaction.values[0];
    let newEmbed: discord.EmbedBuilder = discord.EmbedBuilder.from(message.embeds[0]);

    if (value == "game_piece") {
        let coneBuilder = new discord.ActionRowBuilder();
        let endgameBuilder = new discord.ActionRowBuilder();
        let playerStationBuilder = new discord.ActionRowBuilder();

        function constructButton(id: string, label: string, key: string) {
            let style: discord.ButtonStyle = discord.ButtonStyle.Secondary;
    
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        
        coneBuilder.addComponents(constructButton("high_cone", "Cones", ""));
        coneBuilder.addComponents(constructButton("high_cube", "Cubes", ""));
        
        endgameBuilder.addComponents(new discord.ButtonBuilder().setCustomId("balance_tu").setLabel("Charge Station")
                    .setStyle(interactionData.endgameChargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
                new discord.ButtonBuilder()
                    .setCustomId("balance_tb").setLabel("Balanced Station")
                    .setStyle(interactionData.endgameChargeStationBalanced ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));

        
        playerStationBuilder.addComponents(new discord.ButtonBuilder().setCustomId("playing_station_single").setLabel("Single Player Station")
                    .setStyle(interactionData.playerStationSingle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
                new discord.ButtonBuilder().setCustomId("playing_station_double").setLabel("Playing Station Double")
                    .setStyle(interactionData.playerStationDouble ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));

        rows.push(coneBuilder, endgameBuilder, playerStationBuilder);
        
        newEmbed.setFooter({text: "Editing game piece data."});
    } else if (value == "game_data") {
        let positionBuilder = new discord.ActionRowBuilder()
            .addComponents(new discord.ButtonBuilder().setLabel("Top").setCustomId("top_pos")
                .setStyle(interactionData.startTop ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
            new discord.ButtonBuilder().setLabel("Middle").setCustomId("mid_pos")
                .setStyle(interactionData.startMiddle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
            new discord.ButtonBuilder().setLabel("Low").setCustomId("low_pos")
                .setStyle(interactionData.startLow ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
        
        let preloadRow = new discord.ActionRowBuilder()
            .addComponents(new discord.ButtonBuilder().setLabel("Preloaded Cone").setCustomId("pre_cone")
                .setStyle(interactionData.preloadedCone ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
            new discord.ButtonBuilder().setLabel("Preloaded Cube").setCustomId("pre_cube")
                .setStyle(interactionData.preloadedCube ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
        );

        let driveTrainRow = new discord.ActionRowBuilder()
            .addComponents(new discord.ButtonBuilder().setLabel("Swerve").setCustomId("swerve")
                .setStyle(interactionData.drivetrain == 1 ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
                new discord.ButtonBuilder().setLabel("Tank").setCustomId("tank")
                    .setStyle(interactionData.drivetrain == 0 ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
                new discord.ButtonBuilder().setLabel("Other").setCustomId("other")
                    .setStyle(interactionData.drivetrain == 2 ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger))
                
        rows.push(positionBuilder, preloadRow, driveTrainRow);
        newEmbed.setFooter({text: "Editing game data."});

    } else if (value == "autonomous") {
        let coneBuilder = new discord.ActionRowBuilder();
        let autoBuilder = new discord.ActionRowBuilder();

        function constructButton(id: string, label: string, key: string) {
            let style: discord.ButtonStyle = discord.ButtonStyle.Secondary;
            
            return new discord.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
        }
        
        coneBuilder.addComponents(constructButton("high_cone_a", "Cone", "highConeAuto"));
        coneBuilder.addComponents(constructButton("high_cube_a", "Cube", "midConeAuto"));
        autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("mobility")
            .setStyle(interactionData.mobility ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
            .setLabel("Mobility"));
        autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_u")
            .setStyle(interactionData.chargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
            .setLabel("Charge Station"));
        autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_b")
            .setStyle(interactionData.chargeStationBalance ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
            .setLabel("Balanced Station"));

        rows.push(coneBuilder, autoBuilder);
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
            .setValue(interactionData.autoNotes);

        let misc = new discord.TextInputBuilder()
            .setStyle(discord.TextInputStyle.Paragraph)
            .setLabel("TeleOp Notes")
            .setMinLength(0)
            .setMaxLength(2000)
            .setPlaceholder("No notes")
            .setCustomId("tele_notes")
            .setRequired(false)
            .setValue(interactionData.teleNotes);

        let tele = new discord.TextInputBuilder()
            .setStyle(discord.TextInputStyle.Paragraph)
            .setLabel("Misc Notes")
            .setMinLength(0)
            .setMaxLength(2000)
            .setPlaceholder("No notes")
            .setCustomId("misc_notes")
            .setRequired(false)
            .setValue(interactionData.miscNotes);
            
        let modal = new discord.ModalBuilder()
            .setCustomId("set_notes_" + message.channelId + "_" + message.id)
            .setTitle("Input")
            .addComponents(new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(auto),
            new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(tele),
            new discord.ActionRowBuilder<discord.TextInputBuilder>().addComponents(misc));
        
        await interaction.showModal(modal);
        updateInteraction = false;

    } else if (value == "submit") {
        let row = new discord.ActionRowBuilder().addComponents(new discord.ButtonBuilder().setCustomId("submit_button").setLabel("Confirm").setStyle(discord.ButtonStyle.Success));
        rows.push(row);
    }

    let label: string = null;
    
    for (let i = 0; i < selectMenu.data.options.length; i++) {
        if (selectMenu.data.options[i].value == value) {
            label = selectMenu.data.options[i].label;
            break;
        }
    }
    
    rows.push(selectRow)

    
    selectMenu.data.placeholder = label;
    
    if (updateInteraction) {
        await interaction.deferUpdate();
        await interaction.editReply({embeds: [newEmbed], components: rows});
    }
}
    
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
							label: 'Prematch Data',
							description: 'Pre-Match data.',
							value: 'game_data',
						},
						{
							label: "Autonomous",
							description: "Autonomous data",
							value: "autonomous"
						},
						{
							label: 'TeleOp',
							description: 'TeleOp data',
							value: 'game_piece',
						},
						{
							label: "Notes",
							description: "Notes and stuff",
							value: "notes"
						},
						{
							label: "Submit",
							description: "Submit information",
							value: "submit"
						}
					),
			);

    if (interaction.channel != null && !interaction.channel.isDMBased()) {
        await interaction.deferReply({ephemeral: true});
        let message: discord.Message = await interaction.user.send({embeds: [embed], components: [row]});
        
        interactionHandler.commandMessages[message.id] = {}
        interactionHandler.commandMessages[message.id].command = "scoutPit"

        interactionHandler.doDmInit(message, teamNumber, Number(interaction.user.id));
        
        interaction.editReply({content: "Scout sheet has been sent to your dm"});
    } else {
        await interaction.deferReply({ephemeral: true});
        let message: discord.Message = await interaction.user.send({embeds: [embed], components: [row]});
        
        interactionHandler.commandMessages[message.id] = {}
        interactionHandler.commandMessages[message.id].command = "scoutPit"
        interactionHandler.doDmInit(message, teamNumber, Number(interaction.user.id));
        
        await interaction.deleteReply();
    }
}