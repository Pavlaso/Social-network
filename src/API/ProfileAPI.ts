import {photosType, ProfileType} from "../assets/types/typesTs"
import {instance, ResponseType} from "./api"

type SavePhotoResponseDataType = {
    photos: photosType
}

export const ProfileAPI = {
    GetProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => response.data)
    },
    GetStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status}).then(response => response.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData,
            {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data)
    },
    setProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile).then(response => response.data)
    },
}





