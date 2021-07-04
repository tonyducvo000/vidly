import React, { Component } from 'react';
import Input from './common/input'
import Joi from 'joi-browser';

class LoginForm extends Component {

    state = {
        account: { username: '', password: '' },
        errors: {}
    };

    //  creates reference object, this is because 
    //  document.getElementById('username').value should not be used 
    //  document/DOM should be not be manipulated
    //username = React.createRef();


    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    validate = () => {

        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.account, this.schema, options);
        if (!error) return null; //if no errors return null


        //in the results of Joi.validate(...), error.details.path[0] contains "username" or "password", 
        //the errors for either errors["username"] or errors["password"] can be set with error.details.item.message
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;

        //Old Code
        //const result = Joi.validate(this.state.account, this.schema, { abortEarly: false });
        // console.log(result)

        // const errors = {};

        // const { account } = this.state;
        // if (account.username.trim() === '')
        //     errors.username = 'Username is required.';

        // if (account.password.trim() === '')
        //     errors.password = 'Password is required.';

        // return Object.keys(errors).length === 0 ? null : errors;
    };


    //  e.preventDefault(); this is needed to prevent a full page reload.
    //  bundle.js is not needed to be downloaded

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        //console.log(errors)
        this.setState({ errors: errors || {} })
        if (errors) return;
        //const username = this.username.current.value;

    };


    validateProperty = ({ name, value }) => {

        //sets the name dynamically
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

        // Old Code
        // if (name === 'username') {
        //     if (value.trim() === '') return 'Username is required.';

        // }

        // if (name === 'password') {
        //     if (value.trim() === '') return 'Password is required.';

        // }

    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];



        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });

    }

    render() {

        const { account, errors } = this.state;
        return (

            <div >
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            autoFocus
                            value={account.username}
                            onChange={this.handleChange}
                            ref={this.username}
                            id="username"
                            name="username"
                            type="text"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={account.password}
                            onChange={this.handleChange}
                            name="password"
                            id="password"
                            type="text"
                            className="form-control" />
                    </div> */}


                    <Input

                        name="username"
                        value={account.username}
                        label="Username"
                        onChange={this.handleChange}
                        error={errors.username}
                    />

                    <Input
                        name="password"
                        value={account.password}
                        label="Password"
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>

        );
    }
}

export default LoginForm;