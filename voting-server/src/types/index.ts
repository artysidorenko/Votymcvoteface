import { List, Map } from "immutable";
import { Action } from 'redux';

export const SET_COUNTRY = "SET_COUNTRY";
export type SET_COUNTRY = typeof SET_COUNTRY;
export const NEXT = "NEXT";
export type NEXT = typeof NEXT;
export const RESET = "RESET";
export type RESET = typeof RESET;
export const VOTE = "VOTE";
export type VOTE = typeof VOTE;

export interface Vote extends Map<string, List<string> | number | null> {
    pair: List<string> | null;
    round: number | null;
    results: Map<string, number> | null;
    votes: Map<string, string>;
}

export interface State extends Map<string, Vote | List<string> | string | null> {
    vote: Vote | null;
    contestants: List<string> | null;
    winner: string | null;
}

export interface SetCountryAction extends Action {
    type: SET_COUNTRY;
    contestants: List<string>;
    meta: {
        remote: boolean;
    };
}

export interface NextAction extends Action {
    type: NEXT;
    meta: {
        remote: boolean;
    };
}

export interface ResetAction extends Action {
    type: RESET;
    meta: {
        remote: boolean;
    };
}

export interface VoteAction extends Action {
    type: VOTE;
    selection: string;
    clientId: string;
    meta: {
        remote: boolean;
    };
}

export type ServerAction = SetCountryAction | NextAction | ResetAction | VoteAction
