import {ChatMessageType} from "../components/pages/Chat/ChatPage"
import {StatusType} from "../Redux/ChatReducer";

type EventNamesType = 'messageReceived' | 'statusChanged'

const subscribers = {
    'messageReceived': [] as MessageReceivedSubscriberType[],
    'statusChanged':  [] as StatusChangedSubscriberType[]
}
let ws: WebSocket | null = null
const closeHandler = () => {
    console.log('CLOSE ME')
    setTimeout( createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messageReceived'].forEach((s: any ) => s(newMessages))
}
const openHandler = () => {
    notifySubscribesAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribesAboutStatus('error')
    console.error('REFRESH PAGE')
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribesAboutStatus = (status: StatusType) => {
    subscribers['statusChanged'].filter(s => s(status))
}
function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribesAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)

}

export const ChatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messageReceived'] = []
        subscribers['statusChanged'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventNamesType, callBack: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        //todo: Проблемы с типизацией
        // @ts-ignore
        subscribers[eventName].push(callBack)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callBack)
        }
    },
    unsubscribe(eventName: EventNamesType, callBack: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callBack)
    },
    sendMessageAPI(message: string) {
        ws?.send(message)
    }
}
type MessageReceivedSubscriberType = (message: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void