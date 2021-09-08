import React, {FC} from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {maxLengthCreator, required} from "../../../../utils/Validators"
import {Textarea} from "../../../comon/FormsControls/FormsControls"
const MaxLength10 = maxLengthCreator(10)


const PostForm: FC<InjectedFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'Enter new post'} name={'NewPost'} component={Textarea}
                   validate={[required, MaxLength10]}/>
            <div>
                <button>
                    Add post
                </button>
            </div>
        </form>
    )
}
export default reduxForm({form: 'NewPost'})(PostForm);