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
        <div className="login">
            <div className="bigContainer">
                <div className="containerLogin">
                    <div className="login__block">
                        <img className="login__block-image" src="https://play-lh.googleusercontent.com/zaT_wr64tZp1O1WHHl1DfJHK68KhJYvgqCWl6D7F5LJg12ti9U085mBsOTzcnb0AMyk" alt="lock" />
                        <h4 className="login__block-title">Sign in</h4>
                    </div>

                    <form className="login__form" onSubmit={props.handleSubmit}>
                        <Field className="login__first-field"  name="email" component={Input} placeholder='Email Address*' />
                        <Field className="login__second-field"  placeholder='Password*' name={'password'} validate={[required, MaxLength10]} component={Input} type={'password'}/>
                        <div className="login__third">
                            <Field className="login__third-field" name={'rememberMe'} component={Input} type={'checkbox'}/>
                            <span className="login__third-text"> Remember Me </span>
                        </div>
                        {
                            //props.error && <div className='formSummaryError'>{props.error}</div>
                        }
                        <div>
                            <button className="login__btn">SIGN IN</button>
                        </div>
                        {captchaURL && <img alt={'Captcha'} src={captchaURL}/>}
                        {captchaURL && <Field className="login__second-field"  placeholder={'Captcha'} name={'captcha'}  component={Input} />}
                    </form>
                </div>
            </div>
        </div>
        
    )
}
export default reduxForm<LoginFormValuesType, OwnProps>({form: 'formLogin'})(LoginForm)

{/* {creatorField<LoginFormValuesTypeKeys>('Password', 'password',[required, MaxLength10], Input, 'password',)} */}
// {creatorField<LoginFormValuesTypeKeys>('', 'rememberMe',[], Input, 'checkbox', 'Remember Me')}