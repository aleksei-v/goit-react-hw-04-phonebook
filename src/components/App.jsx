import React, { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import shortid from "shortid";
import { Box } from "./Box";

import ContactForm from "./ContactForm";
import ContactList from './ContactList';
import Filter from "./Filter";
import Title from "./Title";

export class App extends Component {

    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    receivedData = ({ name, number }) => {
        const { contacts } = this.state;
        const newContact = {
            id: shortid.generate(),
            name,
            number,
        };

        contacts.find(({ name }) =>
            newContact.name.toLocaleLowerCase() === name.toLocaleLowerCase())
            ? Notify.failure(`${newContact.name} is already in contacts`) :
            this.setState((prevState) => ({
                contacts: [...prevState.contacts, newContact]
            }));
    };

    handleInputName = (evt) => {
        this.setState({
            filter: evt.target.value,
        });
    };
        filterContactByName = () => {
        const { filter, contacts } = this.state;

        const adjustedFilter = filter.toLocaleLowerCase();

        return contacts.filter(({ name }) =>
            name.toLocaleLowerCase().includes(adjustedFilter));
    };


    OnDeleteContact = (ContactId) => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== ContactId),
        }));
    };

    componentDidMount() {
        const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

        if (parsedContacts) {
            this.setState({
                contacts: parsedContacts
            });
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts',
                JSON.stringify(this.state.contacts));
        };
    }

    render() {
        const filteredContacts = this.filterContactByName()
        const { filter } = this.state;
        return (
            <Box p={5} color="black" bg="muted">
                <Title text="Phonebook" />
                <ContactForm onSubmit={this.receivedData} />
                <Title text="Contacts" />
                <Filter
                    filter={filter}
                    handleInputName={this.handleInputName}
                />
                <ContactList
                    filter={filter}
                    OnDeleteContact={this.OnDeleteContact}
                    contacts={filteredContacts}
                />
            </Box>
        )
    }};