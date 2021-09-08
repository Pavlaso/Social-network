import styles from './ProfileInfo.module.css'
import Preloader from "../../../comon/Preloader/Preloader"
import Ava from "./../../../../assets/images/icon-5359553_1280.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import {ChangeEvent, FC, useState} from "react"
import ProfileDataFormContainer from "./ProfileDataForm"
import {useDispatch, useSelector} from "react-redux"
import {savePhoto, saveProfile} from "../../../../Redux/ProfileReducer"
import {AppStateType} from "../../../../Redux/ReduxStore"
import {useRouteMatch} from "react-router-dom";

const ProfileInfo: FC = () => {
    const profile = useSelector((state:AppStateType) => state.ProfilePage.profile)
    const dispatch = useDispatch()
    const match = useRouteMatch()
    //@ts-ignore
    const isOwner= !match.params.userId
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    const onMinePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }
    const onSubmit = async (fromData: any) => {
        await dispatch(saveProfile(fromData))
        setEditMode(false)
    }
    return <div className={styles.content}>
        <div>
            <img className={styles.ava} alt={'ava'} src={profile.photos.large ? profile.photos.large : Ava}/>
            {isOwner && <input type={'file'} onChange={onMinePhotoSelected}/>}
        </div>
        {editMode
            ? <ProfileDataFormContainer  initialValues={profile} profile={profile} onSubmit={onSubmit}/>
            : <ProfileData  profile={profile}  isOwner={isOwner}
                           goToEditMode={() => {setEditMode(true)}}/>}
    </div>

}
type PropsContactA = { contactTitle: string; contactValue: string }
 const ContactA: FC<PropsContactA> = ({contactTitle, contactValue}) => {
    return <div className={styles.contacts}>{contactValue && <> {contactTitle + ": "}{contactValue}</>}</div>
}


type ProfileDataPropsType = {
    profile: any
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>Edit Profile</button></div>}
        <div className={styles.name}>
            {profile.fullName}
        </div>
        <div className={styles.status}>
            Status:<ProfileStatusWithHooks/>
        </div>
        <div>
            <b>Looking for a job </b>{profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
            <b>My professional skills: </b> {profile.lookingForAJobDescription}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <ContactA key={key} contactTitle={key} contactValue={profile.contacts[key]
            }/>
        })}
        </div>
    </div>
}

export default ProfileInfo