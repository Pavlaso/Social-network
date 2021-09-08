import s from "./Mes.module.css"
import MessageReduxForm from "./MessageForm"
import { useDispatch, useSelector} from "react-redux";
import {actions, dialogType} from "../../../../Redux/MessageReducer"
import {AppStateType} from "../../../../Redux/ReduxStore";
import React, { FC } from "react";

const Message: FC = () => {
    const MesData = useSelector((state: AppStateType):Array<dialogType>  => state.MessagesPage.MesData)
    const dispatch = useDispatch()
    const onSubmit = (values: any) => {dispatch(actions.CreatorAddMessage(values.NewMessageBody))}
    return (
        <div>
            <div className={s.components}>
                {MesData.map(m => (<div  key={m.id}>{m.message} </div>))}
            </div>
             <MessageReduxForm onSubmit={onSubmit}/>
        </div>)
}

export default Message

