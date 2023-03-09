import React from 'react';
import {
  StyledFilterArea,
  StyledLabel,
  StyledFilterInput,
} from './Filter.styled';
import { setFilter } from 'redux/actions';
import { useDispatch } from 'react-redux';

export const Filter = () => {
  const dispatch = useDispatch();
  const onFilter = event => {
    const newFilterValue = event.target.value;
    dispatch(setFilter(newFilterValue));
  };
  return (
    <StyledFilterArea>
      <StyledLabel htmlFor="filterInput">Find contacts by name</StyledLabel>
      <StyledFilterInput
        onChange={onFilter}
        id="filterInput"
        type="text"
        name="filter"
      ></StyledFilterInput>
    </StyledFilterArea>
  );
};
