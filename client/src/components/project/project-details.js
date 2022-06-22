import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import PersonTableRow from "../person/PersonTableRow";
import LocationTableRow from "../location/LocationTableRow";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";import '../../App.css';
import { Button } from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom"
import {FaAngleDoubleLeft} from "react-icons/fa"

const ProjectDetails = (props) => {
    const { projectid } = useParams();
    const navigate = useNavigate()
    const [persons, setPersons] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/"+ projectid+"/person")
            .then(({data}) => {
                setPersons(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [projectid]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/"+ projectid+"/location")
            .then(({data}) => {
                setLocations(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [projectid]);

    return (
        <>
        <button className="edit-link" onClick={() => navigate(-1)}>
                <FaAngleDoubleLeft color="#fff" size={24} /></button>
        <div className="table-wrapper">
            <Table striped bordered hover>
            <caption>Postacie</caption>
                <thead>
                    <tr>
                        <th width="27%">Imie</th>
                        <th width="27%">Rasa</th>
                        <th width="27%">Klasa</th>
                        <th width="19%"></th>
                    </tr>
                </thead>
                <tbody>{
                    persons.map((res, i) => {
                        return <PersonTableRow obj={res} key={i} />;
                    })}
                </tbody>
            </Table>
            <Link to={ "/"+projectid+"/create-person" }>
                <Button type="button" variant="danger" size="lg">
                    Dodaj nowa postac
                </Button>
            </Link>
        </div>
        <div className="table-wrapper">
            <Table striped bordered hover>
            <caption>Miejsca</caption>
            <thead>
                    <tr>
                        <th width="40%">Nazwa</th>
                        <th width="40%">Typ</th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody>{
                    locations.map((res, i) => {
                        return <LocationTableRow obj={res} key={i} />;
                    })}
                </tbody>
            </Table>
            <Link to={ "/"+projectid+"/create-location" }>
                <Button type="button" variant="danger" size="lg">
                    Dodaj nowe miejsce
                </Button>
            </Link>
        </div>
        </>
        
    );
};

export default ProjectDetails;
