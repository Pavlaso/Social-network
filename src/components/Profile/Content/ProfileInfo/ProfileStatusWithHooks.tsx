import s from './ProfileInfo.module.css';
import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StatusUpdate} from "../../../../Redux/ProfileReducer";
import {AppStateType} from "../../../../Redux/ReduxStore";


const ProfileStatusWithHooks: FC= () => {
    const Status = useSelector((state:AppStateType) => state.ProfilePage.status)
    const dispatch = useDispatch()
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(Status)

    useEffect(() => {
        setStatus(Status)
    }, [Status])

    let activateEditMode = () => {
        setEditMode(true)
    }
    let deActivateEditMode = () => {
        setEditMode(false)
        dispatch(StatusUpdate(status))
    }
    let onStatusChange = (e: any) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div className={s.information}>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{Status || '-------'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateEditMode} value={status}/>
            </div>
            }
        </div>
    )

}
export default ProfileStatusWithHooks;