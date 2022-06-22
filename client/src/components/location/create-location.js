import React, { useState } from "react";
import axios from 'axios';
import LocationForm from "./LocationForm";
import {useParams, useNavigate} from "react-router-dom"
import {FaAngleDoubleLeft} from "react-icons/fa"

const CreateLocation = () => {
    const { projectid } = useParams();
    const navigate = useNavigate()
    const [formValues] =
        useState({ 
            project: projectid,
            name: "" ,
            type: "",
            closeTo: "",
            notes: "",
        })
    // onSubmit handler
    const onSubmit = locationObject => {
        console.log(locationObject)
        axios.post(
            'http://localhost:5000/api/'+projectid+'/location/post',
            locationObject)
            .then(res => {
                if (res.status === 200){
                    alert('Stworzono nowe miejsce')
                    window.location = "/"+projectid+"/project-details";
                }
                else{
                    Promise.reject()
                }
            })
            .catch(err => alert('error: '+err))
    }

    // Return form
    return (
        <>
	    <button className="edit-link" onClick={() => navigate(-1)}>
		    <FaAngleDoubleLeft color="#fff" size={24} /></button>
        <LocationForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Stworz nowe miejsce
        </LocationForm>
        </>
    )
}

export default CreateLocation
