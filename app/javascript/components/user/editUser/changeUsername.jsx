import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DoesNotExist, Unauthorised } from "../../partials/misc";
import UserForm from "../../partials/userForm";

const ChangeUsername = ()=>{
    const params = useParams();
    const [loaded, setLoaded] = useState(false);
    const [userData, setUserData] = useState({});
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    
    useEffect(async ()=>{
        await axios.get("/api/sessions.json")
        .then(res => {
            setUserData(res.data);
            setLoaded(true);
        })
        .catch(res => console.log(res))
    }, [params])

    async function handleSubmit(e){
        e.preventDefault()
        const userData = {username: e.target[0].value}
        await axios.put(`/api/users/${params.id}`, userData)
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

    if(!loaded){
        return null
    } else if (!userData.user){
        return (
            <DoesNotExist item="user"/>
        )
    } else if(userData.user.id == params.id){
        return (
            <Container className="text-light mt-5">
                <h1 className="mb-3">Update {userData.user.username}'s Username</h1>
                <UserForm 
                    username={true}
                    password={false}
                    confirmation={false}
                    displayInvalid={invalid} 
                    onCloseInvalid={()=>setInvalid(false)}
                    handleSubmit={handleSubmit}
                    buttonMessage="Update Username"
                    error={error}
                />
            </Container>
        )
    } else {
        return (
            <Unauthorised action="change username"/>
        )
    }
}

export default ChangeUsername