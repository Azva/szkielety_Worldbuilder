import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {useParams} from "react-router-dom"

const PersonTableRow = (props) => {
    const { projectid } = useParams();
	const { _id, name, race, classs } = props.obj;

	const deletePerson = () => {
		axios
			.delete(
				"http://localhost:5000/api/"+ projectid +"/person/delete/" + _id)
			.then((res) => {
				if (res.status === 200) {
					alert("Usunieto postac");
					window.location.reload();
				} else Promise.reject();
			})
			.catch((err) => alert("error: " + err));
	};

	return (
		<tr>
			<td><Link to={"/" + projectid + "/person-details/"+_id} key={ _id}>
				{name}</Link></td>
            <td>{race}</td>
            <td>{classs}</td>
			<td align="center">
				<Link className="edit-link"
					to={ "../../"+ projectid + "/edit-person/" + _id} key={_id}>
					Edytuj
				</Link>
				<Button onClick={deletePerson}
					size="sm" variant="danger">
					X
				</Button>
			</td>
		</tr>
	);
};

export default PersonTableRow;
