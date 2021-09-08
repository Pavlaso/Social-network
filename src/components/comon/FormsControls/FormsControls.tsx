import styles from './FormsControls.module.css'
import {Field, WrappedFieldProps} from "redux-form";
import {validatorType} from "../../../utils/Validators";
import React, {FC} from "react";

export const Textarea: FC<WrappedFieldProps> = ({input, meta: {error, touched }, ...props}) => {
    const hasError = error && touched
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError && <span>{error} </span>}
        </div>
    )
}
export const Input: FC<WrappedFieldProps> = ({input, meta: {error, touched }, ...props}) => {
    const hasError = error && touched
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{error} </span>}
        </div>
    )
}


export function creatorField<FormKeysType extends string> (placeholder: string, name: FormKeysType, validate: Array<validatorType>,
                             component:  FC<WrappedFieldProps>, type: string, text = '')  {
    return (
        <div>
            <Field placeholder={placeholder} name={name} validate={validate} component={component} type={type}
            />{text}
        </div>
        )
}