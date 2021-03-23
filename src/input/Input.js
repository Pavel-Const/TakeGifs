import React from 'react';
import classes from './Input.Module.css'

const Input = (props) => {
    const cls = [classes.Input]
    return (
        <div className={cls.join(' ')}>

            <input
                ref={props.reference}
                onChange={props.onChange}
                placeholder={'Введите тег'}
            />
            {
                !props.isFormValid
                    ? <span>{props.errorMessageTeg}</span>
                    : null

            }
            {
                !props.state.data
                    ? <span>{props.errorMessageData}</span>
                    : null

            }
            {
                props.state.httpError
                    ? <span>{props.errorMessageHttp}</span>
                    : null
            }
        </div>
    );
};


export default Input;
