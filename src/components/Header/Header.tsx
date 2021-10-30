import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import React, {useEffect, useState} from "react"
import {AppStateType} from "../../Redux/ReduxStore"
import style from './Header.module.scss';
import {Logout} from "../../Redux/AuthReducer";

import classNames from "classnames";
import { useGetProfile } from "../comon/Hooks/useGetProfile";


const HeaderJS: React.FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.Auth.isAuth)
    const loginData = useSelector((state: AppStateType) => state.Auth.loginData)
    const profile = useSelector((state:AppStateType) => state.ProfilePage.profile)

    const [activeLink, setActiveLink] = useState('Profile')
    const LogoutCollBack = () => {dispatch(Logout())}
    const dispatch = useDispatch()

    const image = profile?.photos.large
    useGetProfile()
    console.log('aaaa')
    return <header>
        <div className={style.headerWrapper}>
            <div className="container">
                {isAuth && 
                <div className={style.header}>
                    <div className={style.header__logoBlock}> 
                        <img className={style.header__logoImage} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCVhOqpRckdF8xt42BWXEejQeuONyY1v191y2Cis_ED9ITOF75F-sRvqwtOUNPh6nHHE8&usqp=CAU' alt="logo" />
                        {
                            //'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png'
                        }
                        <span className={style.header__logoText} >Programming Hub</span>
                    </div>  
                    <nav className={style.header__opthion}>
                        <Link onClick={ ()=> {setActiveLink('Profile')}} className={classNames(style.header__link, activeLink == 'Profile' && style.header__linkActive) } to='/profile'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOB3nEs51RHQd2RgN2EqoBp8lh1etB1LvKeUJ0OTin4xkbSCrYn6gNxC04NZZOgXY2SVo&usqp=CAU" alt="" /></Link>
                        <Link onClick={ ()=> {setActiveLink('Messages')}} className={classNames(style.header__link, activeLink == 'Messages' && style.header__linkActive) } to='/Messages'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTK9Wf3Vxw--zS3BV9xAgMmJAiKSzQY4UVS34SA-xZ6tI-Y67ZSmZ6-ElgQHixufdIys&usqp=CAU" alt="" /></Link>
                        <Link onClick={ ()=> {setActiveLink('Users')}} className={classNames(style.header__link, activeLink == 'Users' && style.header__linkActive)} to='/Users'><img src="data:image/png;base64,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" alt="" /></Link>
                        <Link onClick={ ()=> {setActiveLink('Chat')}} className={classNames(style.header__link, activeLink == 'Chat' && style.header__linkActive)} to='/chat'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiOLhOECxIiYUJd2F-IcCOW4Ak6RV1gJXJUaVwHm-4AChQo8vSfwIzORsE6HPl3KTWvdI&usqp=CAU" alt="" /></Link>
                    </nav>
                    <div className={style.login}>
                        <img className={style.miniAva} alt={'ava'} src={image as string}/>
                        <div className={style.login__text}>
                            <span>{loginData} - </span>
                            <button className={style.login__btn}  onClick={LogoutCollBack}  color="primary">Log out</button>
                        </div>
                    </div>
                </div>
                }
                {!isAuth &&
                    <div className={style.logoLoginBlock}> 
                        <img className={style.header__logoImage} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCVhOqpRckdF8xt42BWXEejQeuONyY1v191y2Cis_ED9ITOF75F-sRvqwtOUNPh6nHHE8&usqp=CAU" alt="logo" />
                        <span className={style.header__logoText} >Programming Hub</span>
                    </div>
                }
                            
            </div>
        </div>
    </header>
}
export default HeaderJS
//Last logo: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png
//import Ava from "../../assets/images/icon-5359553_1280.png";
//import {useGetProfile} from "../comon/Hooks/useGetProfile";