import styles from "./ProfileInfo.module.css";
import {creatorField, Input, Textarea} from "../../../comon/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../../../login/Login.module.css";
import {FC} from "react";
import {ProfileType} from "../../../../assets/types/typesTs";
type PropsType = {
    profile: ProfileType
}
type FormProps = {
    fullName: string
    lookingForAJob:boolean
    lookingForAJobDescription: string
    contacts: any
}
type PropsTypeKeys = Extract<keyof FormProps, string>

const ProfileDataForm: FC<InjectedFormProps<FormProps, PropsType>&PropsType>= (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><button>Save</button></div>
        {props.error && <div className={s.formSummaryError}>
            {props.error} </div>}
        <div className={styles.name}>
            {creatorField<PropsTypeKeys>('Full Name', 'fullName', [], Input, '' )}
        </div>
        <div>
            <b>Looking for a job </b>
            {creatorField<PropsTypeKeys>('', 'lookingForAJob', [], Input, 'checkbox', )}
        </div>
        {<div>
            <b>My professional skills: </b> {creatorField<PropsTypeKeys>('My professional skills',
            'lookingForAJobDescription', [], Textarea, '')}
        </div>}
        {<div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {

            return <div key={key}>
                <>{key}:</> {creatorField(key, 'contacts.'+ key, [], Input, '')}
            </div>
        })}
        </div>}
    </form>
}
// const ContactB = ({contactTitle, contactValue}) => {
//     return <div className={styles.contacts}>{!contactValue && <> {contactTitle + ": "}{contactValue}</>}</div>

 const ProfileDataFormContainer = reduxForm<FormProps, PropsType>({form:'editProfile'})(ProfileDataForm)
export default ProfileDataFormContainer