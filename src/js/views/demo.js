import React from "react";
import { Link } from "react-router-dom";

import { FormAddContact } from "../component/formAddContact";

import "../../styles/demo.css";

export const Demo = () => {

	return (
		<div className="container">
			<FormAddContact></FormAddContact>

			<Link to="/">
				<div className="d-flex justify-content-end">
					<button className="btn btn-primary">Back home</button>
				</div>
			</Link>
		</div>
	);
};
