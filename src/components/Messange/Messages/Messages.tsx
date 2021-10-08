import s from './Messages.module.css'
import Message from "../Items/Message/Message"
import Name from "../Items/Name/Name"
import {withAuthRedirect} from "../../../assets/HOC/withAuthRedirect";

const Messages = () => {
    return (
        <div className={s.content}>
            <Name/>
            <Message/>
        </div>
    )
}
export default withAuthRedirect(Messages)