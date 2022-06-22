import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";import '../../App.css';
import { Button } from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom"
import {FaAngleDoubleLeft} from "react-icons/fa"

const PersonDetails = (props) => {
    const { projectid, id } = useParams();
    const [person, setPerson] = useState({
        name: "",
        race: "",
        classs: "",
        age: 0,
        personality: "",
        special: "",
        createdAt:"",
        updatedAt:"",
    });
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(
            "http://localhost:5000/api/"+projectid+"/person/" + id
        )
        .then((res) => {
            const { name, race, classs, age, personality, special, createdAt, updatedAt } = res.data;
            setPerson({ name, race, classs, age, personality, special, createdAt, updatedAt });
        })
        .catch((err) => console.log(err));
    }, [projectid, id]);

    return (
        <>
        <table width="100%">
        <tbody>
            <tr>
            <td><button className="edit-link" onClick={() => navigate(-1)}>
                <FaAngleDoubleLeft color="#fff" size={24} /></button></td>
            <td align="right">
                <span>Utworzone: {person.createdAt}</span>
                <br />
                <span>Ostatnio edytowane: {person.updatedAt}</span></td>
            </tr>
            </tbody>
        </table>
        <div align="center">
            <h1 className="highlighted">{person.name}</h1>
            <h3>{person.race}, {person.classs}, {person.age}</h3>
            <span className="highlighted">Charakter:</span><div>
                {person.personality}
            </div>
            <span className="highlighted">Cechy szczegolne:</span><div>
                {person.special}
            </div>
        </div>
        <div align="center">
            <br />
            <Link to={ "../../"+ projectid + "/edit-person/" + id} key={id}>
                <Button type="button" variant="danger" size="lg">
                Edytuj
                </Button>
            </Link>
        </div>
        </>
    );
};

export default PersonDetails;
