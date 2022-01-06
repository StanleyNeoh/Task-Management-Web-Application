import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import  { DoesNotExist, Unauthorised } from "../../partials/misc";
import UserForm from "../../partials/userForm";

const ChangePassword = ()=>{
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
        const userData = {password: e.target[0].value, password_confirmation: e.target[1].value}
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
    } else if(!userData.user){
        return (
            <DoesNotExist item="user" />
        )
    } else if(userData.user.id == params.id){
        return (
            <Container className="text-light mt-5">
                <h1 className="mb-3">Change {userData.user.username}'s Password</h1>
                <UserForm 
                    username={false}
                    password={true}
                    confirmation={true}
                    displayInvalid={invalid} 
                    onCloseInvalid={()=>setInvalid(false)}
                    handleSubmit={handleSubmit}
                    buttonMessage="Change Password"
                    error={error}
                />
            </Container>
        )
    } else {
        return (
            <Unauthorised action="change password" />
        )
    }
}

export default ChangePassword