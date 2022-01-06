import React, { Fragment } from "react";
import {Form, Button, Alert} from "react-bootstrap";

const ErrorMessage = props => {     //error
    if(props.error){
        return props.error.map(str => <p>{str}</p>)
    } else {
        return <p>Invalid Credentials</p>
    }
}

const Invalid = props => {  //error, display, onClose
    if (props.display) {
        return (
            <Alert variant="danger" onClose={props.onClose} dismissible>
                <ErrorMessage error={props.error} />
            </Alert>
        );
    }
    return null
}

const ConfirmationGroup = props => {    //display
    if(props.display){
        return (
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
        )
    }
    return null
}

const PasswordGroup = props => {        //display
    if(props.display ){
        return (
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
        )
    }
    return null
}

const UsernameGroup = props => {       //display 
    if(props.display){
        return (
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
        )
    }
    return null
}

const UserForm = props => {     //handleSubmit, username, password, confirmation, error, display, onClose, buttonMessage
    return (
        <Fragment>
            <form className="mb-3" onSubmit={props.handleSubmit}>
                <UsernameGroup display={props.username} />
                <PasswordGroup display={props.password}/>
                <ConfirmationGroup display={props.confirmation} />
                <Invalid display={props.displayInvalid} onClose={props.onCloseInvalid} error={props.error}/>
                <Button variant="light" type="submit">
                    { props.buttonMessage }
                </Button>
            </form>
        </Fragment>
    )
}

export default UserForm