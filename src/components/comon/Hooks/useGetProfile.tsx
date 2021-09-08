import {useEffect} from "react";
import {ProfileComponents, StatusComponent} from "../../../Redux/ProfileReducer";
import {useHistory, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/ReduxStore";

export const useGetProfile = () => {
    const myId = useSelector((state:AppStateType) => state.Auth.userId)
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const history = useHistory()
    useEffect( () => {
        // @ts-ignore
        let userId: number | null = +match.params.userId;
        if(!userId) {
            userId = myId
            if (!userId) {
                history.push('/login');
            }
        }
        dispatch(ProfileComponents(userId as number))
        dispatch(StatusComponent(userId as number))
        // @ts-ignore
    },[match.params.userId])
}
