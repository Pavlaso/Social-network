import React, { FC, useEffect} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import "antd/dist/antd.css"
import ProfileContainer from "./components/Profile/Content/ProfileContaimer";
import { Provider, useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./Redux/AppReducer";
import Preloader from "./components/comon/Preloader/Preloader";
import store, {AppStateType} from "./Redux/ReduxStore";
import Login from "./components/login/Login";
import Messages from "./components/Messange/Messages/Messages";
import Users from "./components/Users/Users";
import {Layout} from 'antd';
import HeaderJS from "./components/Header/Header";
import ChatPage from "./components/chatPages/Chat/ChatPage";
const {Content, Footer } = Layout;


const App: FC = () => {
    const initialized = useSelector((state:AppStateType) => state.AppPage.initialized)
    const dispatch = useDispatch()

    useEffect(() => {dispatch(initializeApp())})
    if (!initialized) {return <Preloader/>}
return <div>
    <Layout>
       <HeaderJS/>
        <Content className="site-layout" style={{ padding: '20px 50px', marginTop: 64 }}>
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
        </Content>
        <Footer style={{ textAlign: 'center'}}>Hacker Сlub ©2021 Created by Timofey Vlasov</Footer>
    </Layout>
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

