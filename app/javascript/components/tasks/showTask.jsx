import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { DoesNotExist, Unauthorised } from "../partials/misc";
import { TaskTable } from "./taskPartials/taskTables";

const Settings = props => {
    const params = useParams();
    const navigate = useNavigate();

    function deleteTask(){
        axios.delete(`/api/tasks/${params.id}`)
        .then(res => {
            navigate("/tasks")
            location.reload();
        })
        .catch(res => console.log(res));
    }

    if(props.display){
        return (
            <Row xs="auto">
                <Col>
                    <Button variant="light" onClick={()=>navigate("edit")}>Edit Task</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={deleteTask}> Delete Task</Button>
                </Col>
            </Row>
        );
    }
    return null;
}

const ShowTask = props => {
    const [task, setTask] = useState({});
    const [loaded, setLoaded] = useState(false);
    const params = useParams();

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
    } else if (task.status === 404){
        return <DoesNotExist item="task"/>
    } else if (task.status === 401){
        return <Unauthorised action="access this task"/>
    } else {
        return (
            <Container className="text-light mt-5">
                <h1 className="text-capitalize">{task.name}</h1>
                <TaskTable task={task} />
                <Settings display={task.user_id == task.session_id}/>
            </Container>
        )
    }
}

export default ShowTask