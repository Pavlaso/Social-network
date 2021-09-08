import {ProfileAPI} from "../API/ProfileAPI"
import {FormAction, stopSubmit} from "redux-form"
import {photosType, postType, ProfileType} from "../types/typesTs"
import {BaseThunkType, InferActionsTypes} from "./ReduxStore"

let installState = {
    posts: [
        {id: 1, message: 'Hi Bro', likes: 12},
        {id: 2, message: 'My name is Alexander', likes: 1},
        {id: 3, message: 'I have Bike', likes: 2},
        {id: 4, message: 'I work in School', likes: 4},
        {id: 5, message: 'I love Anime', likes: 6}
    ] as Array<postType>,
    profile: null as ProfileType | null,
    status: '',
}

const ProfileReducer = (state = installState, action: ActionsType): installStateType => {
    switch (action.type) {
        case 'Profile/ADD_POST': {
            return {
                ...state, posts: [...state.posts, {id: state.posts.length + 1, message: action.NewPost, likes: 0}]
            }
        }
        case 'Profile/SET_USERS_PROFILE' : {return {...state, profile: action.profile}}
        case 'Profile/SET_STATUS' : {return {...state, status: action.status}}
        case 'Profile/UPDATE_PHOTO' : {return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}}
        case 'Profile/UPDATE_STATUS' : {return {...state, status: action.status}}
        case 'Profile/DELETE_POST' : {return {...state, posts: state.posts.filter(p => p.id !== action.number)}}
        default:return state;
    }
}

export const actions = {
    CreatorAddPost: (NewPost: string) => ({type: 'Profile/ADD_POST', NewPost} as const),
    deletePost: (number: number) => ({type: 'Profile/DELETE_POST', number} as const),
    setUsersProfile: (profile: ProfileType) => ({type: 'Profile/SET_USERS_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'Profile/SET_STATUS', status} as const),
    updateStatus: (status: string) => ({type: 'Profile/UPDATE_STATUS', status} as const),
    savePhotoSuccess: (photos: photosType) => ({type: 'Profile/UPDATE_PHOTO', photos} as const)

}

export const ProfileComponents = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await ProfileAPI.GetProfile(userId)
        dispatch(actions.setUsersProfile(data))
    }
}
export const StatusComponent = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await ProfileAPI.GetStatus(userId)
        dispatch(actions.setStatus(data))
    }
}
export const StatusUpdate = (status: string): ThunkType => {
    return async (dispatch) => {
        let data = await ProfileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.updateStatus(status))
        }
    }
}
export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let data = await ProfileAPI.savePhoto(file)
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos))
        }
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().Auth.userId
        let data = await ProfileAPI.setProfile(profile)
        if (data.resultCode === 0) {
            if(userId != null) {
                dispatch(ProfileComponents(userId))
            } else {
                throw new Error("UserId can't be null")
            }

        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'some Error'
            dispatch(stopSubmit('editProfile', {_error: message}))
            return Promise.reject(message)
        }
    }
}

export default ProfileReducer;

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
export type installStateType = typeof installState;