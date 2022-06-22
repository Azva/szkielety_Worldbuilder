import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {useParams} from "react-router-dom"

const LocationTableRow = (props) => {
    const { projectid } = useParams();
	const { _id, name, type } = props.obj;

	const deleteLocation = () => {
		axios
			.delete(
				"http://localhost:5000/api/"+ projectid +"/location/delete/" + _id)
			.then((res) => {
				if (res.status === 200) {
					alert("Usunieto miejsce");
					window.location.reload();
				} else Promise.reject();
			})
			.catch((err) => alert("error: " + err));
	};

	return (
		<tr>
			<td><Link to={"/" + projectid + "/location-details/"+_id} key={ _id}>
				{name}</Link></td>
            <td>{type}</td>
			<td align="center">
				<Link className="edit-link"
					to={ "../../"+ projectid + "/edit-location/" + _id} key={_id}>
					Edytuj
				</Link>
				<Button onClick={deleteLocation}
					size="sm" variant="danger">
					X
				</Button>
			</td>
		</tr>
	);
};

export default LocationTableRow;
