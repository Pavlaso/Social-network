import {Field, Form, Formik} from "formik"
import React, {FC} from "react"
import {FilterType} from "../../Redux/UsersReducer";
import {useSelector} from "react-redux";
import {getFilter} from "../../Redux/UsersSelectors";


const usersSearchFormValidDate = () => { const errors = {}; return errors}
export const UsersSearchForm: FC<PropsType> = React.memo( (props) => {
    const filter = useSelector(getFilter)
    const submit = (values: FormType, {setSubmitting}:{setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType  = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return <div>
    <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend)as 'null' | 'true' | 'false'}}
        validate={usersSearchFormValidDate}
        onSubmit={submit}
    >
        {({ isSubmitting }) => (
            <Form>
                <Field type="text" name="term" />
                <Field  name="friend" as="select">
                    <option value='null'>All</option>
                    <option value='true'>Only followed</option>
                    <option value='false'>Only unfollowed</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
        )}
    </Formik>
</div>
})

export type PropsType = { onFilterChanged: (term: FilterType) => void }
type FormType =  {
    term: string;
    friend: "null" | "true" | "false"}