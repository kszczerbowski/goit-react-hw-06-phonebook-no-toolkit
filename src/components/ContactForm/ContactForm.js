import React from 'react';
import {
  StyledInputArea,
  StyledInput,
  StyledLabel,
  StyledAddButton,
} from './ContactForm.styled';
import { addContact } from 'redux/actions';
import { getContacts } from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (
      contacts.map(contact => contact.name).includes(form.elements.name.value)
    ) {
      window.alert(`${form.elements.name.value} is already in contacts!`);
    } else {
      dispatch(
        addContact(form.elements.name.value, form.elements.number.value)
      );
    }
    form.reset();
    document.querySelector('input#nameInput').focus();
  };

  return (
    <StyledInputArea>
      <form onSubmit={onSubmit}>
        <StyledLabel htmlFor="nameInput">Name</StyledLabel>
        <StyledInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id="nameInput"
        />
        <StyledLabel htmlFor="phoneInput">Phone number</StyledLabel>
        <StyledInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id="phoneInput"
        />
        <StyledAddButton type="submit">Add contact</StyledAddButton>
      </form>
    </StyledInputArea>
  );
};
