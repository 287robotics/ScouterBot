import { Team } from 'discord.js';
import * as mysql from 'mysql';
import * as blueAlliance from './blueAlliance';

type TeamData = {
    teamNumber: number;
    teamName: string;
    rookieYear: number;
};

type BotData = {
    teamNumber: number;
    substation: number;
    drivetrain: number;
    autoBalance: boolean;
    autoMobility: boolean;
    autoDeliver: number;
    autoNote: string;
    piecePreference: number;
    firstPlacement: number;
    secondPlacement: number;
    cyclesPerMatch: number;
    canScoreHigh: boolean;
    canScoreMid: boolean;
    canScoreLow: boolean;
    scouter: number;
};

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

type MatchData = {
    teamNumber: number;
    qualNumber: number;
    autoJson: ModeData;
    teleJson: ModeData;
    mobility: boolean;
    startingGrid: number;
    substation: number;
    cycleTime: number;
    scouter: number;
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
                resolve(results[0] as MatchData);
            } else {
                resolve({} as MatchData);
            }
        });
    });
    return prom;
}

export function addBotData(data: BotData) {
    con.query("INSERT INTO matchData VALUES (" + data.teamNumber + 
    ", " + data.substation + 
    ", " + data.drivetrain + 
    ", " + data.autoBalance +
    ", " + data.autoMobility +
    ", " + data.autoDeliver +
    ", \"" + data.autoNote + 
    "\", " + data.piecePreference +
    ", " + data.firstPlacement + 
    ", " + data.secondPlacement + 
    ", " + data.cyclesPerMatch + 
    ", " + data.canScoreHigh + 
    ", " + data.canScoreMid + 
    ", " + data.canScoreLow +
    ", " + data.scouter +  
    ")", (err, results, fields) => {
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
                resolve(results[0] as BotData);
            } else {
                resolve({} as BotData);
            }
        });
    });
    return prom;
}