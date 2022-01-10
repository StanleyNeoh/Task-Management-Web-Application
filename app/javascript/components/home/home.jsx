import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Home= () => {
    return (
        <Container className="bg-dark">
            <Row className="m-3">
                <h1 className="m-auto text-center text-light">TASK Hero</h1>
                <h2 className="fw-light text-center text-light mb-0">A better way to manage your tasks</h2>
            </Row>
        </Container>
    )
}

export default Home