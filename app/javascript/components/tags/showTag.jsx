import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { DoesNotExist, SearchBar } from "../partials/misc";
import { TagTable } from "./tagPartials/tagTables";
import {TasksTable } from "../tasks/taskPartials/taskTables"

const Settings = props => {
    const params = useParams();
    const navigate = useNavigate();

    function deleteTag(){
        axios.delete(`/api/tags/${params.id}`)
        .then(res => {
            navigate("/tags")
            location.reload();
        })
        .catch(res => console.log(res));
    }

    if(props.display){
        return (
            <Row xs="auto">
                <Col>
                    <Button variant="success" onClick={()=>navigate("add")}> Change Taggings</Button>
                </Col>
                <Col>
                    <Button variant="light" onClick={()=>navigate("edit")}>Edit Tag</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={deleteTag}> Delete Tag</Button>
                </Col>
            </Row>
        );
    }
    return null;
}

const ShowTag = props => {
    const [tag, setTag] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [sortState, setSortState] = useState({order: ""});
    const params = useParams();

    useEffect(async ()=>{
        await axios.get(`/api/tags/${params.id}?task_order=${sortState.order}&task_search=${search}`)
        .then(res => {
            setTag(res.data);
            setLoaded(true);
        })
        .catch(res => console.log(res));
    }, [sortState.order, search, params])   
    //As the page is not remounted when the chores link is clicked => state of tag is not refreshed
    //require useEffect to check on the params to fix this

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
        return null;
    } else if (tag.status === 404){
        return <DoesNotExist item="tag"/>
    } else {
        return (
            <Container className="text-light mt-5">
                <h1 className="text-capitalize" style={{color: tag.colour}}>{tag.name}</h1>
                <TagTable tag={tag}/>
                <Row className="align-items-center justify-content-between">
                    <Col className="fs-2">Associated Tasks</Col>
                    <Col xs="auto"><Settings display={tag.user_id == tag.session_id}/></Col>
                    <Col xs="auto"><SearchBar handleSearch={handleSearch}/></Col>
                </Row>
                <TasksTable tasks={tag.tasks} handleSort={handleSort} sortState={sortState} />
            </Container>
        )
    }
}

export default ShowTag