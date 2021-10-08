import {ChatMessageType} from "../components/chatPages/Chat/ChatPage";
import {BaseThunkType, InferActionsTypes} from "./ReduxStore";
import {ChatAPI} from "../API/ChatAPI";
import {Dispatch} from "react";
import {v1} from 'uuid'

export type StatusType = 'pending' | 'ready' | 'error';
let installSate = {
    messages: [] as AllChatMessageType[],
    status: 'pending' as StatusType
}

let ChatReducer = (state = installSate, action: ActionsType):installSateType=> {
    switch (action.type) {
        case 'Chat/MESSAGES_RECEVIED' : {
            return{
                ...state, messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        }
        case 'Chat/STATUS_CHANGED' : { return{...state, status: action.payload.status}}
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: 'Chat/MESSAGES_RECEVIED', payload: {messages}} as const),
    ChangeStatus: (status: StatusType) => ({type: 'Chat/STATUS_CHANGED', payload: {status}} as const)
}
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch<any>) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) =>{
            dispatch(actions.messagesReceived(messages))
        }
    }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch<any>) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status) =>{
            dispatch(actions.ChangeStatus(status))
        }
    }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
        ChatAPI.start()
        ChatAPI.subscribe('messageReceived', newMessageHandlerCreator(dispatch))
        ChatAPI.subscribe('statusChanged', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
        ChatAPI.unsubscribe('messageReceived', newMessageHandlerCreator(dispatch))
        ChatAPI.unsubscribe('statusChanged', statusChangedHandlerCreator(dispatch))
        ChatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async () => {
        ChatAPI.sendMessageAPI(message)
}

export default ChatReducer;

type AllChatMessageType = ChatMessageType & {id: string }
type installSateType = typeof installSate
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>