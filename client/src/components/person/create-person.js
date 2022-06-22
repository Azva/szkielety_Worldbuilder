import React, { useState } from "react";
import axios from 'axios';
import PersonForm from "./PersonForm";
import {useParams, useNavigate} from "react-router-dom"
import {FaAngleDoubleLeft} from "react-icons/fa"

const CreatePerson = () => {
    const { projectid } = useParams();
    const navigate = useNavigate()
    const [formValues] =
        useState({ 
            project: projectid,
            name: "" ,
            race: "",
            classs: "",
            age: 0,
            personality: "",
            special: "",
        })
    // onSubmit handler
    const onSubmit = personObject => {
        console.log(personObject)
        axios.post(
            'http://localhost:5000/api/'+projectid+'/person/post',
            personObject)
            .then(res => {
                if (res.status === 200){
                    alert('Stworzono nowa postac')
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
        <PersonForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Stworz nowa postac
        </PersonForm>
        </>
    )
}

export default CreatePerson
