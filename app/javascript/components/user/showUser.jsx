import axios from "axios";
import React, {useState, useEffect} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {useNavigate, useParams } from "react-router-dom";
import { DoesNotExist, SearchBar } from "../partials/misc";
import { TasksTable } from "../tasks/taskPartials/taskTables";

const Settings = props => {
    const navigate = useNavigate();
    const params = useParams();

    async function logout(){
        await axios.delete("/api/sessions/1")
        .then(resp => {
            navigate("/")
            location.reload();
        })
        .catch(resp => console.log(resp))
    }

    async function deleteAccount(){
        await axios.delete(`/api/users/${params["id"]}`)
        .then(res => {
            navigate("/")
            location.reload();
        })
        .catch(res => console.log(res))
    }
    
    if(props.display){
        return (
            <Row xs="auto">
                <Col>
                    <Button variant="light" onClick={logout}>Log Out</Button>
                </Col>
                <Col>
                    <Button variant="light" onClick={()=>navigate("username")}>Change Username</Button>
                </Col>
                <Col>
                    <Button variant="warning" onClick={()=>navigate("password")}>Change Password</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={deleteAccount}>Delete Account</Button>
                </Col>
            </Row>
        )
    } else {
        return null
    }
}

const ShowUser = (props)=>{  
    const [userData, setUserData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [sortState, setSortState] = useState({order: ""});
    const params = useParams();

    useEffect(async ()=>{
        await axios.get(`/api/users/${params.id}?task_order=${sortState.order}&task_search=${search}`)
        .then(res => {
            setUserData(res.data)
            setLoaded(true)
        })
        .catch(res => console.log(res))
    }, [sortState.order, search, params])


    function handleSort(e){
        const key = e.target.attributes.associated.value
        const query = e.target.attributes.query.value
        if(sortState.key == key){
            setSortState({
                key: key, 
                ascending: !sortState.ascending, 
                order: !sortState.ascending ? `${query}` : `${query} DESC`
            });
        } else {
            setSortState({
                key: key, 
                ascending: true, 
                order: `${query}`
            });
        }
    }

    function handleSearch(e){
        e.preventDefault();
        setSearch(e.target[0].value);
    }

    if(!loaded){
        return null
    } else if(!userData.username){
        return (
            <DoesNotExist item="user"/>
        )
    }else {
        return (
            <Container className="text-light mt-5">
                <Row>
                    <Col className="fs-1">{userData.username}</Col>
                    <Col xs="auto"><Settings display={params.id == userData.session_id}/></Col>
                    <Col xs="auto"><SearchBar handleSearch={handleSearch}/></Col>
                </Row>
                <TasksTable
                    tasks={userData.tasks} 
                    handleSort={handleSort} 
                    sortState={sortState}
                />
            </Container>
        )
    }
}

export default ShowUser