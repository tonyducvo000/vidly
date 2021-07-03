import React, { Component } from 'react';
import Input from './common/input'

class LoginForm extends Component {

    state = {
        account: { username: '', password: '' },
        errors: {}
    };

    //  creates reference object, this is because 
    //  document.getElementById('username').value should not be used 
    //  document/DOM should be not be manipulated
    //username = React.createRef();


    validate = () => {
        const errors = {};

        const { account } = this.state;
        if (account.username.trim() === '')
            errors.username = 'Username is required.';

        if (account.password.trim() === '')
            errors.password = 'Password is required.';

        return Object.keys(errors).length === 0 ? null : errors;
    };


    //  e.preventDefault(); this is needed to prevent a full page reload.
    //  bundle.js is not needed to be downloaded
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        console.log(errors)
        this.setState({ errors })
        if (errors) return;
        //const username = this.username.current.value;

    };



    handleChange = ({ currentTarget: input }) => {
        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account });

    }

    render() {

        const { account } = this.state;
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
                    />

                    <Input
                        name="password"
                        value={account.password}
                        label="Password"
                        onChange={this.handleChange}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>

        );
    }
}

export default LoginForm;