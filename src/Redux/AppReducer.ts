import {getAuthData} from "./AuthReducer"
import {BaseThunkType, InferActionsTypes} from "./ReduxStore";

const installSate = {initialized: false}
const appReducer = (state = installSate, action: ActionsType):installSateType=> {
    switch (action.type) {
        case 'App/SET_INITIALIZED' : {
            return{...state, initialized: true,} }
        default:
            return state;
    }
}

export const actions = {initializedSuccess: () => ({type: 'App/SET_INITIALIZED'})}
export const initializeApp = (): ThunkType => {
    return async (dispatch) => {
        let promise = dispatch(getAuthData())
                promise.then(() => {
                    dispatch(actions.initializedSuccess())
                })
            }
}

export default appReducer;


type installSateType = typeof installSate
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>