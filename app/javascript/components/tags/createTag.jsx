import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TagForm from "../partials/tagForm";

const CreateTag = props =>{
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        const newTag = {
            name: e.target[0].value,
            description: e.target[1].value,
            colour: e.target[2].value
        };
        axios.post("/api/tags", newTag)
        .then(res=>{
            if(res.data.name){
                navigate("/tags")
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

    return (
        <Container className="text-light mt-5">
            <h1>Create New Tag</h1>
            <TagForm
                handleSubmit={handleSubmit}
                buttonMessage="Create New Tag"
                displayInvalid={invalid}
                onCloseInvalid={()=>setInvalid(false)}
                error={error}
            />
        </Container>
    )
}

export default CreateTag