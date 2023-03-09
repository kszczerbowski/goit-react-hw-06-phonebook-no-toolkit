import { StyledContainer } from './App.styled';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactListElement } from './ContactListElement/ContactListElement';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('phonebook-list')) || []
  );
  const [filter, setFilter] = useState('');

  const handleClearForm = event => {
    const form = event.currentTarget;
    form.elements.name.value = '';
    form.elements.number.value = '';
  };

  const handleDeleteContact = nameToDelete => {
    setContacts(contacts.filter(contact => contact.name !== nameToDelete));
  };

  const handleAddContact = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      contacts.map(contact => contact.name).includes(form.elements.name.value)
    ) {
      window.alert(`${form.elements.name.value} is already in contacts!`);
    } else {
      setContacts([
        ...contacts,
        {
          name: form.elements.name.value,
          number: form.elements.number.value,
          id: nanoid(),
        },
      ]);
    }
    handleClearForm(event);
    document.querySelector('input#nameInput').focus();
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const filteredAndSortedContacts = contacts
    .filter(contact => {
      return contact.name?.toLowerCase().includes(filter.toLowerCase());
    })
    .sort((firstContact, secondContact) =>
      firstContact.name.localeCompare(secondContact.name)
    );

  useEffect(() => {
    const phonebookListStringified = JSON.stringify(contacts);
    window.localStorage.setItem('phonebook-list', phonebookListStringified);
  }, [contacts]);

  return (
    <StyledContainer>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onFilter={handleFilter} />
      <ContactList>
        {filteredAndSortedContacts.map(contact => {
          return (
            <ContactListElement
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              onDeleteContact={handleDeleteContact}
            />
          );
        })}
      </ContactList>
    </StyledContainer>
  );
};
