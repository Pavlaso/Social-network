import {instance, ResponseType, ResultsCodes, ResultsCodesForCaptcha} from "./api";

export const authAPI = {
    me: function () {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>
        (`auth/me`).then(response => response.data)
    },

    loginAPI(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<{ userId: number },  ResultsCodesForCaptcha | ResultsCodes>>
        (`auth/login`, {email, password, rememberMe, captcha}).then(response => response.data)
    },

    Logout() {
        return instance.delete<ResponseType>(`auth/login`).then(response => response.data)
    },
}





