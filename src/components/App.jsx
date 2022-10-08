import { useState, useEffect } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import shortid from "shortid";
import { Box } from "./Box";

import ContactForm from "./ContactForm";
import ContactList from './ContactList';
import Filter from "./Filter";
import Title from "./Title";

export const App = () => {

   const [contacts, setContacts] = useState(() => {
        return JSON.parse(window.localStorage.getItem('contacts')) ?? []
    });
    const [filter, setFilter] = useState("");


    useEffect(() => {
        
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]
    );

    const receivedData = ({ name, number }) => {
  
        const newContact = {
            id: shortid.generate(),
            name,
            number,
        };

        return contacts.find(
            ({ name }) => newContact.name.toLocaleLowerCase() === name.toLocaleLowerCase())
            ? Notify.failure(`${newContact.name} is already in contacts`) :
            setContacts(() => [...contacts, newContact]);
    };

    const handleInputName = (evt) => setFilter(evt.target.value);

    const filterContactByName = () => {
        const adjustedFilter = filter.toLocaleLowerCase();

        return contacts.filter(({ name }) =>
            name.toLocaleLowerCase().includes(adjustedFilter));
    };

    const OnDeleteContact = (ContactId) => {
        setContacts(() => contacts.filter(contact => contact.id !== ContactId));
    };
    return (
        <Box p={5} color="black" bg="muted">
            <Title text="Phonebook" />
            <ContactForm onSubmit={receivedData} />
            <Title text="Contacts" />
            <Filter
                filter={filter}
                handleInputName={handleInputName}
            />
            <ContactList
                filter={filter}
                OnDeleteContact={OnDeleteContact}
                contacts={filterContactByName()}
            />
        </Box>
    )
};