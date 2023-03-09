import { StyledContainer } from './App.styled';
import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactListElement } from './ContactListElement/ContactListElement';
import { Filter } from './Filter/Filter';
import { getContacts, getFilter } from 'redux/selectors';
import { useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

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
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList>
        {filteredAndSortedContacts.map(contact => {
          return (
            <ContactListElement
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
            />
          );
        })}
      </ContactList>
    </StyledContainer>
  );
};
