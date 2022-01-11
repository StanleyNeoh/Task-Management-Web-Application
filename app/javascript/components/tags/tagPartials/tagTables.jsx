import React from "react";
import { DataTable, ShowTable } from "../../partials/tables";
import { Link } from "react-router-dom";

const TagsTable = props => {
    return (
        <DataTable 
            labels={[
                {
                    _key: "name",
                    _name: "Name",
                    _render: data => <Link to={`/tags/${data.id}`} style={{color: data.colour, textDecoration: "none"}} className="fw-bold">{data.name}</Link>,
                    _sort: "LOWER(name)"
                },
                {
                    _key: "user",
                    _name: "Owner",
                    _render: data => data.user ? <Link to={`/users/${data.user.id}`} className="text-white fw-bold">{data.user.username}</Link> : "[Deleted]"
                }
            ]}
            data={props.tags}
            handleSort={props.handleSort}
            sortState={props.sortState}
        />
    )
}

const TagTable = props => {
    return (
        <ShowTable
            labels={[
                {
                    _key: "description",
                    _name: "Description"
                },
                {
                    _key: "user",
                    _name: "Owner",
                    _show: data => data ? <Link to={`/users/${props.tag.user.id}`} className="text-white fw-bold">{data.username}</Link> : "[Deleted]"
                }
            ]}
            data={props.tag}
        />
    )
}



export {TagsTable, TagTable};