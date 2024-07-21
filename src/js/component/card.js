import React, { useContext, useState } from "react";
import imgUser from "../../img/user2.png";

import { Context } from "../store/appContext";

import { FormEditContact } from "./formEditContact";

export const Card = ({id, name, phone, email, address}) => {
    const { actions } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        console.log(id);
        actions.deleteContact(id);
    };

    const handleUpdate = async (formData) => {
        
        await actions.modificarContact(id, formData);
        setIsEditing(false);
    };

	return (
		<div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-3 text-center">
                    <img src={imgUser} className="img-fluid rounded-start " alt="imagen user"/>
                </div>
                <div className="col-md-9">
                    <div className="card-body d-flex justify-content-between">
                        {isEditing ? (
                                <FormEditContact initialData={{ id, name, phone, email, address }} onSubmit={handleUpdate} />
                            ) : (
                                <>
                                    <div>
                                        <h5 className="card-title">{name}</h5>
                                        <p className="card-text">{phone}</p>
                                        <p className="card-text">{email}</p>
                                        <p className="card-text">{address}</p>
                                    </div>
                                    <div className="d-flex align-items-end"> 
                                        <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Modificar</button>
                                    </div>
                                </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
	);
};
