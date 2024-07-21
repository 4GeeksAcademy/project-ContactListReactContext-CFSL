import React, { useContext, useState } from "react";
import {Context} from "../store/appContext";

export const FormAddContact = () => {

    const {store, actions} = useContext(Context)

    const [formdata, setFormdata]= useState({
        name:'',
        email:'',
        phone:'',
        address: ''
    }); 
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log("datos que recojo del form y voy a enviar",formdata);
        actions.addContact(formdata);
    };

    const handleChange = (e) =>{
        setFormdata({...formdata, [e.target.name]: e.target.value});
    }; 
 
    
	return (
		<div className="mx-auto m-5">
        <h2 className="text-center mb-4">Add a new contact </h2>
        <form onSubmit={handleSubmit}>
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter Full Name" name="name" value={formdata.name} onChange={handleChange} ></input>
            <label className="form-label">Email</label>
            <input type="text" className="form-control" placeholder="Enter email"  name="email" value={formdata.email} onChange={handleChange}></input> 
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" placeholder="Enter phone" name="phone" value={formdata.phone} onChange={handleChange}></input>
            <label className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="Enter address" name="address" value={formdata.address} onChange={handleChange}></input>
            <input type="submit" className="form-control btn btn-primary mt-3" value={'Add a new contact'}></input>

        </form>
        </div>
	);
};
