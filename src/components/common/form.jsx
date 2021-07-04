import React, { Component } from 'react';
import Joi from 'joi-browser';


class Form extends Component {
    state = {
        data: {},
        errors: {}

    }

    validate = () => {

        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null; //if no errors return null


        //in the results of Joi.validate(...), error.details.path[0] contains "username" or "password", 
        //the errors for either errors["username"] or errors["password"] can be set with error.details.item.message
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;

        //Old Code
        //const result = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        // console.log(result)

        // const errors = {};

        // const { data } = this.state;
        // if (data.username.trim() === '')
        //     errors.username = 'Username is required.';

        // if (data.password.trim() === '')
        //     errors.password = 'Password is required.';

        // return Object.keys(errors).length === 0 ? null : errors;
    };


    //  e.preventDefault(); this is needed to prevent a full page reload.
    //  bundle.js is not needed to be downloaded




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


    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        //console.log(errors)
        this.setState({ errors: errors || {} })
        if (errors) return;
        //const username = this.username.current.value;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];



        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });

    }

}

export default Form;