import {FC} from "react";

type PropsType = {
    match: any
    myId: number
}
let UserId: FC<PropsType> = (props)  => {
    let userId = props.match.params.userId;
    if(userId) {
        return userId
    } else {
        userId = props.myId
        return userId
    }
}
export default UserId