import axios from "axios";
import React, {useState, useEffect} from "react";
import { handleSort, handleSearch } from "../../functions/handlers";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../partials/misc";
import { TagsTable } from "./tagPartials/tagTables";

const Tags = (props)=>{
    const [Loaded, setLoaded] = useState(false);
    const [Tags, setTags] = useState([]);
    const [search, setSearch] = useState("");
    const [sortState, setSortState] = useState({order: ""});
    const navigate = useNavigate();

    useEffect(async ()=>{
        await axios.get(`/api/tags?order=${sortState.order}&search=${search}`)
        .then(res => {
            setTags(res.data);
            setLoaded(true);
        })
        .catch(res => console.log(res))
    }, [sortState.order, search])

    if(!Loaded){
        return null;
    } else {
        return (
            <Container className="text-white mt-5">
                <Row className="align-items-center justify-content-between">
                    <Col className="fs-1">All Tags</Col>
                    <Col xs="auto">
                        <SearchBar handleSearch={e => handleSearch(e, setSearch)}/>
                    </Col>
                    <Col xs="auto" className="text-light">
                        <Button variant="secondary" onClick={()=>{navigate("create")}}>Create New Tag</Button>
                    </Col>
                </Row>
                <TagsTable tags={Tags} handleSort={e => handleSort(e, setSortState)} sortState={sortState}/>
            </Container>
        )
    }    
}

export default Tags;