import {LoginFormValuesType} from "./LoginForm"
import { useDispatch, useSelector} from "react-redux"
import {getAuthData, loginThunk, } from "../../Redux/AuthReducer"
import {Redirect} from "react-router-dom"
import {FC, useEffect} from "react"
import {AppStateType} from "../../Redux/ReduxStore"
import LoginForm from "./LoginForm";

const Login: FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.Auth.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {dispatch(getAuthData())})

    if(isAuth) {return <Redirect to={'/profile'}/>}

    const onSubmit = (fromData: LoginFormValuesType) => {
        dispatch(loginThunk(fromData.email, fromData.password, fromData.rememberMe, fromData.captcha));
    }

    return (
        <div>
            <header >
                <h1>Login</h1>
            </header>
            {
            <LoginForm onSubmit={onSubmit}/>
            }
        </div>
    )
}

export default Login
