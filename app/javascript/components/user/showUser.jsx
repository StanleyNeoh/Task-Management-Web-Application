import axios from "axios";
import React, {useState, useEffect} from "react";
import { handleSort, handleSearch } from "../../functions/handlers";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DoesNotExist, SearchBar } from "../partials/misc";
import { TagsTable } from "../tags/tagPartials/tagTables";
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

const DisplayTriangle = (props)=>{
    return props.displayed
            ? <span style={{color: "white"}}>&#9662;</span>
            : <span style={{color: "white"}}>&#9652;</span>;
}

const ShowUser = (props)=>{  
    const [userData, setUserData] = useState({});
    const [loaded, setLoaded] = useState(false);

    const [displayTask, setDisplayTask] = useState(false);
    const [displayTag, setDisplayTag] = useState(false);
    const [taskSearch, setTaskSearch] = useState("");
    const [tagSearch, setTagSearch] = useState("");
    const [taskSortState, setTaskSortState] = useState({order: ""});
    const [tagSortState, setTagSortState] = useState({order: ""});

    const params = useParams();

    useEffect(async ()=>{
        await axios.get(`/api/users/${params.id}?task_order=${taskSortState.order}&task_search=${taskSearch}&tag_order=${tagSortState.order}&tag_search=${tagSearch}`)
        .then(res => {
            setUserData(res.data)
            setLoaded(true)
        })
        .catch(res => console.log(res))
    }, [tagSortState.order, tagSearch, taskSortState.order, taskSearch, params])

    if(!loaded){
        return null;
    } else if(!userData.username){
        return <DoesNotExist item="user"/>;
    }else {
        const isOwner = params.id == userData.session_id;
        const whose = isOwner ? "Your" : `${userData.username}'s`
        return (
            <Container className="text-light mt-5">
                <Row>
                    <Col className="fs-1">{userData.username}</Col>
                    <Col xs="auto">
                        <Settings display={isOwner}/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="fs-2" onClick={()=>setDisplayTask(!displayTask)}>
                        {whose} Tasks <DisplayTriangle displayed={displayTask}/>
                    </Col>
                    <Col xs="auto">
                        <SearchBar handleSearch={(e)=>handleSearch(e, setTaskSearch)} hide={!displayTask}/>
                    </Col>
                </Row>
                <TasksTable
                    tasks={userData.tasks} 
                    handleSort={(e)=>handleSort(e, taskSortState, setTaskSortState)} 
                    sortState={taskSortState}
                    hide={!displayTask}
                />
                <Row className="mt-5">
                    <Col className="fs-2" onClick={()=>setDisplayTag(!displayTag)}>
                        {whose} Tags <DisplayTriangle displayed={displayTag}/>
                    </Col>
                    <Col xs="auto">
                        <SearchBar handleSearch={(e)=>handleSearch(e, setTagSearch)} hide={!displayTag}/>
                    </Col>
                </Row>
                <TagsTable 
                    tags={userData.tags} 
                    handleSort={(e)=>handleSort(e, tagSortState, setTagSortState)} 
                    sortState={tagSortState}
                    hide={!displayTag}
                />
            </Container>
        )
    }
}

export default ShowUser