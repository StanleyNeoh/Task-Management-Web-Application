import React, { Fragment } from "react";
import { Table, Row, Col, Container } from "react-bootstrap";

const Labels = props => {
    const sortState = props.sortState;
    return (
        <tr className="">
            {
                props.labels.map((label, index) => {
                    if(label._sort){
                        const arrow = sortState.key != label._key
                                        ? <span className="fs-6 text-warning m-0 p-0">&#8597;</span>
                                        : sortState.ascending
                                        ? <span className="fs-4 text-success m-0 p-0">&uarr;</span>
                                        : <span className="fs-4 text-danger m-0 p-0">&darr;</span>
                        return (
                            <th key={index} onClick={props.handleSort} associated={label._key} query={label._sort}>
                                {label._name} {arrow}
                            </th>
                        )
                    } else {
                        return (
                            <th key={index}>
                                {label._name}
                            </th>
                        )
                    }
                })
            }
        </tr>
    )
}

const DataRow = props => {
    return (
        <tr>
                {
                    props.labels.map((label, index) => {
                        const render = label._render;
                        const dataPt = render ? render(props.data) : props.data[label._key];
                        return <td key={index}>{ dataPt }</td>
                    })
                }
        </tr>
    )
}

const DataTable = props => {
    return (
        <Table className="text-light mt-5">
            <thead>
                <Labels labels={props.labels} handleSort={props.handleSort} sortState={props.sortState}/>
            </thead>
            <tbody>
                {
                    props.data.map((dataRow, index) => {
                        return <DataRow key={index} data={dataRow} labels={props.labels} />
                    })
                }
            </tbody>
            
        </Table>
    )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AttributeRow = props => {
    const label = props.label._name;
    const show = props.label._show;
    const display = show 
                    ? show(props.data[props.label._key])
                    : props.data[props.label._key];
    return (
        <Fragment>
             <Row>
                <Col className="fw-bold">
                    {label}
                </Col>
                <Col>
                    {display}
                </Col>
            </Row>
            <hr/>
        </Fragment>
    )
}

const ShowTable = props => {
    return (
        <Container className="text-light">
            <hr/>
            {
                props.labels.map((label, index) => {
                    return <AttributeRow key={index} data={props.data} label={label} />
                })
            }
        </Container>
    )
}

export {DataTable, ShowTable}