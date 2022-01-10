import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav} from "react-bootstrap";
import axios from "axios";

const SLink = props => {
    return (
        <Link to={`${props.to}`} style={{textDecoration: "none", color: "inherit"}}>
            {props.children}
        </Link>
    )
}

const LoginNav = () => {
    const [loaded, setLoaded] = useState(false)
    const [userData, setUserData] = useState({})
    
    useEffect(()=>{
        axios.get("/api/sessions.json")
        .then(res => {
            setUserData(res.data)
            setLoaded(true)
        })
        .catch(res => console.log(res))
    }, [])

    if(!loaded){
        return null
    } else if(userData.logged_in){
        return (
            <Navbar.Text>
                Signed in as: <Link to={`/users/${userData.user.id}`}>{userData.user.username}</Link>
            </Navbar.Text>
        )
    } else {
        return (
            <Navbar.Text>
                <SLink to="/sessions">Login</SLink>
            </Navbar.Text>
        )
    }
}

const Navigation = () =>{
    return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand><SLink to="/">TASKHero</SLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link><SLink to="tasks">Tasks</SLink></Nav.Link>
                    <Nav.Link><SLink to="tags">Tags</SLink></Nav.Link>
                </Nav>
                <LoginNav />
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default Navigation