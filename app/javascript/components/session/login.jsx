import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom"
import UserForm from "../partials/userForm"


const Login = ()=>{
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false);

    async function handleSubmit(e){
        e.preventDefault()
        const jsonObj = {username: e.target[0].value, password: e.target[1].value}
        await axios.post("/api/sessions", jsonObj)
        .then(res => {
            if(res.data.logged_in){
                navigate("/");
                location.reload(); //Should find a better way to reload the page
            } else {
                setInvalid(true);
            }
        })
        .catch(res => console.log(res))
    }

    return (
        <Container className="text-light mt-5">
            <h1 className="mb-3">Login</h1>
            <UserForm 
                username={true}
                password={true}
                confirmation={false} 
                displayInvalid={invalid} 
                onCloseInvalid={()=>setInvalid(false)}
                handleSubmit={handleSubmit}
                buttonMessage="Login"
            />
            <Link to="/users" className="text-light">Create new account</Link>
        </Container>
    )
}

export default Login