import {authAPI} from "../API/AuthAPI"
import {FormAction, stopSubmit} from "redux-form"
import { BaseThunkType, InferActionsTypes} from "./ReduxStore";
import {securityAPI} from "../API/SecurityAPI";
import {ResultsCodes, ResultsCodesForCaptcha} from "../API/api";

let installSate = {
    userId: null as number | null,
    email: null as string | null ,
    loginData: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

const AuthReducers = (state = installSate, action: ActionsType):installSateType => {
    switch (action.type) {
        case 'Auth/SET_USER_DATA' : {
            return {...state, ...action.data,}
        }
        case 'Auth/SET_CAPTCHA_IMAGE' : {
            return {...state, captchaURL: action.url,}
        }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null , email: string | null, loginData: string | null, isAuth: boolean) =>
        ({type: 'Auth/SET_USER_DATA', data: {userId, email, loginData, isAuth}}as const),

    setCaptchaImage: (url: string) => ({type: 'Auth/SET_CAPTCHA_IMAGE', url} as const)
}

export const getAuthData = (): ThunkType => {
    return async (dispatch) => {
        return authAPI.me().then(data => {
            if (data.resultCode === ResultsCodes.Success) {
                let {id, login: loginData, email,} = data.data;
                dispatch(actions.setAuthUserData(id, email, loginData, true))
            }
        })
    }
}
export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.loginAPI(email, password, rememberMe,captcha)
        if (data.resultCode === ResultsCodes.Success) {
            dispatch(getAuthData())
        } else {
            if (data.resultCode === ResultsCodesForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptcha())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'some Error'
            dispatch(stopSubmit('formLogin', {_error: message}))
        }
    }
}
export const Logout = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.Logout()
        if (data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
    }
}
export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        const data = await securityAPI.captcha()
        dispatch(actions.setCaptchaImage(data.url))
    }
}

export default AuthReducers;

type installSateType = typeof installSate
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
//type GetStateType = () => AppStateType
//type DispatchType = Dispatch<ActionsTypes>