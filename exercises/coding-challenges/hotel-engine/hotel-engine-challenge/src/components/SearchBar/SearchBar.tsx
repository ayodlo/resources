import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.form``;
const Input = styled.input``;
const Label = styled.label``;

interface SearchBarProps {
  query: string;
  setQuery: Function;
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  return (
    <Wrapper>
      <Label htmlFor='input'>Search Posts</Label>
      <Input
        id='input'
        name='input'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </Wrapper>
  );
};

export default SearchBar;
