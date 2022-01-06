import axios from "axios";
import React, {useState, useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import  { TasksTable } from "./taskPartials/taskTables";
import {SearchBar} from "../partials/misc";

const Tasks = (props)=>{
    const [loaded, setLoaded] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [sortState, setSortState] = useState({order: ""});
    const navigate = useNavigate();

    useEffect(async ()=>{
        await axios.get(`/api/tasks?order=${sortState.order}&search=${search}`)
        .then(res => {
            setTasks(res.data);
            setLoaded(true);
        })
        .catch(res => console.log(res))
    }, [sortState.order, search])

    function handleSort(e){
        const key = e.target.attributes.associated.value
        const query = e.target.attributes.query.value
        if(sortState.key == key){
            setSortState({
                key: key, 
                ascending: !sortState.ascending, 
                order: !sortState.ascending ? `LOWER(${query})` : `LOWER(${query}) DESC`
            });
        } else {
            setSortState({
                key: key, 
                ascending: true, 
                order: `LOWER(${query})`
            });
        }
    }

    function handleSearch(e){
        e.preventDefault();
        setSearch(e.target[0].value);
    }

    if(!loaded){
        return null;
    } else {
        return (
            <Container className="text-white mt-5">
                <Row className="align-items-center justify-content-between">
                    <Col className="fs-1">All Tasks</Col>
                    <Col xs="auto" className="text-light">
                        <Button variant="secondary" onClick={()=>{navigate("create")}}>Add New Task</Button>
                    </Col>
                    <Col xs="auto">
                        <SearchBar handleSearch={handleSearch}/>
                    </Col>
                </Row>
                <TasksTable tasks={tasks} handleSort={handleSort} sortState={sortState} />
            </Container>
        )
    }    
}

export default Tasks;