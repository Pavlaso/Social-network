import s from './Navbar.module.css'
import {NavLink} from "react-router-dom"
import Ava from "../../assets/images/icon-5359553_1280.png";
import { FC } from 'react';

const Navbar: FC = () => {
    return (
        <nav className={s.nav}>
            {<img className={s.ava} alt={'ava'}  src={Ava}/>}
            <div><NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink></div>
            <div><NavLink to='/Messages' activeClassName={s.activeLink}>Messages</NavLink></div>
            <div><NavLink to='/Users' activeClassName={s.activeLink}>Users</NavLink></div>
        </nav>
)
}
export default Navbar
