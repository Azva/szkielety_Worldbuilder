// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import {useParams} from "react-router-dom"

// EditProject Component
const EditProject = (props) => {
    const { id } = useParams();
const [formValues, setFormValues] = useState({
	name: "",
});
	
//onSubmit handler
const onSubmit = (projectObject) => {
	axios.post(
		"http://localhost:5000/api/projects/update/" + id,
		projectObject
	)
	.then((res) => {
		if (res.status === 201) {
            alert("Zaktualizowano projekt")
            window.location = "/";
		} else Promise.reject();
	})
	.catch((err) => alert("error: "+err));
};

// Load data from server and reinitialize form
useEffect(() => {
	axios.get(
		"http://localhost:5000/api/projects/update/" + id
	)
	.then((res) => {
		const { name } = res.data;
		setFormValues({ name });
	})
	.catch((err) => console.log(err));
}, [id]);

// Return project form
return (
	<ProjectForm
	initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize
	>
	Update Project
	</ProjectForm>
);
};

export default EditProject;
