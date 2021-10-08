import Post from "./Post/Post"
import React, {FC} from "react"
import style from "./Mypost.module.css"
import PostReduxForm from "./PostForm"
import { useDispatch, useSelector} from "react-redux"
import {actions} from "../../../../Redux/ProfileReducer"
import {postType} from "../../../../assets/types/typesTs"
import {AppStateType} from "../../../../Redux/ReduxStore"
export  const MyPost: FC = React.memo(() => {
    const posts = useSelector((state: AppStateType):Array<postType> =>state.ProfilePage.posts)
    const dispatch = useDispatch()

    let postsElements = posts.map(p => <Post name={p.message} likes={p.likes} key={p.id}/>)
    //todo: Написать тип для валидации формы
     const newMessage = (values: any) => {dispatch(actions.CreatorAddPost(values.NewPost))}

    return <div className={style.MyPost}>
        <h2 className={style.header}>My posts</h2>
        <PostReduxForm onSubmit={newMessage}/>
        <div>
            {postsElements}
        </div>
    </div>
})
