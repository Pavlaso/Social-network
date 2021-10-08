import {usersAPI} from "../API/UsersAPI";
import {ObjectHelpers} from "./ObjectsHelpers";
import {usersType} from "../assets/types/typesTs";
import {ThunkAction} from "redux-thunk";
import { AppStateType, InferActionsTypes} from "./ReduxStore";
import {Dispatch, } from "react";
import {ResponseType} from "../API/api";

let installSate = {
    filter: {
        term: "",
        friend: null as null | boolean
    },
    users: [] as Array<usersType>,
    PageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users ids
    portionSize: 5,
}

const UsersReducers = (state = installSate, action: ActionTypes):installSateType => {
    switch (action.type) {
        case 'FOLLOW' :
            return {
                ...state, users: ObjectHelpers({followed: true}, state.users,
                    action.userId, 'id')
            }
        case 'UNFOLLOW' :
            return {
                ...state, users: ObjectHelpers({followed: false}, state.users,
                                                            action.userId, 'id')
            }
        case 'SET_USERS' : {return {...state, users: action.user}}
        case 'SET_PAGE'  : {return {...state, currentPage: action.page}}
        case 'SET_FILTER'  : {return {...state, filter: action.payload}}
        case 'SET_USERS_COUNT'  : {return {...state, totalUsersCount: action.totalCount}}
        case 'SET_LOADING'  : {return {...state, isFetching: action.isFetching}}
        case 'SET_FOLLOWING_PROGRESS'  : {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:return state;
    }
}

export const UsersActions = {
    follow: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollow:  (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers:  (user: Array<usersType>) => ({type: 'SET_USERS', user} as const),
    setTotalUsersCount: (totalCount: number)=> ({type: 'SET_USERS_COUNT', totalCount} as const),
    setPage: (page: number) => ({type: 'SET_PAGE', page} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter }as const),
    setLoading: (isFetching: boolean) => ({type: 'SET_LOADING', isFetching} as const),
    setFollowing: (followingInProgress: boolean, userId: number) => ({type: 'SET_FOLLOWING_PROGRESS', followingInProgress, userId} as const)
}

export const requestUsers = (currentPage: number, PageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(UsersActions.setLoading(true));
        dispatch(UsersActions.setPage(currentPage));
        dispatch(UsersActions.setFilter(filter));
        let data = await usersAPI.GetUsers(currentPage, PageSize, filter.term, filter.friend)
        dispatch(UsersActions.setLoading(false));
        dispatch(UsersActions.setUsers(data.items));
        dispatch(UsersActions.setTotalUsersCount(data.totalCount));
    }
}

const _FollowUnfollowFlow = async (dispatch: DispatchType, id: number, APIMethod: (id: number) => Promise<ResponseType>, ActionCreator: (id: number) => any) => {
    dispatch(UsersActions.setFollowing(true, id))
    let res = await APIMethod(id)
    if (res.resultCode === 0) {
        dispatch(ActionCreator(id))
    }
    dispatch(UsersActions.setFollowing(false, id))
}
export const Follow = (id:number): ThunkType => {
    return async (dispatch) => {
       await _FollowUnfollowFlow(dispatch, id, usersAPI.Follow.bind(usersAPI), UsersActions.follow)
    }
}
export const UnFollow = (id: number): ThunkType=> {
    return async (dispatch) => {
       await _FollowUnfollowFlow(dispatch, id, usersAPI.UnFollow.bind(usersAPI), UsersActions.unfollow)
    }
}

export default UsersReducers;

export type installSateType = typeof installSate
export type FilterType = typeof installSate.filter
type ActionTypes = InferActionsTypes<typeof UsersActions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
//type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
