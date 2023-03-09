const initialState = {
  contacts: JSON.parse(localStorage.getItem('phonebook-list')) || [],
  filter: '',
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'contacts/addContact':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case 'contacts/deleteContact':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload.id
        ),
      };
    case 'filters/setFilter':
      return {
        ...state,
        filter: action.payload.text,
      };
    default:
      return state;
  }
};
