import React, { useContext, useEffect, useState } from "react";
import {Context} from "../store/appContext";

export const FormEditContact = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="mx-auto mt-0">
            <h2 className="text-center mb-4">Modificar Contacto</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                <label className="form-label">Teléfono</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                <label className="form-label">Dirección</label>
                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                <input type="submit" className="form-control btn btn-primary mt-3" value="Modificar" />
            </form>
        </div>
    );

    
};
