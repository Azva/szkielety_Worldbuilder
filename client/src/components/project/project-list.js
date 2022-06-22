import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ProjectTableRow from "./ProjectTableRow";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";import '../../App.css';
import { Button } from "react-bootstrap";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/projects")
            .then(({data}) => {
                setProjects(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="60%">Nazwa</th>
                        <th width="40%"></th>
                    </tr>
                </thead>
                <tbody>{
                    projects.map((res, i) => {
                        return <ProjectTableRow obj={res} key={i} />;
                    })}</tbody>
            </Table>
            <Link to="/create-project">
                <Button type="button" variant="danger" size="lg">
                    Dodaj nowy projekt
                </Button>
            </Link>
        </div>
    );
};

export default ProjectList;
