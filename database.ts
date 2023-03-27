import * as mysql from 'mysql';
import * as blueAlliance from './blueAlliance';

type TeamData = {
    teamNumber: number;
    teamName: string;
    rookieYear: number;
}; 

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
export function getTeamData(teamNumber: number): Promise<TeamData> {
    let prom = new Promise<TeamData>((resolve, reject) => {
        con.query("SELECT * FROM teamData WHERE teamNumber=" + teamNumber, (err, results, fields) => {
            if(err) console.log(err);
            resolve(results as TeamData);
        });
    });
    return prom;
}