import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../partials/taskForm";
import {DoesNotExist, Unauthorised} from "../partials/misc";

const EditTask = props => {
    const [task, setTask] = useState({});
    const [loaded, setLoaded] = useState(false);

    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

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
        axios.put(`/api/tasks/${params.id}`, newTask)
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

    useEffect(async ()=>{
        await axios.get(`/api/tasks/${params.id}`)        
        .then(res => {
            setTask(res.data);
            setLoaded(true);
        })
        .catch(res => console.log(res));
    }, [params])

    if(!loaded){
        return null;
    } else if(task.status == 404){
        return <DoesNotExist item="task"/>
    } else if(task.session_id != task.user_id){
        return <Unauthorised action="edit this task"/>
    } else {
        return (
            <Container className="text-light mt-5">
                <h1>Edit Task</h1>
                <TaskForm 
                    handleSubmit={handleSubmit}
                    buttonMessage="Edit Task"
                    displayInvalid={invalid}
                    onCloseInvalid={()=>setInvalid(false)}
                    error={error}
                    name={task.name}
                    description={task.description}
                    importance={task.importance}
                    deadline={task.deadline ? task.deadline.substr(0,10) : undefined}
                    public={task.public}
                    completed={task.completed}
                />
            </Container>
        )   
    }
}

export default EditTask