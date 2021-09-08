import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer from "./ProfileReducer";
import MessageReducer from "./MessageReducer";
import UsersReducers from "./UsersReducer";
import AuthReducer from "./AuthReducer";
import thunk, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import AppReducer from "./AppReducer";
import ChatReducer from "./ChatReducer";

let rootReducer = combineReducers({
    MessagesPage: MessageReducer,
    ProfilePage: ProfileReducer,
    UserPage: UsersReducers,
    Auth: AuthReducer,
    AppPage: AppReducer,
    Chat: ChatReducer,
    form: formReducer,
})
type RootReducerType  = typeof rootReducer; // (globalState: AppStateType) => AppStateType
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U: never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type AppStateType = ReturnType<RootReducerType>
let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;