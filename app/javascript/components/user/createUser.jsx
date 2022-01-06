import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom"
import UserForm from "../partials/userForm"

const CreateUser = ()=>{
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState([]);

    async function handleSubmit(e){
        e.preventDefault()
        const userData = {username: e.target[0].value, password: e.target[1].value, password_confirmation: e.target[2].value}
        await axios.post("/api/users", userData)
        .then(res => {
            if(res.data.logged_in){
                navigate("/");
                location.reload(); //Should find a better way to reload the page
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
        .catch(res => console.log(res))
    }

    return (
        <Container className="text-light mt-5">
            <h1 className="mb-3">Create a new account</h1>
            <UserForm 
                username={true}
                password={true}
                confirmation={true}
                displayInvalid={invalid} 
                onCloseInvalid={()=>setInvalid(false)}
                handleSubmit={handleSubmit}
                buttonMessage="Create Account"
                error={error}
            />
            <Link to="/sessions" className="text-light">Already have an account</Link>
        </Container>
    )
}

export default CreateUser