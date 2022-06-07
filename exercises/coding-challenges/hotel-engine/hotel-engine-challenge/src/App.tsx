import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResultsList from './components/SearchResultsList/SearchResultsList';
import styled from 'styled-components';
import './App.css';

const Wrapper = styled.div`
display: flex;
flext-direction: column;
align-items: center;
gap: 1em;
`;

const App = () => {

  const queryReducer = (state: Object, action: Object) => {
    switch(action.type)  {
      case'query':
      return {...state, query: action.query}
      default:
      throw new Error(`Cannot use action type ${action.type}`)
    }
  }

  const [state, dispatch] = React.useReducer(queryReducer, {items : [], query: '', language: '', sort: '', order: ''})
  const {query, language, sort, order} = state;
  const URL = `https://api.github.com/search/repositories?${query ? 'q=' + query : ''}${language ? '+language:' + language : ''}${sort ? '&sort=' + sort : ''}${order ? '&order=' + order : ''}`
  console.log(URL)
  React.useEffect(() => {
    if(query === '') {
      return
    }
    fetch(URL).then(
      async (response: any) => {
        if (response.ok) {
          const data = await response.json();
          setItems(data.items)
        } else {
          throw new Error(`Failed Response: ${response.code}`);
        }
      },
      (error: any) => {
        throw new Error(error.message);
      }
    );
  }, [URL]);

  return (
    <Wrapper>
      <SearchBar query={query} setQuery={setQuery} />
      <SearchResultsList items={items}  />
    </Wrapper>
    );
};

export default App;
