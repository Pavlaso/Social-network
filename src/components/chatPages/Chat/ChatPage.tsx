import React, {FC, useEffect, useRef, useState} from "react";
import style from "../../Messange/Items/Name/Name.module.css";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../Redux/ChatReducer";
import {AppStateType} from "../../../Redux/ReduxStore";
import {withAuthRedirect} from "../../../assets/HOC/withAuthRedirect";

const ChatPage: FC = () => {
    const status = useSelector((state: AppStateType) => state.Chat.status)
    const dispatch = useDispatch()
    // start rendering Messages
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {dispatch(stopMessagesListening())}}, [])

    return <div>
        {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
        <Messages/>
        <AddChatMessageForm/>

    </div>
}
export default withAuthRedirect(ChatPage)

export const Messages: FC = React.memo(() => {
    const messages = useSelector((state:AppStateType) => state.Chat.messages)

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [IsAutoScroll, setIsAutoScroll]= useState(false)

    // Self-written scroll
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent> ) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !IsAutoScroll && setIsAutoScroll(true)
        } else {
            IsAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if(IsAutoScroll)
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    return <div  className={style.chat} onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}/>
    </div>
})

export const Message: FC<{message: ChatMessageType}> = ({message}) => {
    return <div>
        <img alt={'ava'} className={style.src} src={message.photo}/> <b> {message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}


export const AddChatMessageForm: FC = () => {
    const status = useSelector((state: AppStateType) => state.Chat.status)
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')

    const sendMessageHandler = () => {
        if(!message) {
        }
        dispatch(sendMessage(message))
        setMessage('')
    }



    return <div>
        <div>
            <textarea  onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            {// todo:Чёт кнопка не disabled'ца, я хер пойму, вроде писал код, старался, а она ((((
            }
            <button disabled={status !== 'ready'}  onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}