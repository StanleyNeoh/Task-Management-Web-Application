import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { TasksSelect } from "../tasks/taskPartials/taskTables";
import { DoesNotExist, SearchBar, Unauthorised } from "../partials/misc"

const AddTasksToTags = props => {
    const params = useParams();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({});
    const [tag, setTag] = useState({});
    const [sortState, setSortState] = useState({order: ""});
    const [search, setSearch] = useState("");

    useEffect(()=>{
        axios.get(`/api/tags/${params.id}`)
        .then(res => {
            setTag(res.data);
            if(res.data.status == 404){
                setLoaded(true);
            } else {
                axios.get(`/api/users/${res.data.user_id}?task_order=${sortState.order}&task_search=${search}`)
                .then(res => {
                    setUser(res.data)
                    setLoaded(true);
                })
                .catch(res => console.log(res));
            }

        })
        .catch(res => console.log(res));
    }, [sortState.order, search, params])

    async function handleTagging(toAdd, toRemove){
        const errorResponses = [];
        await toAdd.forEach(id => {
            axios.post(`/api/tags/${tag.id}/manifest`, {task_id: id})
            .catch(res=>{
                errorResponses[errorResponses.length] = res;
            });
        })
        await toRemove.forEach(id =>{
            axios.delete(`/api/tags/${tag.id}/manifest/${id}`)
            .catch(res=>{
                errorResponses[errorResponses.length] = res;
            })
        })
        if(errorResponses.length > 0){
            console.log(errorResponses);
        } else {
            navigate(`/tags/${tag.id}`);
            location.reload();
        }
    }

    if(!loaded){
        return null
    } else if(tag.status == 404){
        return <DoesNotExist item="tag"/>
    } else if(user.status == 404){
        return <DoesNotExist item="user"/>
    } else if(tag.user_id != tag.session_id){
        return <Unauthorised action="add tasks to this tag"/>
    } else {
        return (
            <Container className="text-light mt-5">
                <TasksSelect
                    tag_id={tag.id} 
                    tasks={user.tasks} 
                    handleSort={e => handleSort(e, sortState, setSortState)} 
                    sortState={sortState}
                    handleTagging={handleTagging}
                >
                    <Col className="fs-1">Add Tasks to <span style={{color: tag.colour}}>{tag.name}</span></Col>
                    <Col xs="auto"><SearchBar handleSearch={e => handleSearch(e, setSearch)}/></Col>
                </TasksSelect>
            </Container>
        )
    }   
}

export default AddTasksToTags;