import style from './Name.module.css'
import { useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import React, { FC } from "react";
import {AppStateType} from "../../../../Redux/ReduxStore";

const Name: FC = () => {
    const dialogsData = useSelector((state: AppStateType) => state.MessagesPage.dialogsData)

    return <div className={style.dialogsItems}>
            {dialogsData.map(m => <div key={m.id}>
                <div className={style.dialog + ' ' + style.active}>
                    <NavLink to={"/Messages/" + m.id } activeClassName={style.active}>
                        <img alt={'Not images'} className={style.src} src={m.url}/>
                        <span>{m.name}</span>
                    </NavLink>
                </div>
                </div>)
            }

        </div>
}
export default Name