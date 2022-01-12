import React, { Fragment } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home= () => {
    const navigate = useNavigate();
    return (
        <Container className="bg-dark">
            <Row className="m-3">
                <h1 className="m-auto text-center text-light">TASKonquer by Stanley</h1>
                <h2 className="fw-light text-center text-light mb-0">A better way to manage your tasks</h2>
            </Row>
            <Row className="m-5">
                <Col>
                    <Card className="bg-dark text-white" onClick={()=>navigate("/tasks")}>
                        <Card.Img src="https://res.cloudinary.com/deb0xrj56/image/upload/c_crop,h_450,w_640/v1641999824/CVWO%20assets/aaron-burden-xG8IQMqMITM-unsplash_xgxmfj.jpg" alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title>Manage your Tasks</Card.Title>
                            <Card.Text>
                                TASKonquer allows you sort and search for tasks the way you want.
                            </Card.Text>
                            <Card.Text>
                                Incoming deadlines are highlighted and importance of each task is ranked.
                            </Card.Text>
                            <Card.Text>
                                Click on the card to look at all tasks
                            </Card.Text>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-dark text-white" onClick={()=>navigate("/tags")}>
                        <Card.Img src="https://res.cloudinary.com/deb0xrj56/image/upload/c_crop,h_450,w_640/v1642000569/CVWO%20assets/alireza-zarafshani-Kn9_CWO8Gx8-unsplash_xhvf9j.jpg" alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title>Manage your Tags</Card.Title>
                            <Card.Text>
                                TASKonquer allows you to tag your tasks and group them at your convinience.
                            </Card.Text>
                            <Card.Text>
                                Customise your tags with colours to stay one step ahead of the deadlines.
                            </Card.Text>
                            <Card.Text>
                                Click on the card to look at all tags
                            </Card.Text>
                        </Card.ImgOverlay>
                    </Card>
                </Col>        
            </Row>
        </Container>
    )
}

export default Home