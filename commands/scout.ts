import *  as discord from "discord.js";
import * as blueAlliance from "../blueAlliance";
import * as main from "../main";
import * as interactionHandler from "../interactionHandler";
import * as database from "../database";

export let data = new discord.SlashCommandBuilder()
		.setName('scout')
		.setDescription('piss your\'e pant AGIAN')
		.addNumberOption(option =>
			option.setName("teamnumber")
				.setDescription("HAHAHAHAAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAA")
				.setRequired(true));

export type ScoutData = {
    highConeAuto: number;
    midConeAuto: number;
    lowConeAuto: number;
    highCubeAuto: number;
    midCubeAuto: number;
    lowCubeAuto: number;
    startTop: boolean;
    startMiddle: boolean;
    startLow: boolean;
    autoNotes: string;
    teleNotes: string;
    miscNotes: string;
    cycles: number;
    quals: boolean;
	teamNumber: number;
	playerStationSingle: any;
	playerStationDouble: any;
	top_pos: boolean;
	mid_pos: boolean;
	low_pos: boolean;
	preloadedCone: any;
	preloadedCube: boolean;
	mobility: boolean;
	chargeStation: boolean;
	chargeStationBalance: boolean;
	endgameChargeStation: boolean;
	endgameChargeStationBalanced: boolean;
	matchNumber: number;
	highCone: number;
	midCone: number;
	lowCone: number;
	highCube: number;
	midCube: number;
	lowCube: number;
	drivetrain: number;
	scouter: number;
}

export async function handleButtonInteraction(interaction: discord.ButtonInteraction) {
	let message: discord.Message = interaction["message"];
	let rows = [];
	let selectRow: discord.ActionRow<discord.MessageActionRowComponent> = message.components[message.components.length - 1];
	
	let updateEmbed = true;
	let interactionData = interactionHandler.interactionData[message.id] as ScoutData;
	const indexes = {"high_cone": 0, "mid_cone": 1, "low_cone": 2, "high_cube": 0, "mid_cube": 1, "low_cube": 2,
						"high_cone_a": 0, "mid_cone_a": 1, "low_cone_a": 2, "high_cube_a": 0, "mid_cube_a": 1, "low_cube_a": 2};

	const vars = {"high_cone": "highCone", "mid_cone": "midCone", "low_cone": "lowCone", "high_cube": "highCube", "mid_cube": "midCube", "low_cube": "lowCube",
					"high_cone_a": "highConeAuto", "mid_cone_a": "midConeAuto", "low_cone_a": "lowConeAuto", "high_cube_a": "highCubeAuto", "mid_cube_a": "midCubeAuto", "low_cube_a": "lowCubeAuto"};

	function updateConeCube(id: string) {
		let rowBuilder: discord.ActionRowBuilder<discord.ButtonBuilder> = null;
		
		interactionHandler.commandMessages[interaction.message.id].lastGamePieceId = id;

		if (id.indexOf("cone") != -1) {
			rowBuilder = discord.ActionRowBuilder.from(message.components[0] as discord.APIActionRowComponent<discord.APIButtonComponent>);
			rows.push(rowBuilder, message.components[1], message.components[2]);
		} else {
			rowBuilder = discord.ActionRowBuilder.from(message.components[1] as discord.APIActionRowComponent<discord.APIButtonComponent>);
			rows.push(message.components[0], rowBuilder, message.components[2]);
		}

		if (message.components.length == 5) {
			rows.push(message.components[3]);
		}
		
		interactionData[vars[id]] += 1;
		
		if (interactionData[vars[id]] > 0) {
			rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Success);
		} else {
			rowBuilder.components[indexes[id]].setStyle(discord.ButtonStyle.Secondary);
		
		}
	}

	if (["high_cone", "mid_cone", "low_cone", "high_cube", "mid_cube", "low_cube",
			"high_cone_a", "mid_cone_a", "low_cone_a", "high_cube_a", "mid_cube_a", "low_cube_a"].indexOf(interaction.customId) != -1) {
		updateConeCube(interaction.customId);
	}

	
	if ((interaction.customId == "cycles_button_dec" || interaction.customId == "cycles_button_dec_a") && "lastGamePieceId") {  
		let lastGamePieceId = interactionHandler.commandMessages[message.id].lastGamePieceId;
		
		if (lastGamePieceId && interactionData[vars[lastGamePieceId]] > 0) {
			interactionData[vars[lastGamePieceId]] -= 2
			updateConeCube(lastGamePieceId);
		} else {
			rows.push(message.components[0], message.components[1], message.components[2]);

			if (message.components.length == 5) {
				rows.push(message.components[3]);
			}
		}
	}

	if (interaction.customId == "cycles_button_dec_a") {
		// rows.push(message.components[2]);
	}
	
	// if (["high_cone_a", "mid_cone_a", "low_cone_a", "high_cube_a", "mid_cube_a", "low_cube_a"].indexOf(interaction.customId) != -1) {
	// 	rows.push(message.components[2]);
	// }

	if (interaction.customId == "mobility") {
		rows.push(message.components[0], message.components[1]);

		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
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
		rows.push(message.components[0], message.components[1]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
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
		rows.push(message.components[0], message.components[1]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
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
		rows.push(message.components[0], message.components[1]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.endgameChargeStation) {
			interactionData.endgameChargeStation = true;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.endgameChargeStation = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
			interactionData.endgameChargeStationBalanced = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		}
		rows.push(rowBuilder, message.components[3]);
	}

	if (interaction.customId == "balance_tb") {
		rows.push(message.components[0], message.components[1]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.endgameChargeStationBalanced) {
			interactionData.endgameChargeStationBalanced = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
			interactionData.endgameChargeStation = true;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.endgameChargeStationBalanced = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		}

		rows.push(rowBuilder, message.components[3]);
	}

	if (interaction.customId == "submit_button") {
		await interaction.update({content: ""});
		await message.delete();
		let data: database.MatchData = {
			teamNumber: interactionData.teamNumber,
			qualNumber: interactionData.matchNumber,
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
			scouter: 82734023
		};
		database.addMatchRecord(data);
		return;
	}

	if (interaction.customId == "playing_station_single") {
		rows.push(message.components[0], message.components[1], message.components[2]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[3] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
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
		rows.push(message.components[0], message.components[1], message.components[2]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[3] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.playerStationDouble) {
			interactionData.playerStationDouble = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.playerStationDouble = false;
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
		
		interactionData.top_pos = false;
		interactionData.mid_pos = false;
		interactionData.low_pos = false;

		interactionData[variableNames[interaction.customId]] = true;
		
		rows.push(message.components[0], rowBuilder, message.components[2]);
	}

	if (interaction.customId == "qual") {		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[0] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.quals) {
			interactionData.quals = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
		} else {
			interactionData.quals = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		}

		rows.push(rowBuilder, message.components[1], message.components[2]);
	}
	
	if (interaction.customId == "pre_cone") {
		rows.push(message.components[0], message.components[1]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.preloadedCone) {
			interactionData.preloadedCone = true;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Success);
			interactionData.preloadedCube = false;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Danger);
		} else {
			interactionData.preloadedCone = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		}

		rows.push(rowBuilder);
	}

	if (interaction.customId == "pre_cube") {
		rows.push(message.components[0], message.components[1]);
		
		let rowBuilder = discord.ActionRowBuilder.from<discord.ButtonBuilder>(message.components[2] as discord.APIActionRowComponent<discord.APIButtonComponent>);
		
		if (!interactionData.preloadedCube) {
			interactionData.preloadedCube = true;
			rowBuilder.components[1].setStyle(discord.ButtonStyle.Success);
			interactionData.preloadedCone = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		} else {
			interactionData.preloadedCube = false;
			rowBuilder.components[0].setStyle(discord.ButtonStyle.Danger);
		}
		
		rows.push(rowBuilder);
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

	if (interaction.customId == "discard_button") {
		// interactionHandler.interactionData

		await interaction.update({content: ""});
		await message.delete();
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

	console.log(message.id);

	if (value == "game_piece") {
		let coneBuilder = new discord.ActionRowBuilder();
		let cubeBuilder = new discord.ActionRowBuilder();
		let endgameBuilder = new discord.ActionRowBuilder();
		let playerStationBuilder = new discord.ActionRowBuilder();

		function constructButton(id: string, label: string, key: string) {
			let style: discord.ButtonStyle = discord.ButtonStyle.Secondary;
			
			if (interactionData[key] > 0) {
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
					.setStyle(interactionData.endgameChargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
				new discord.ButtonBuilder()
					.setCustomId("balance_tb").setLabel("Balanced Station")
					.setStyle(interactionData.endgameChargeStationBalanced ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));

		
		playerStationBuilder.addComponents(new discord.ButtonBuilder().setCustomId("playing_station_single").setLabel("Single Player Station")
					.setStyle(interactionData.playerStationSingle ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger),
				new discord.ButtonBuilder().setCustomId("playing_station_double").setLabel("Playing Station Double")
					.setStyle(interactionData.playerStationDouble ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));

			
		
		rows.push(coneBuilder, cubeBuilder, endgameBuilder, playerStationBuilder);
		
		newEmbed.setFooter({text: "Editing game piece data."});
	} else if (value == "game_data") {
		let builder = new discord.ActionRowBuilder()
			.addComponents(new discord.ButtonBuilder().setLabel("Set Match Number").setCustomId("match_number").setStyle(discord.ButtonStyle.Secondary),
				new discord.ButtonBuilder().setLabel("Qualification").setCustomId("qual")
					.setStyle(interactionData.quals ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger));
		
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
				
		rows.push(builder, positionBuilder, preloadRow);
		newEmbed.setFooter({text: "Editing game data."});

	} else if (value == "autonomous") {
		let coneBuilder = new discord.ActionRowBuilder();
		let cubeBuilder = new discord.ActionRowBuilder();
		let autoBuilder = new discord.ActionRowBuilder();

		function constructButton(id: string, label: string, key: string) {
			let style: discord.ButtonStyle = discord.ButtonStyle.Secondary;
			
			if (interactionData[key] > 0) {
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
			.setStyle(interactionData.mobility ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
			.setLabel("Mobility"));
		autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_u")
			.setStyle(interactionData.chargeStation ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
			.setLabel("Charge Station"));
		autoBuilder.addComponents(new discord.ButtonBuilder().setCustomId("charge_station_b")
			.setStyle(interactionData.chargeStationBalance ? discord.ButtonStyle.Success : discord.ButtonStyle.Danger)
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
		let row = new discord.ActionRowBuilder().addComponents(new discord.ButtonBuilder().setCustomId("submit_button").setLabel("Confirm")
				.setStyle(discord.ButtonStyle.Success),
			new discord.ButtonBuilder().setCustomId("discard_button").setLabel("Discard")
				.setStyle(discord.ButtonStyle.Danger));
		
		rows.push(row);
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
		interactionHandler.commandMessages[message.id].command = "scout"

		interactionHandler.doDmInit(message, teamNumber, Number(interaction.user.id));
		// await interaction.deleteReply();
		await interaction.editReply({content: "Scout sheet has been sent to your dm"});
	} else {
		await interaction.deferReply({ephemeral: true});
		let message: discord.Message = await interaction.user.send({embeds: [embed], components: [row]});
		
		interactionHandler.commandMessages[message.id] = {}
		interactionHandler.commandMessages[message.id].command = "scout"
		interactionHandler.doDmInit(message, teamNumber, Number(interaction.user.id));
		
		await interaction.deleteReply();
	}
}

