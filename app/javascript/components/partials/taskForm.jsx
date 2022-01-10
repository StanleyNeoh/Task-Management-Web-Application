import React, { Fragment, useState } from "react";
import {Form, Button, Alert} from "react-bootstrap";

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
            <Form.Control type="text" placeholder="Task Name" onChange={e=>handleChange(e, setValue)} value={value}/>
        </Form.Group>
    )
}

const DescriptionGroup = props => {        //display
    const [value, setValue] = useState(props.value);
    return (
        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Task Description" onChange={e=>handleChange(e, setValue)} value={value}/>
        </Form.Group>
    )
}

const DeadlineGroup = props => {
    const [value, setValue] = useState(props.value);
    return (
        <Form.Group className="mb-3">
            <Form.Label>Deadline</Form.Label>
            <Form.Control type="date" onChange={e=>handleChange(e, setValue)} value={value}/>
        </Form.Group>
    )
}

const ImportanceGroup = props => {    //display
    const [value, setValue] = useState(props.value);
    return (
        <Form.Group className="mb-3">
            <Form.Label>Importance</Form.Label>
            <Form.Select onChange={e=>handleChange(e, setValue)} value={value}>
                <option value={0}>Not important</option>
                <option value={1}>Low importance</option>
                <option value={2}>Important</option>
                <option value={3}>Very Important</option>
                <option value={4}>Immediate</option>
            </Form.Select>
        </Form.Group>
    )
}

const PublicGroup = props => {
    const [value, setValue] = useState(props.value);
    return (
        <Form.Group className="mb-3">
            <Form.Label>Public / Private</Form.Label>
            <Form.Select onChange={e=>handleChange(e, setValue)} value={value}>
                <option value={false}>Private</option>
                <option value={true}>Public</option>
            </Form.Select>
        </Form.Group>
    )
}

const CompletedGroup = props => {
    const [value, setValue] = useState(props.value);
    return (
        <Form.Group className="mb-3">
            <Form.Label>Completed / Not Completed</Form.Label>
            <Form.Select onChange={e=>handleChange(e, setValue)} value={value}>
                <option value={false}>Not Completed</option>
                <option value={true}>Completed</option>
            </Form.Select>
        </Form.Group>
    )
}

const TaskForm = props => {     //handleSubmit, error, displayInvalid, onCloseInvalid, buttonMessage
    return (
        <Fragment>
            <form className="mb-3" onSubmit={props.handleSubmit}>
                <NameGroup value={props.name}/>
                <DescriptionGroup value={props.description}/>
                <DeadlineGroup value={props.deadline}/>
                <ImportanceGroup value={props.importance}/>
                <PublicGroup value={props.public}/>
                <CompletedGroup value={props.completed}/>
                <Invalid display={props.displayInvalid} onClose={props.onCloseInvalid} error={props.error}/>
                <Button variant="light" type="submit">
                    { props.buttonMessage }
                </Button>
            </form>
        </Fragment>
    )
}

export default TaskForm