import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";import '../../App.css';
import { Button } from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom"
import {FaAngleDoubleLeft} from "react-icons/fa"

const LocationDetails = (props) => {
    const { projectid, id } = useParams();
    const [location, setLocation] = useState({
        name: "",
        type: "",
        closeTo: "",
        notes: "",
        createdAt:"",
        updatedAt:"",
    });
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(
            "http://localhost:5000/api/"+projectid+"/location/" + id
        )
        .then((res) => {
            const { name, type, closeTo, notes, createdAt, updatedAt } = res.data;
            setLocation({ name, type, closeTo, notes, createdAt, updatedAt });
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
                <span>Utworzone: {location.createdAt}</span>
                <br />
                <span>Ostatnio edytowane: {location.updatedAt}</span></td>
            </tr>
            </tbody>
        </table>
        <div align="center">
            <h1 className="highlighted">{location.name}</h1>
            <h3>{location.type}</h3>
            <span className="highlighted">Pobliskie tereny:</span><div>
                {location.closeTo}
            </div>
            <span className="highlighted">Notatki:</span><div>
                {location.notes}
            </div>
        </div>
        <div align="center">
            <br />
            <Link to={ "../../"+ projectid + "/edit-location/" + id} key={id}>
                <Button type="button" variant="danger" size="lg">
                Edytuj
                </Button>
            </Link>
        </div>
        </>
    );
};

export default LocationDetails;
