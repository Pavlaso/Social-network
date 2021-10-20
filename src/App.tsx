import React, { FC, useEffect} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './scss/style.scss'
import ProfileContainer from "./components/Profile/Content/ProfileContaimer";
import { Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./Redux/AppReducer";
import Preloader from "./components/comon/Preloader/Preloader";
import store, {AppStateType} from "./Redux/ReduxStore";
import Login from "./components/login/Login";
import Messages from "./components/Messange/Messages/Messages";
import Users from "./components/Users/Users";
import HeaderJS from "./components/Header/Header";
import ChatPage from "./components/chatPages/Chat/ChatPage";


const App: FC = () => {
    const initialized = useSelector((state:AppStateType) => state.AppPage.initialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    })

    if (!initialized) {return <Preloader/>}
    return <div>
           <HeaderJS/>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer />}/>
                        <Route path='/Messages' render={() => <Messages/>}/>
                        <Route path='/Users' render={() => <Users pageTitle={'Samurai'}/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/chat' render={() => <ChatPage/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            <footer style={{ textAlign: 'center'}}>Programming Hub {'\u00A9'} 2021 Created by Timofey Vlasov</footer>
    </div>
}
export const AppContainer: FC = () => {
    return <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                < App/>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
}

