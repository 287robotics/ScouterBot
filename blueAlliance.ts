import * as request from 'request';

let teams: Team[] = [];

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

export type TeamData = {
    key: string;
    team_number: number;
    nickname: string;
    rookie_year: number;
    website: string;

    Error: string;
}

function teamDataCallback(err, res, body, callback: (data: TeamData) => any) {
    callback(JSON.parse(body) as TeamData);
}

function eventDataCallback(err, res, body, callback: (data: EventData) => any) {
    callback(JSON.parse(body));
}

export function requestTeamData(teamNumber: number, callback: (data: TeamData) => any): void {
    request({
        headers: {
            "Accept": "application/json",
            "X-TBA-Auth-Key": BLUE_ALLIANCE_API
        },
        uri: "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber,
        method: "GET"
    }, (err, res, body) => teamDataCallback(err, res, body, callback));
}

export function requestEventData(teamNumber: number, callback: (data: EventData) => any): void {
    let year: number = new Date().getFullYear();

    request({
        headers: {
            "Accept": "application/json",
            "X-TBA-Auth-Key": BLUE_ALLIANCE_API
        },
        uri: "https://www.thebluealliance.com/api/v3/team/frc" + teamNumber + "/events/" + year + "/statuses",
        method: "GET"
    }, (err, res, body) => eventDataCallback(err, res, body, callback));
}

