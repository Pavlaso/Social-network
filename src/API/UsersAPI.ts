import {GetUsersType, instance, ResponseType} from "./api"

export const usersAPI = {
    GetUsers(currentPage = 1, PageSize = 10, term: string, friend: null | boolean = null) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${PageSize}&term=${term}`
       + (friend === null ? '' : `&friend=${friend}`) )
            .then(response => response.data)
    },
    Follow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
    UnFollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },
}





