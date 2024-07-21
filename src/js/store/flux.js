const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts:[],
			agenda: null,
			agendaName: ''
		},
		actions: {
			crearAgenda: async(agendaName)=>{
				try {
                    const resp = await fetch('https://playground.4geeks.com/contact/agendas/'+agendaName, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
						body: JSON.stringify({ slug: agendaName })
                    });
                    if (resp.ok) {
                        const data = await resp.json();
						setStore({ agenda: data, agendaName: agendaName });
                        console.log("Agenda creada:", data);
                        alert("Agenda creada! Ahora puedes añadir contactos a tu agenda, click en el botón ---> Add new contact");
                    } else {
                        console.log("Error al crear la agenda");
                    }
                } catch (error) {
                    console.log('Error en createAgenda', error);
                }

			},
			getContacts: async () => {
				const store = getStore();
                const agendaName = store.agenda?.slug;
                if (!agendaName) {
                    console.log('No se ha seleccionado ninguna agenda');
                    return;
                }
				try {
					const resp= await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts`);
					const data= await resp.json() //la respuesta la pasamos a json
					//guardamos la informacion en el store
					setStore({contacts: data.contacts}) //en la variable users añadimos los datos de la respuesta del fetch
					console.log(data)
				} catch (error) {
					console.log('Error en getContacts',error)
				}
			},
			addContact: async(contact) => {
				const store = getStore();
                const agendaName = store.agenda?.slug;
                if (!agendaName) {
                    console.log('No se ha seleccionado ninguna agenda');
                    return;
                }
				try {
					const resp= await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact)
					});
					if (resp.ok){
						const data= await resp.json() 
						console.log("Datos del contacto añadidos al store",data)
						setStore({contacts: [...getStore().contacts, data]}) 
						alert("Contacto añadido! Back to home o Add new contact.")
					}else{
						console.log("Error al añadir nuevo contacto");
					}
					
					} catch (error) {
					console.log('Error en addContact con API',error)
				}
			},
			deleteContact: async(id) => {
				const store = getStore();
                const agendaName = store.agenda?.slug;
                if (!agendaName) {
                    console.log('No se ha seleccionado ninguna agenda');
                    return;
                }
				try {
					const resp= await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/` +id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if(resp.ok){
						console.log(id)

						//creamos una variable para almacenar lo que hay en contact
						//let aux= getStore().contacts;
						//aux.splice(contact, 1);
						//setStore({contacts: aux});

						const store = getStore();
            			const contactIndex = store.contacts.findIndex(contact => contact.id === id);
                		// Crear una copia del array de contactos y eliminar el contacto
                		const newContacts = [...store.contacts];
                		newContacts.splice(contactIndex, 1);
                		// Actualizar el estado con la nueva lista de contactos
                		setStore({ contacts: newContacts });
                    	
						console.log("Contacto eliminado correctamente");

					} else{
						console.log("Error al eliminar contacto");
					}
					
					} catch (error) {
					console.log('Error en deleteContact',error)
				}
			},
			modificarContact: async(id, updateContact) => {
				const store = getStore();
                const agendaName = store.agenda?.slug;
                if (!agendaName) {
                    console.log('No se ha seleccionado ninguna agenda');
                    return;
                }
				try {
					const resp= await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(updateContact)
					});
					if (resp.ok){
						const data= await resp.json(); 
						console.log("Datos del contacto modificados",data);
						//actualizamos el contacto en el store
						const updatedContacts = getStore().contacts.map(contact =>
							contact.id === id ? data : contact
						);
						setStore({contacts: updatedContacts}); 

					}else{
						console.log("Error al modificar contacto");
					}
					
					} catch (error) {
					console.log('Error en modificarContact con API',error)
				}
			},
		}
	};
};

export default getState;
