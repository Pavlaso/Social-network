import React, { FC } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPost} from "./MyPosts/MyPost";
import { withAuthRedirect } from "../../../assets/HOC/withAuthRedirect";
import { useGetProfile } from "../../comon/Hooks/useGetProfile";

const ProfileContainer: FC = () =>{
    useGetProfile()
        return <div>
            <ProfileInfo />
            <MyPost />
        </div>
}
export default withAuthRedirect(ProfileContainer)
