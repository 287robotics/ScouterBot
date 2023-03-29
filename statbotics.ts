import * as request from 'request';

export class Stats {
    key: string;
    comp_level: string;
    match_number: number;
    red_1: number;
    red_2: number;
    red_3: number;
    red_epa_sum: number;
    red_auto_epa_sum: number;
    red_teleop_epa_sum: number;
    red_endgame_epa_sum: number;
    blue_1: number;
    blue_2: number;
    blue_3: number;
    blue_epa_sum: number;
    blue_auto_epa_sum: number;
    blue_teleop_epa_sum: number;
    blue_endgame_epa_sum: number;
    winner: string;
    epa_winner: string;
    epa_win_prob: number;
    red_score: number;
    blue_score: number;
}

export function requestMatchData(matchNumber: number): Promise<Stats> {
    let prom = new Promise<Stats>((resolve, reject) => {
        request({
            headers: {
                "Accept": "application/json",
            },
            uri: "https://api.statbotics.io/v2/match/2023nyli2_qm" + matchNumber,
            method: "GET"
        }, (err, res, body) => resolve(JSON.parse(body) as Stats));
    });
    return prom;
}
