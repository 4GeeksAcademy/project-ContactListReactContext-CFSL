import React, { useContext, useEffect} from "react";
import {Context} from "../store/appContext";

import "../../styles/home.css";

import { Card } from "../component/card";
import { FormCrearAgenda } from "../component/formCrearAgenda";
export const Home = () => {

	const {store, actions} = useContext(Context);

	useEffect(()=>{
		actions.getContacts()
	},[store.agendaName])

	return (
		<div>
			<div className="m-5">
			<FormCrearAgenda></FormCrearAgenda>
			</div>
			<div className="m-5">
				{store.contacts.map((el) => (<Card key={el.id} id={el.id} name={el.name} phone={el.phone} email={el.email} address={el.address}  />))}
			</div>
		</div>
	);
};
