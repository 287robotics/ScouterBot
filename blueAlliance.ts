import * as request from 'request';

let BLUE_ALLIANCE_API =  process.env.BLUE_ALLIANCE_API;

export class Team {
    teamNumber: number;
    currentRank: number;
    gamesWon: number;
    gamesPlayed: number;
}

export class EventData {
    eventName: string;
    rank: number;
    gamesWon: number;
    gamesPlayed: number;
}

export type BlueTeamData = {
    key: string;
    team_number: number;
    nickname: string;
    rookie_year: number;
    website: string;

    Error: string;
}

export function requestTeamData(teamNumber: number): Promise<BlueTeamData> {
    let prom = new Promise<BlueTeamData>((resolve, reject) => {
        request({
            headers: {
                "Accept": "application/json",
                "X-TBA-Auth-Key": BLUE_ALLIANCE_API
            },
            uri: "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber,
            method: "GET"
        }, (err, res, body) => resolve(JSON.parse(body) as BlueTeamData));
    });
    return prom;
}

export function requestEventData(teamNumber: number): Promise<EventData> {
    let prom = new Promise<EventData>((resolve, reject) => {
        let year: number = new Date().getFullYear();

        request({
            headers: {
                "Accept": "application/json",
                "X-TBA-Auth-Key": BLUE_ALLIANCE_API
            },
            uri: "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber + "/events/" + year + "/statuses",
            method: "GET"
        }, (err, res, body) => resolve(JSON.parse(body) as EventData));
    });
    return prom;
}

