import {AppStateType} from "./ReduxStore";

export const getUsers = (state: AppStateType) => {
    return state.UserPage.users
}
export const getPageSize = (state: AppStateType) => {
    return state.UserPage.PageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.UserPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.UserPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.UserPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.UserPage.followingInProgress
}
export const getPortionSize = (state: AppStateType) => {
    return state.UserPage.portionSize
}
export const getFilter = (state: AppStateType) => {
    return state.UserPage.filter
}
