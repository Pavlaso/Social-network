import s from './Post.module.css'
import {FC} from "react";
type PropsType = {
    name: string
    likes: number
}
const Post: FC<PropsType> = (props) => {
    return <div className={s.post}>
                <div >
                    <img alt={'Not images'} src='https://sun2-11.userapi.com/s/v1/ig1/xxxWGdjtBrmGAUXGvQ5xPCFR18BJA6pVn6G7xTdk2CA0_-ui6XU3ERdeLodm0XzATLEjvlB0.jpg?size=200x0&quality=96&crop=10,550,1600,1600&ava=1' />
                    <span>{props.name}</span>
                </div>
        Like <span>{props.likes}</span>
    </div>
}
export default Post;