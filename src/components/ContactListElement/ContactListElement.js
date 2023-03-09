import React from 'react';
import { StyledDeleteButton } from './ContactListElement.styled';
import PropTypes from 'prop-types';

export const ContactListElement = ({ name, number, id, onDeleteContact }) => {
  return (
    <li>
      <span id="name">{name}</span>: {number}
      <StyledDeleteButton
        onClick={() => {
          onDeleteContact(name);
        }}
        type="button"
      >
        Delete
      </StyledDeleteButton>
    </li>
  );
};
ContactListElement.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  id: PropTypes.string,
  deleteContact: PropTypes.func,
};
