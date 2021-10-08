import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import React from "react"
import {AppStateType} from "../../Redux/ReduxStore"
import {Button, Col, Layout, Menu, Row} from "antd";
import style from './Header.module.css';
import {Logout} from "../../Redux/AuthReducer";
import Ava from "../../assets/images/icon-5359553_1280.png";
import {useGetProfile} from "../comon/Hooks/useGetProfile";
const { Header } = Layout;

const HeaderJS: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.Auth.isAuth)
    const loginData = useSelector((state: AppStateType) => state.Auth.loginData)
    const profile = useSelector((state:AppStateType) => state.ProfilePage.profile)

    let  image = profile?.photos.large && profile?.photos.large
    const LogoutCollBack = () => {dispatch(Logout())}

    const dispatch = useDispatch()
    useGetProfile()
    return <Header style={{position: 'fixed', zIndex: 1 , width: '100%', background:'white'}}>

        <div className="logo"/>
            <Row>
                <Col span={2}>
                    1
                </Col>
                <Col span={3}>
                    2
                </Col>
            <Col span={13}>
            <div className={style.opthion}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ background:'white'}}>
                   
                        <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                        <Menu.Item key="2"><Link to='/Messages'>Messages</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/Users'>Users</Link></Menu.Item>
                        <Menu.Item key="4"><Link to='/chat'>Chat</Link></Menu.Item>

                </Menu>
                </div>
            </Col>
            <Col span={5}>
                <div className={style.login}>
                    {isAuth
                        ? <div>
                            <img className={style.miniAva} alt={'ava'} src={image as string}/>
                                <span>{loginData} - </span>
                                <Button onClick={LogoutCollBack} shape="round" type="dashed" color="primary">Log out</Button>
                          </div>
                        : <div>
                            <img className={style.miniAva} alt={'ava'} src={Ava}/>
                            <Button  shape="round" type="dashed" icon={<Link to={'/login'}>Log in</Link>}/>
                        </div>}
                </div>
            </Col>
        </Row>

    </Header>
}
export default HeaderJS
