import axios from "axios";
import {usersType} from "../assets/types/typesTs";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https:social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "c638b650-ca37-497d-b9a2-1fca26113d1f"},
})
export type ResponseType<D = {}, RC = ResultsCodes>  = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export enum ResultsCodes {
    Success = 0,
    Error = 1,
}

export enum ResultsCodesForCaptcha {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GetUsersType = {
    items: Array<usersType>
    totalCount: number
    error: null | string
}



