import { Team } from 'discord.js';
import * as mysql from 'mysql';
import * as blueAlliance from './blueAlliance';

type TeamData = {
    teamNumber: number;
    teamName: string;
    rookieYear: number;
};

export class BotData {
    teamNumber: number;
    autoJson: ModeData;
    teleJson: ModeData;
    mobility: boolean;
    startingGrid: number;
    substation: number;
    cycleTime: number;
    scouter: number;
    drivetrain: number;
    botNote: string;
    constructor(row: mysql.RowDataPacket) {
        this.teamNumber = row.teamNumber;
        this.autoJson = JSON.parse(row.autoJson);
        this.teleJson = JSON.parse(row.teleJson);
        this.mobility = row.mobility;
        this.startingGrid = row.startingGrid;
        this.substation = row.substation;
        this.cycleTime = row.cycleTime;
        this.scouter = row.scouter;
        this.drivetrain = row.drivetrain;
        this.botNote = row.botNote;
    }
};

export type BotStats = {
    teamNumber: number;
    avgConesAuto: GridData;
    avgConesTele: GridData;
    avgCubesAuto: GridData;
    avgCubesTele: GridData;
    avgCycles: number;
    charge: number;
    balance: number;
    autoCharge: boolean;
    autoBalance: boolean;
    autoMobility: boolean;
}

type GridData = {
    low: number;
    mid: number;
    high: number;
}

type ModeData = {
    cubes: GridData;
    cones: GridData;
    onCharge: boolean;
    balance: boolean;
    totalPoints: number;
    notes: string;
}

export class MatchData {
    teamNumber: number;
    qualNumber: number;
    autoJson: ModeData;
    teleJson: ModeData;
    mobility: boolean;
    startingGrid: number;
    substation: number;
    cycleTime: number;
    scouter: number;

    constructor(row: mysql.RowDataPacket) {
        this.teamNumber = row.teamNumber;
        this.qualNumber = row.qualNumber;
        this.autoJson = JSON.parse(row.autoJson);
        this.teleJson = JSON.parse(row.teleJson);
        this.mobility = row.mobility;
        this.startingGrid = row.startingGrid;
        this.substation = row.substation;
        this.cycleTime = row.cycleTime;
        this.scouter = row.scouter;
    }
}

let con = mysql.createConnection({
	host: "192.168.1.247",
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: "scouter"
});

con.connect((err) => {
	if(err) {
		console.log(err);
	} else {
		console.log("MySQL connected successfully");
	}
});

/**
 * Checks if team is already registered in database
 * @param teamNumber Team Number
 * @returns Promise for the resulting boolean
 */
export function doesTeamExist(teamNumber: number): Promise<boolean> {
    let prom = new Promise<boolean>((resolve, reject) => {
        con.query("SELECT * FROM teamData WHERE teamNumber=" + teamNumber, (err, results, fields) => {
            resolve(results.length > 0);
        });
    });
    return prom;
}

/**
 * Pulls basic team data from bluealliance and adds it to database
 * @param teamNumber Team Number
 */
export async function addNewTeamByBlueAlliance(teamNumber: number) {
    let teamData = blueAlliance.requestTeamData(teamNumber);
    if(!(await doesTeamExist(teamNumber))) {
        addNewTeam(await teamData);
    }
}

/**
 * Internal function for adding team with the blueAlliance data (does not check if team already in database)
 * @param teamData BlueAlliance team data
 */
function addNewTeam(teamData: blueAlliance.BlueTeamData): void {
    con.query("INSERT INTO teamData VALUES (" + teamData.team_number + ", \"" + teamData.nickname + "\", " + teamData.rookie_year + ")", (err, results, fields) => {
        if(err) console.log(err);
    });
}

/**
 * Gets basic team data from database
 * @param teamNumber Team Number
 * @returns Promise for the TeamData object containing the information
 */
export async function getTeamData(teamNumber: number): Promise<TeamData> {
    let prom = new Promise<TeamData>((resolve, reject) => {
        con.query("SELECT * FROM teamData WHERE teamNumber=" + teamNumber, async (err, results, fields) => {
            if(err) console.log(err);
            if(results.length > 0) {
                resolve(results[0] as TeamData);
            } else {
                let td = await blueAlliance.requestTeamData(teamNumber);
                resolve({teamNumber: td.team_number, teamName: td.nickname, rookieYear: td.rookie_year} as TeamData);
                addNewTeam(td);
            }
        });
    });
    return prom;
}

export function addMatchRecord(data: MatchData) {
    con.query("INSERT INTO matchData VALUES (" + data.teamNumber + 
    ", " + data.qualNumber + 
    ", \"" + JSON.stringify(data.autoJson).replaceAll("\"", "\\\"") + 
    "\", \"" + JSON.stringify(data.teleJson).replaceAll("\"", "\\\"") +
    "\", " + data.mobility +
    ", " + data.startingGrid +
    ", " + data.substation + 
    ", " + data.cycleTime +
    ", " + data.scouter + 
    ")", (err, results, fields) => {
        if(err) console.log(err);
    });
}

/**
 * Gets the data for a past qualification round
 * @param teamNumber Team Number
 * @param qualNumber The Qualification Match number
 * @returns Promise for the MatchData object containing the information
 */
export async function getMatchData(teamNumber: number, qualNumber: number): Promise<MatchData> {
    let prom = new Promise<MatchData>((resolve, reject) => {
        con.query("SELECT * FROM matchData WHERE teamNumber=" + teamNumber + " AND qualNumber=" + qualNumber, async (err, results, fields) => {
            if(err) console.log(err);
            if(results.length > 0) {
                resolve(new MatchData(results[0]));
            } else {
                resolve({} as MatchData);
            }
        });
    });
    return prom;
}

export async function getBotStats(teamNumber: number): Promise<BotStats> {
    let prom = new Promise<BotStats>((resolve, reject) => {
        con.query("SELECT * FROM matchData WHERE teamNumber=" + teamNumber, async (err, results, fields) => {
            if(err) console.log(err);
            if(results.length > 0) {
                let botStats: BotStats = {
                    teamNumber: teamNumber,
                    avgConesAuto: {
                        low: 0,
                        mid: 0,
                        high: 0
                    },
                    avgConesTele: {
                        low: 0,
                        mid: 0,
                        high: 0
                    },
                    avgCubesAuto: {
                        low: 0,
                        mid: 0,
                        high: 0
                    },
                    avgCubesTele: {
                        low: 0,
                        mid: 0,
                        high: 0
                    },
                    avgCycles: 0,
                    charge: 0,
                    balance: 0,
                    autoCharge: false,
                    autoBalance: false,
                    autoMobility: false
                }
                for(let i = 0; i < results.length; i++) {
                    let data = new MatchData(results[i]);
                    botStats.avgConesAuto.high += data.autoJson.cones.high;
                    botStats.avgConesAuto.mid += data.autoJson.cones.mid;
                    botStats.avgConesAuto.low += data.autoJson.cones.low;
                    botStats.avgConesTele.high += data.teleJson.cones.high;
                    botStats.avgConesTele.mid += data.teleJson.cones.mid;
                    botStats.avgConesTele.low += data.teleJson.cones.low;
                    botStats.avgCubesAuto.high += data.autoJson.cubes.high;
                    botStats.avgCubesAuto.mid += data.autoJson.cubes.mid;
                    botStats.avgCubesAuto.low += data.autoJson.cubes.low;
                    botStats.avgCubesTele.high += data.teleJson.cubes.high;
                    botStats.avgCubesTele.mid += data.teleJson.cubes.mid;
                    botStats.avgCubesTele.low += data.teleJson.cubes.low;
                    botStats.avgCycles += data.teleJson.cones.high + data.teleJson.cones.mid + data.teleJson.cones.low +
                            data.teleJson.cubes.high + data.teleJson.cubes.mid + data.teleJson.cubes.low;
                    botStats.charge += data.teleJson.onCharge ? 1 : 0;
                    botStats.balance += data.teleJson.balance ? 1 : 0;
                    botStats.autoCharge = botStats.autoCharge || data.autoJson.onCharge;
                    botStats.autoBalance = botStats.autoBalance || data.autoJson.balance;
                    botStats.autoMobility = botStats.autoMobility || data.mobility;
                }
                botStats.avgConesAuto.high /= results.length;
                botStats.avgConesAuto.mid /= results.length;
                botStats.avgConesAuto.low /= results.length;
                botStats.avgConesTele.high /= results.length;
                botStats.avgConesTele.mid /= results.length;
                botStats.avgConesTele.low /= results.length;
                botStats.avgCubesAuto.high /= results.length;
                botStats.avgCubesAuto.mid /= results.length;
                botStats.avgCubesAuto.low /= results.length;
                botStats.avgCubesTele.high /= results.length;
                botStats.avgCubesTele.mid /= results.length;
                botStats.avgCubesTele.low /= results.length;
                botStats.avgCycles /= results.length;
                botStats.charge /= results.length;
                botStats.balance /= results.length;
                resolve(botStats);
            } else {
                resolve({} as BotStats);
            }
        });
    });
    return prom;
}

export async function getBotNotes(teamNumber: number): Promise<string[]> {
    let prom = new Promise<string[]>((resolve, reject) => {
        con.query("SELECT * FROM matchData WHERE teamNumber=" + teamNumber, async (err, results, fields) => {
            if(err) console.log(err);
            if(results.length > 0) {
                let r: string[] = [];
                let botData = await getBotData(teamNumber);
                r.push(botData.autoJson.notes);
                r.push(botData.teleJson.notes);
                r.push(botData.botNote);
                for(let i = 0; i < results.length; i++) {
                    let data = new MatchData(results[i]);
                    r.push(data.autoJson.notes);
                    r.push(data.teleJson.notes);
                }
                resolve(r);
            } else {
                resolve([]);
            }
        });
    });
    return prom;
}

export function addBotData(data: BotData) {
    con.query("INSERT INTO botData VALUES (" + data.teamNumber + 
    ", \"" + JSON.stringify(data.autoJson).replaceAll("\"", "\\\"") + 
    "\", \"" + JSON.stringify(data.teleJson).replaceAll("\"", "\\\"") +
    "\", " + data.mobility +
    ", " + data.startingGrid +
    ", " + data.substation + 
    ", " + data.cycleTime +
    ", " + data.scouter + 
    ", " + data.drivetrain +
    ", \"" + data.botNote +
    "\")", (err, results, fields) => {
        if(err) console.log(err);
    });
}

/**
 * Gets the data for a bot scouted in the pit
 * @param teamNumber Team Number
 * @returns Promise for the BotData object containing the information
 */
export async function getBotData(teamNumber: number): Promise<BotData> {
    let prom = new Promise<BotData>((resolve, reject) => {
        con.query("SELECT * FROM botData WHERE teamNumber=" + teamNumber, async (err, results, fields) => {
            if(err) console.log(err);
            if(results.length > 0) {
                resolve(new BotData(results[0]));
            } else {
                resolve({} as BotData);
            }
        });
    });
    return prom;
}