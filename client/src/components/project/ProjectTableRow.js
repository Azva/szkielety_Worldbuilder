import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ProjectTableRow = (props) => {
	const { _id, name } = props.obj;

	const deleteProject = () => {
		axios
			.delete(
				"http://localhost:5000/api/projects/delete/" + _id)
			.then((res) => {
				if (res.status === 200) {
					alert("Usunieto caly projekt");
					window.location.reload();
				} else Promise.reject();
			})
			.catch((err) => alert("error: " + err));
	};

	const toggleExpand = () => {

	}

	return (
		<tr>
			<td><Link to={"/" + _id + "/project-details"} key={_id}>
				{name}</Link>
			</td>
			<td align="center">
				<Button onClick={toggleExpand}
					size="sm" className="expand-link">
					Rozwin
				</Button>
				<Link className="edit-link"
					to={"/edit-project/" + _id} key={_id}>
					Edytuj
				</Link>
				<Button onClick={deleteProject}
					size="sm" variant="danger">
					X
				</Button>
			</td>
		</tr>
	);
};

export default ProjectTableRow;
