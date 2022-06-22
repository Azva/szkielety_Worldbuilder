import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const LocationForm = (props) => {
const validationSchema = Yup.object().shape({
	name: Yup.string().required("Nazwa nie moze byc pusta"),
    type: Yup.string().required("Typ terenu nie moze byc pusty"),
	closeTo: Yup.string(),
    notes: Yup.string()
});
console.log(props);
return (
	<div className="form-wrapper">
	<Formik {...props} validationSchema={validationSchema}>
		<Form>
        <div className="form-title">Nazwa<span 
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
		<div className="form-title">Typ terenu<span 
		className="highlighted">*</span></div>
        <FormGroup className="form-group">
			<Field name="type" as="select"
				className="form-control" >
					<option value="">Wybierz...</option>
					<option value="las">las</option>
					<option value="miasto">miasto</option>
					<option value="wioska">wioska</option>
					<option value="pustynia">pustynia</option>
					<option value="jezioro">jezioro</option>
					<option value="rzeka">rzeka</option>
					<option value="ruiny">ruiny</option>
					<option value="inne">inne</option>
			</Field>
			<ErrorMessage
			name="type"
			className="d-block invalid-feedback"
			component="span"
			/>
		</FormGroup>
		<div className="form-title">Pobliskie tereny</div>
        <FormGroup className="form-group">
			<Field name="closeTo" type="text"
				className="form-control" />
			<ErrorMessage
			name="closeTo"
			className="d-block invalid-feedback"
			component="span"
			/>
        </FormGroup>
		<div className="form-title">Notatki</div>
        <FormGroup className="form-group">
			<Field name="notes" type="text"
				className="form-control" />
			<ErrorMessage
			name="notes"
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

export default LocationForm;
