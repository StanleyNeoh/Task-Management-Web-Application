import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const DoesNotExist = props => {
    return (
        <Container className="text-light mt-5">
            <h1>Oh No. This {props.item} does not exist</h1>
        </Container>
    )
}

const Unauthorised = props => {
    return (
        <Container className="text-light mt-5">
            <h1>You are not authorised to {props.action}</h1>
        </Container>
    )
}

const SearchBar = props => {
    return (
        <Form onSubmit={props.handleSearch}>
            <Row className="m-0 p-0">
                <Col className="m-0 p-0">
                    <Form.Control type="text" placeholder="Search..." />
                </Col>
                <Col className="m-0 p-0 text-light">
                    <Button variant="secondary" type="submit">
                        Seach
                    </Button>
                </Col>
            </Row>
        </Form>
    )       
}

export { DoesNotExist, Unauthorised, SearchBar}