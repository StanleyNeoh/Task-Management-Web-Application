import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TagForm from "../partials/tagForm";
import {DoesNotExist, Unauthorised} from "../partials/misc";

const EditTag = props => {
    const [tag, setTag] = useState({});
    const [loaded, setLoaded] = useState(false);

    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    async function handleSubmit(e){
        e.preventDefault();
        const newTag = {
            name: e.target[0].value,
            description: e.target[1].value,
            colour: e.target[2].value
        }
        axios.put(`/api/tags/${params.id}`, newTag)
        .then(res => {
            if(res.data.name){
                navigate("/tags");
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
        await axios.get(`/api/tags/${params.id}`)        
        .then(res => {
            setTag(res.data);
            setLoaded(true);
        })
        .catch(res => console.log(res));
    }, [params])

    if(!loaded){
        return null;
    } else if(tag.status == 404){
        return <DoesNotExist item="tag"/>
    } else if(tag.session_id != tag.user_id){
        return <Unauthorised action="edit this tag"/>
    } else {
        return (
            <Container className="text-light mt-5">
                <h1>Edit Tag</h1>
                <TagForm 
                    handleSubmit={handleSubmit}
                    buttonMessage="Edit Tag"
                    displayInvalid={invalid}
                    onCloseInvalid={()=>setInvalid(false)}
                    error={error}
                    name={tag.name}
                    description={tag.description}
                    colour={tag.colour}
                />
            </Container>
        )   
    }
}

export default EditTag