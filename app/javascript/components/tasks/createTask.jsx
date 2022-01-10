import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskForm from "../partials/taskForm";

const CreateTask = props => {
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const newTask = {
            name: e.target[0].value,
            description: e.target[1].value,
            deadline: e.target[2].value,
            importance: e.target[3].value,
            public: e.target[4].value,
            completed: e.target[5].value
        }
        axios.post("/api/tasks", newTask)
        .then(res => {
            if(res.data.name){
                navigate("/tasks");
                location.reload();
            } else {
                if(typeof res.data.error === 'string'){
                    setError([res.data.error]);
                } else {
                    const errArr = Object.keys(res.data.error).map(key=>`${key} ${res.data.error[key]}`);
                    setError(errArr);
                }
                setInvalid(true);
            }
        })
        .catch(res => console.log(res));
    }

    return (
        <Container className="text-light mt-5">
            <h1>Create New Task</h1>
            <TaskForm 
                handleSubmit={handleSubmit}
                buttonMessage="Create New Task"
                displayInvalid={invalid}
                onCloseInvalid={()=>setInvalid(false)}
                error={error}
            />
        </Container>
    )
}

export default CreateTask