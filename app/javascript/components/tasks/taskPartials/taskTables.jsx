import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { DataTable, ShowTable } from "../../partials/tables";
import { Link } from "react-router-dom";

const TasksTable = props => {
    return (
        <DataTable 
            labels={[
                {
                    _key: "name",
                    _name: "Name",
                    _render: data => <Link to={`/tasks/${data.id}`} className="text-white fw-bold">{data["name"]}</Link>,
                    _sort: "LOWER(name)"
                },
                {
                    _key: "importance",
                    _name: "Importance",
                    _render: data => ["Not important", "Low Importance", "Important", "Very Important", "Immediate"][data.importance],
                    _sort: "importance"
                }, 
                {
                    _key: "timeLeft",
                    _name: "Time Left", 
                    _render: data => {
                        if(data.timeLeft){
                            const timeleft = `${data.timeLeft[0]}d ${data.timeLeft[1]}h ${data.timeLeft[2]}m ${data.timeLeft[3]}s`;
                            const color = data.timeLeft[0] < 0
                                            ? "gray"
                                            : data.timeLeft[0] < 1
                                            ? "red"
                                            : data.timeLeft[0] < 7
                                            ? "yellow"
                                            : "white";
                            return <span style={{color: color}}>{timeleft}</span>;
                        } else {
                            return "No Deadline";
                        }
                    },
                    _sort: "deadline"
                },
                {
                    _key: "deadline",
                    _name: "Deadline",
                    _render: data => data.timeLeft && data.deadline ? data.deadline.substring(0,10) : "No Deadline",
                    _sort: "deadline",
                }, 
                {
                    _key: "public",
                    _name: "Public/Private",
                    _render: data => data.public ? "Public" : "Private",
                    _sort: "public",
                }, 
                {
                    _key: "completed",
                    _name: "Completed",
                    _render: data => data.completed ? "Completed" : "Not Completed",
                    _sort: "completed"
                }, 
                {
                    _key: "user",
                    _name: "Owner",
                    _render: data => data.user ? <Link to={`/users/${data.user_id}`} className="text-white fw-bold">{data.user.username}</Link> : "[Deleted]"
                }, 
                {
                    _key: "tags",
                    _name: "Tags",
                    _render: data => data.tags.slice(0,3).map((tag, index) => {
                                                            return (
                                                                <Row className="m-0 p-0" key={index}>
                                                                    <Link style={{color:tag.colour, textDecoration:"none"}} to={`/tags/${tag.id}`}>
                                                                        {tag.name}
                                                                    </Link>
                                                                </Row>
                                                            )
                                                        })
                }
            ]}
            data={props.tasks}
            handleSort={props.handleSort}
            sortState={props.sortState}
        />
    )
}

const TaskTable = props => {
    return (
        <ShowTable
            labels={[
                {
                    _key: "description",
                    _name: "Description"
                },
                {
                    _key: "importance",
                    _name: "Importance",
                    _show: data => ["Not important", "Low Importance", "Important", "Very Important", "Immediate"][data]
                }, 
                {
                    _key: "timeLeft",
                    _name: "Time Left",
                    _show: data => {
                        if(data){
                            const timeleft = `${data[0]}d ${data[1]}h ${data[2]}m ${data[3]}s`;
                            const color = data[0] < 0
                                            ? "gray"
                                            : data[0] < 1
                                            ? "red"
                                            : data[0] < 7
                                            ? "yellow"
                                            : "white";
                            return <span style={{color: color}}>{timeleft}</span>;
                        } else {
                            return "No Deadline";
                        }
                    }
                },
                {
                    _key: "deadline",
                    _name: "Deadline",
                    _show: data => props.task.timeLeft && data ? data.substring(0,10) : "No Deadline",
                }, 
                {
                    _key: "public",
                    _name: "Public / Private",
                    _show: data => data ? "Public" : "Private",
                }, 
                {
                    _key: "completed",
                    _name: "Completed",
                    _show: data => data ? "Completed" : "Not Completed",
                }, 
                {
                    _key: "user",
                    _name: "Owner",
                    _show: data => data ? <Link to={`/users/${props.task.user.id}`} className="text-white fw-bold">{data.username}</Link> : "[Deleted]"
                }, 
                {
                    _key: "tags",
                    _name: "Tags",
                    _show: data => data.map((tag, index) => {
                                                return (
                                                    <Row className="m-0 p-0" key={index}>
                                                        <Link style={{color: tag.colour, textDecoration:"none"}} to={`/tags/${tag.id}`}>
                                                            {tag.name}
                                                        </Link>
                                                    </Row>
                                                )
                                            })
                }
            ]}
            data={props.task}
        />
    )
}

const TasksSelect = props => {
    const [loaded, setLoaded] = useState(false);
    const [startState, setStartState] = useState(new Set());
    const [currentState, setCurrentState] = useState(new Set());

    useEffect(()=>{
        const len = props.tasks.length;
        for(let i = 0; i < len; i++){
            const task = props.tasks[i];
            const tag_len = task.tags.length
            for(let j = 0; j < tag_len; j++){
                if(task.tags[j].id == props.tag_id){
                    startState.add(task.id);
                    currentState.add(task.id);
                    setStartState(startState);  //Poor practise but will do
                    setCurrentState(currentState);
                    break;
                }
            }
        }
        setLoaded(true);
    }, [])

    function handleChange(e){
        const checked = e.target.checked;
        const task_id = parseInt(e.target.attributes.task_id.value);
        if(checked){
            currentState.add(task_id);
        } else {
            currentState.delete(task_id);
        }
        setCurrentState(new Set(currentState));         //Require an actual re-assignment => setCurrentState(currentState) does not count
    }

    function calculateChange(){
        const toRemove = new Set([...startState].filter(task=>!currentState.has(task)));
        const toAdd = new Set([...currentState].filter(task=>!startState.has(task)));
        return [toAdd,toRemove];
    }
    
    if(!loaded){
        return null;
    } else {
        return (
            <Fragment>
                <Row className="align-items-center justify-content-between">
                    {props.children}
                    <Col xs="auto"><Button onClick={()=>props.handleTagging(...calculateChange())}>Update Tagging</Button></Col>
                </Row>
                <DataTable 
                    labels={[
                        {
                            _key: "name",
                            _name: "Name",
                            _render: data => <Link to={`/tasks/${data.id}`} className="text-white fw-bold">{data["name"]}</Link>,
                            _sort: "LOWER(name)"
                        },
                        {
                            _key: "importance",
                            _name: "Importance",
                            _render: data => ["Not important", "Low Importance", "Important", "Very Important", "Immediate"][data.importance],
                            _sort: "importance"
                        }, 
                        {
                            _key: "timeLeft",
                            _name: "Time Left",
                            _render: data =>{
                                if(data.timeLeft){
                                    const timeleft = `${data.timeLeft[0]}d ${data.timeLeft[1]}h ${data.timeLeft[2]}m ${data.timeLeft[3]}s`;
                                    const color = data.timeLeft[0] < 0
                                                    ? "gray"
                                                    : data.timeLeft[0] < 1
                                                    ? "red"
                                                    : data.timeLeft[0] < 7
                                                    ? "yellow"
                                                    : "white";
                                    return <span style={{color: color}}>{timeleft}</span>;
                                } else {
                                    return "No Deadline";
                                }
                            },
                            _sort: "deadline"
                        },
                        {
                            _key: "deadline",
                            _name: "Deadline",
                            _render: data => data.timeLeft && data.deadline ? data.deadline.substring(0,10) : "No Deadline",
                            _sort: "deadline",
                        }, 
                        {
                            _key: "public",
                            _name: "Public/Private",
                            _render: data => data.public ? "Public" : "Private",
                            _sort: "public",
                        }, 
                        {
                            _key: "completed",
                            _name: "Completed",
                            _render: data => data.completed ? "Completed" : "Not Completed",
                            _sort: "completed"
                        }, 
                        {
                            _key: "user",
                            _name: "Owner",
                            _render: data => data.user ? <Link to={`/users/${data.user_id}`} className="text-white fw-bold">{data.user.username}</Link> : "[Deleted]"
                        }, 
                        {
                            _name: "Has Tags",
                            _render: data => {
                                const checked = currentState.has(data.id);
                                return <Form.Check checked={checked} onChange={handleChange} task_id={data.id}/>
                            }
                        }
                    ]}
                    data={props.tasks}
                    handleSort={props.handleSort}
                    sortState={props.sortState}
                />

            </Fragment>
            
        )
    }
}



export {TasksTable, TaskTable, TasksSelect};

//Note maybe public can use colour to indicate