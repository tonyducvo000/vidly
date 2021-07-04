import React from 'react';

// const Input = ({ name, label, error, value, onChange, type }) => {
const Input = ({ name, label, error, ...rest }) => {
    return (

        <div className="form-group" >
            <label htmlFor={name}>{label}</label>
            <input

                {...rest}
                // value={value}
                // onChange={onChange}
                // type={type}
                name={name}

                // ref={this.username}
                id={name}
                className="form-control" />

            {error && <div className="alert alert-danger">{error}</div>}

        </div >
    );
}

export default Input;