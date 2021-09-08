import s from "./Users.module.css"
import userPhoto from "../../assets/images/icon-5359553_1280.png"
import React, {FC} from "react"
import {NavLink} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {getFollowingInProgress} from "../../Redux/UsersSelectors";
import {Follow, UnFollow} from "../../Redux/UsersReducer";
//import {usersType} from "../../types/typesTs"

type PropsType = any

let User: FC<PropsType & {pageTitle: string}> = ({users}) => {
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch = useDispatch()
    const FollowD = (userId: number) => {
        dispatch(Follow(userId))
    }
    const UnFollowD = (userId: number) => {
        dispatch(UnFollow(userId))
    }

    return <div>

                <NavLink to={'/profile/' + users.id}>
                    <img alt={'User`s Ava'} src={users.photos.small != null ? users.photos.small
                                                        : userPhoto} className={s.photo}/>
                </NavLink>
                <div>
                    {users.followed
                        ? <button disabled={followingInProgress
                            .some(id => id === users.id)} onClick={() => {
                            UnFollowD(users.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress
                            .some(id => id === users.id)} onClick={() => {
                            FollowD(users.id)
                        }}>Follow</button>}
                </div>
                <div>{users.name}</div>
                <div>{users.status}</div>

            </div>
}
export default User;