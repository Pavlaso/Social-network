import React, {FC} from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

const renderField: FC<any> = ({ input, label, type, meta: { touched, error } ,variant }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label}
                   variant={variant}
                   margin="normal"
                   required

                   id="email"
                   label="Email Address"
                   name="email"
                   autoComplete="email"
                   autoFocus/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

const renderMembers: FC<any> = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>
                Add Member
            </button>
            {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((member: any, index: any) => (
            <li key={index}>
                <button type="button" onClick={() => fields.remove(index)}>
                    Remove Member
                </button>
                <h4>Member #{index + 1}</h4>
                <Field
                    name={`${member}.firstName`}
                    type="text"
                    fullWidth
                    component={renderField}
                    label="First Name"
                    variant="outlined"
                />
                <Field
                    name={`${member}.lastName`}
                    type="text"
                    component={renderField}
                    label="Last Name"
                />
            </li>
        ))}
    </ul>
);

const MyForm: FC<any> = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <FieldArray name="members" component={renderMembers} />
            <div>
                <button type="submit" disabled={submitting}>
                    Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    );
};

export default reduxForm({form: "MyForm"})(MyForm);