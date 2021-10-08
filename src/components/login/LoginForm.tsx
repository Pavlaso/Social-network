import s from './Login.module.css';
import {InjectedFormProps, reduxForm} from 'redux-form'
import {creatorField, Input} from "../comon/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../assets/utils/Validators";
import {FC} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../Redux/ReduxStore";
import {Field} from "redux-form";

type OwnProps = any

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>



const MaxLength10 = maxLengthCreator(10)
const LoginForm: FC<InjectedFormProps<LoginFormValuesType, OwnProps>& OwnProps> = (props) => {
    const captchaURL = useSelector((state: AppStateType) => state.Auth.captchaURL)
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="email" component={Input} placeholder='Email' />

            {creatorField<LoginFormValuesTypeKeys>('Password', 'password',
                [required, MaxLength10], Input, 'password',)}

            {creatorField<LoginFormValuesTypeKeys>('', 'rememberMe',
                [], Input, 'checkbox', 'Remember Me')}

            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button >Login</button>
            </div>
            {captchaURL && <img alt={'Captcha'} src={captchaURL}/>}
            {captchaURL && creatorField('Captcha', 'captcha', [], Input, '')}
        </form>
    )
}
export default reduxForm<LoginFormValuesType, OwnProps>({form: 'formLogin'})(LoginForm)
