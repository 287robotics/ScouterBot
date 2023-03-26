import * as dotenv from 'dotenv';
dotenv.config();

import * as blueAlliance from './blueAlliance';
import * as discord from "discord.js";
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as mysql from 'mysql';

let DISCORD_BOT_API = process.env.DISCORD_BOT_API;
let DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands: discord.Collection<string, any> = new discord.Collection();
const jsonCommands: string[] = [];
const rest: discord.REST = new discord.REST({ version: "10"}).setToken(DISCORD_BOT_API);

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		console.log(command.data.name);
		commands.set(command.data.name, command);
		jsonCommands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(discord.Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(discord.Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

(async () => {
	try {
		await rest.put(
			discord.Routes.applicationCommands(DISCORD_CLIENT_ID),
			{ body: jsonCommands },
		);
	} catch (error) {
		console.error(error)
	}
})();

// let con = mysql.createConnection({
// 	host: "192.168.1.247",
// 	user: process.env.MYSQL_USER,
// 	password: process.env.MYSQL_PASS,
// 	database: "scouter"
// });

// con.connect((err) => {
// 	if(err) {
// 		console.log("fuck");
// 		console.log(err);
// 	} else {
// 		con.query("SELECT * FROM teamData;", (err, results, fields) => {
// 			if(err) console.log(err);
// 			console.log(results[0]);
// 		});
// 	}
// });

client.login(DISCORD_BOT_API);