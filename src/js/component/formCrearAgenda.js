import React, { useContext, useState } from "react";
import {Context} from "../store/appContext";

export const FormCrearAgenda = () => {

    const {store, actions} = useContext(Context)

    const [agendaName, setAgendaName]= useState(store.agendaName || '');

    
    const handleSubmit = e => {
        e.preventDefault();
        console.log("datos que recojo del form y voy a enviar",agendaName);
        actions.crearAgenda(agendaName);
        
    };

    const handleChange = (e) =>{
        setAgendaName( e.target.value);
    }; 
 
	return (
		<div className="mx-auto m-5">
        <h2 className="text-start mb-4">Crear Agenda</h2>
        <form onSubmit={handleSubmit}>
            <label className="form-label">Nombre de la agenda</label>
            <input type="text" className="form-control" placeholder="Nombre de la agenda" value={agendaName} onChange={handleChange} required ></input>
            <input type="submit" className="form-control btn btn-primary mt-3" value={'Crear Agenda'}></input>

        </form>
        </div>
	);
};
