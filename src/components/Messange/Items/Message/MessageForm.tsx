import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../comon/FormsControls/FormsControls";
import {maxLengthCreator, required, } from "../../../../assets/utils/Validators";
import {LoginFormValuesType} from "../../../login/LoginForm";

const MaxLength100 = maxLengthCreator(100);

const MessageForm: FC<InjectedFormProps<LoginFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'Enter your message'} name={'NewMessageBody'} component={Textarea}
                   validate={[required, MaxLength100]}/>
            <button>Done</button>
        </form>
    )
}
export default reduxForm<LoginFormValuesType>({form: 'NewMessage'})(MessageForm)
