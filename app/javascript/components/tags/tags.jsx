import axios from "axios";
import React, {useState, useEffect} from "react";
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

    if(!Loaded){
        return null;
    } else {
        return (
            <Container className="text-white mt-5">
                <Row className="align-items-center justify-content-between">
                    <Col className="fs-1">All Tags</Col>
                    <Col xs="auto">
                        <SearchBar handleSearch={handleSearch}/>
                    </Col>
                    <Col xs="auto" className="text-light">
                        <Button variant="secondary" onClick={()=>{navigate("create")}}>Create New Tag</Button>
                    </Col>
                </Row>
                <TagsTable tags={Tags} handleSort={handleSort} sortState={sortState}/>
            </Container>
        )
    }    
}

export default Tags;