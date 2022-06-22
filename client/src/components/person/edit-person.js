import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./PersonForm";
import {useParams, useNavigate} from "react-router-dom"
import {FaAngleDoubleLeft} from "react-icons/fa"

// EditPerson Component
const EditPerson = (props) => {
    const { projectid, id } = useParams();
	const navigate = useNavigate()
const [formValues, setFormValues] = useState({
	name: "",
    race: "",
    classs: "",
    age: 0,
    personality: "",
    special: "",
});
	
//onSubmit handler
const onSubmit = (personObject) => {
	axios.post(
		"http://localhost:5000/api/"+projectid+"/person/update/" + id,
		personObject
	)
	.then((res) => {
		if (res.status === 201) {
            alert("Zaktualizowano postac")
            window.location = "/"+projectid+"/project-details";
		} else Promise.reject();
	})
	.catch((err) => alert("error: "+err));
};

// Load data from server and reinitialize form
useEffect(() => {
	axios.get(
		"http://localhost:5000/api/"+projectid+"/person/update/" + id
	)
	.then((res) => {
		const { name, race, classs, age, personality, special } = res.data;
		setFormValues({ name, race, classs, age, personality, special });
	})
	.catch((err) => console.log(err));
}, [projectid, id]);

// Return form
return (
	<>
	<button className="edit-link" onClick={() => navigate(-1)}>
		<FaAngleDoubleLeft color="#fff" size={24} /></button>
	<PersonForm
	initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize
	>
	Update
	</PersonForm>
	</>
);
};

export default EditPerson;
