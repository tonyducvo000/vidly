import React from 'react';
import Input from './common/input'
import Joi from 'joi-browser';
import Form from './common/form'

class LoginForm extends Form {

    state = {
        data: { username: '', password: '' },
        errors: {}
    };

    //  creates reference object, this is because 
    //  document.getElementById('username').value should not be used 
    //  document/DOM should be not be manipulated
    //username = React.createRef();

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    doSubmit = () => {
        console.log("Submitted");

    };

    render() {

        const { data, errors } = this.state;
        return (

            <div >
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            autoFocus
                            value={data.username}
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
                            value={data.password}
                            onChange={this.handleChange}
                            name="password"
                            id="password"
                            type="text"
                            className="form-control" />
                    </div> */}


                    <Input

                        name="username"
                        value={data.username}
                        label="Username"
                        onChange={this.handleChange}
                        error={errors.username}
                    />

                    <Input
                        name="password"
                        value={data.password}
                        label="Password"
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    <button
                        // if this.validate() returns true, enable the button, else disable the button
                        disabled={this.validate()}
                        className="btn btn-primary">Login</button>
                </form>
            </div>

        );
    }
}

export default LoginForm;