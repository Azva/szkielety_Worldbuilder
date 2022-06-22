import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationForm from "./LocationForm";
import {useParams, useNavigate} from "react-router-dom"
import {FaAngleDoubleLeft} from "react-icons/fa"

// EditLocation Component
const EditLocation = (props) => {
    const { projectid, id } = useParams();
	const navigate = useNavigate()
const [formValues, setFormValues] = useState({
	name: "",
    type: "",
    closeTo: "",
    notes: "",
});
	
//onSubmit handler
const onSubmit = (locationObject) => {
	axios.post(
		"http://localhost:5000/api/"+projectid+"/location/update/" + id,
		locationObject
	)
	.then((res) => {
		if (res.status === 201) {
            alert("Zaktualizowano miejsce")
            window.location = "/"+projectid+"/project-details";
		} else Promise.reject();
	})
	.catch((err) => alert("error: "+err));
};

// Load data from server and reinitialize form
useEffect(() => {
	axios.get(
		"http://localhost:5000/api/"+projectid+"/location/update/" + id
	)
	.then((res) => {
		const { name, type, closeTo, notes } = res.data;
		setFormValues({ name, type, closeTo, notes });
	})
	.catch((err) => console.log(err));
}, [projectid, id]);

// Return form
return (
	<>
	<button className="edit-link" onClick={() => navigate(-1)}>
		<FaAngleDoubleLeft color="#fff" size={24} /></button>
	<LocationForm
	initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize
	>
	Update
	</LocationForm>
	</>
);
};

export default EditLocation;
