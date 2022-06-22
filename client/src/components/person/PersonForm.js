import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const PersonForm = (props) => {
const validationSchema = Yup.object().shape({
	name: Yup.string().required("Imie nie moze byc puste"),
    race: Yup.string().required("Rasa nie moze byc pusta"),
    classs: Yup.string().required("Klasa nie moze byc pusta"),
    age: Yup.number().typeError("Wiek musi byc liczba lat").min(0, "Wiek nie moze byc ujemny"),
    personality: Yup.string(),
    special: Yup.string()
});
console.log(props);
return (
	<div className="form-wrapper">
	<Formik {...props} validationSchema={validationSchema}>
		<Form>
        <div className="form-title">Imie<span 
		className="highlighted">*</span></div>
		<FormGroup className="form-group">
			<Field name="name" type="text"
				className="form-control" />
			<ErrorMessage
			name="name"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
		<div className="form-title">Rasa<span 
		className="highlighted">*</span></div>
        <FormGroup className="form-group">
			<Field name="race" as="select"
				className="form-control" >
					<option value="">Wybierz...</option>
					<option value="czlowiek">czlowiek</option>
					<option value="ork">ork</option>
					<option value="elf">elf</option>
					<option value="krasnolud">krasnolud</option>
					<option value="inne">inne</option>
			</Field>
			<ErrorMessage
			name="race"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
		<div className="form-title">Klasa<span 
		className="highlighted">*</span></div>
        <FormGroup className="form-group">
			<Field name="classs" as="select"
				className="form-control" >
					<option value="">Wybierz...</option>
					<option value="wojownik">wojownik</option>
					<option value="mag">mag</option>
					<option value="zlodziej">zlodziej</option>
					<option value="paladyn">paladyn</option>
					<option value="lowca">lowca</option>
					<option value="czarnoksieznik">czarnoksieznik</option>
					<option value="inne">inne</option>
			</Field>
			<ErrorMessage
			name="classs"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
		<div className="form-title">Wiek</div>
        <FormGroup className="form-group">
			<Field name="age" type="number"
				className="form-control" />
			<ErrorMessage
			name="age"
			className="d-block invalid-feedback"
			component="span"
			/>
        </FormGroup>
		<div className="form-title">Charakter</div>
        <FormGroup className="form-group">
			<Field name="personality" type="text"
				className="form-control" />
			<ErrorMessage
			name="personality"
			className="d-block invalid-feedback"
			component="span"
			/>
        </FormGroup>
		<div className="form-title">Cechy specjalne</div>
        <FormGroup className="form-group">
			<Field name="special" type="text"
				className="form-control" />
			<ErrorMessage
			name="special"
			className="d-block invalid-feedback"
			component="span"
			/>
        </FormGroup>
		<Button variant="danger" size="lg"
			block="block" type="submit">
			{props.children}
		</Button>
		</Form>
	</Formik>
	</div>
);
};

export default PersonForm;
