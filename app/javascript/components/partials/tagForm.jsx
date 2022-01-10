import React, { Fragment, useState } from "react";
import {Form, Button, Alert, Col, Row} from "react-bootstrap";

function handleChange(e, setValue){
    setValue(e.target.value);
}

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

const NameGroup = props => {       //display
    const [value, setValue] = useState(props.value);
    return (
        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Tag Name" onChange={e=>handleChange(e, setValue)} value={value}/>
        </Form.Group>
    )
}

const DescriptionGroup = props => {        //display
    const [value, setValue] = useState(props.value);
    return (
        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Tag Description" onChange={e=>handleChange(e, setValue)} value={value}/>
        </Form.Group>
    )
}

const ColourGroup = props => {
    const [value, setValue] = useState(props.value)
    return (
        <Form.Group className="mb-3">
            <Form.Label>Colour</Form.Label>
            <Row>
                <Col xs="auto">
                    <input type="color" className="form-control form-control-color" onChange={e=>handleChange(e, setValue)} value={value}/>
                </Col>
                <Col xs="auto" className="fw-bold" style={{color: value}}> {value} </Col>
            </Row>
        </Form.Group>
    )
}

const TagForm = props => {     //handleSubmit, error, displayInvalid, onCloseInvalid, buttonMessage
    return (
        <Fragment>
            <form className="mb-3" onSubmit={props.handleSubmit}>
                <NameGroup value={props.name}/>
                <DescriptionGroup value={props.description}/>
                <ColourGroup value={props.colour}/>
                <Invalid display={props.displayInvalid} onClose={props.onCloseInvalid} error={props.error}/>
                <Button variant="light" type="submit">
                    { props.buttonMessage }
                </Button>
            </form>
        </Fragment>
    )
}

export default TagForm