//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*STARTERS*/
////////////////
//Make sure yarn is installed globally on your device
//Run:
npm install --global yarn
//Remove App.test.js, logo.svg, reportWebVitals.js and setupTest.js and any location they were being used
//Add ES7 Snippets - Make sure its the React one...
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*React Architecture*/
////////////////
/*
1. All pages on within the top level of src (e.g. Card, Checkout, Home etc.)
2. a 'shared' folder within the top level of src with all shared components
3. a 'utils' folder with the top level of src with all utilities
4. Convey app structure by placing components unique to certain pages within that pages folder (e.g. ProductCard.ts should be in the Home page folder if that is the only place it is being used)
5. The Home Component will import the ProductCard.js file with one single dot.
6. The only time we should see two dotes going up in the folder structure is when there is a shared component or utility that is being needed
7. Have an index.js where you export only the Home component from this folder that way we have no idea that the Home module holds the ProductCards.js
The only thing we show outside this component are the contents of the Home component file:
export * from './Home'
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*React Rules*/
////////////////
/*
No More Than 100 Lines!
1. Single Responsibility: Create components w/ 1 responsibility & 1 reason to change
2. Encapsulated: Info hiding & communication --> use props (define) to control behavior & output
3. Composable: Split big components into smaller chunks & use composition to glue them back together
4. Reusable: Use 3rd party libraries --> reuse code wherever possible / avoid duplication
5. Pure Functions: Network requests & global variables suck --> make sure components are pure by returning same outputs for the same prop values
6. Meaningful: Component naming & expressive code are key to understanding vs understanding via comments
7. Testing: Automated way to find bugs --> if a component is difficult to test its probably designed poorly
8. Describe components with Props & Name vs using comments
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Thinking In React*/
////////////////
/*
0. Map out architecture of app to determine responsibility of each component (SOLID)
  -> Should not have to change one component to change another
1. Only store state if 
  -> State goes NOT come from parent
  -> State can NOT be derived
  -> State DOES change over time
2. Only pass props relevant for rendering UI
3. Put state at lowest component level where needed so all components that need it can access it
  -> One component should not fetch, hold state AND display
4. Map out architecture of app to determine responsibility of each component (SOLID)
5. Use Fragment vs Div where possible
6. Containers may be responsible for fetching data and composed of other components
7. Presentation components get their data from their parents (presentation components are dumb components)
8. Component has 1 reason to change (Isolation and Control - Single Responsibility).
  -> If component has multiple responsibilities split component into chunks by each individual responsibility.
9. Start with top down and build hierarchy with static version of JSON Data Model
10. Want the least amount of nodes to update upon each data update -> keep state in lowest node possible for optimization
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Create React App*/
////////////////
//npx is going to run the command for us instead of download and the . at the end says we want to run that command to the current directory
npx create-react-app .

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Routing*/
//////////////////
//Official docs: https://reactrouter.com/docs/en/v6/getting-started/overview
//See the epic react section for proper redirects and highlight active tab
//Install react-router-dom:
//npm add react-router-dom@6
//Import BrowserRouter, Routes, and Route from 'react-router-dom'
//Wrap your routes within Router and each Route within Routes with the following syntax <Route path='/' element={<Home />} />
import Navigation from './_shared/Navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Navigation />} />
        <Route path='' element={<Home />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;

//Use the Link component to direct to the route
//Nesting routes is simple
//Nest the routes as you usually would
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  </BrowserRouter>
  //Embed an <Outlet /> component inside the parent element where you want the route to load
  import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}

//Adding a "No Match" Route
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
    <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*HTTP Request*/
////////////////
//Inside App.js
//Make the call in our discover component
//Use encodeURIComponent to make sure inputs don't have user errors
//Create different states to the status, to make sure the user queried, and to update the query
//Use our status to determine what to load in JSX
//Consider writing your own useAsync() hook!
import { jsx } from '@emotion/core';
import React from 'react';
import './bootstrap';
import Tooltip from '@reach/tooltip';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Input, BookListUL, Spinner } from './components/lib';
import { BookRow } from './components/book-row';
import * as colors from './styles/colors';
import { client } from './utils/api-client';

function DiscoverBooksScreen() {
  const [status, setStatus] = React.useState('idle');
  const [query, setQuery] = React.useState('');
  const [queried, setQueried] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  React.useEffect(() => {
    if (!queried) {
      return;
    }
    setStatus('loading');
    client(`books?query=${encodeURIComponent(query)}`).then(
      (responseData) => {
        setData(responseData);
        setStatus('success');
      },
      (errorData) => {
        setError(errorData);
        setStatus('error');
      }
    );
  }, [query, queried]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
    setQueried(true);
  }

  return (
    <div
      css={{ maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0' }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder='Search books...'
          id='search'
          css={{ width: '100%' }}
        />
        <Tooltip label='Search Books'>
          <label htmlFor='search'>
            <button
              type='submit'
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label='error' css={{ colors: colors.danger }} />
              ) : (
                <FaSearch aria-label='search' />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {data.books.map((book) => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  );
}

export { DiscoverBooksScreen };

//Inside utils.js
//Import generic client function thats exported from .utils file'./utils/api-client'
import { client } from './utils/api-client';

function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  };

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Authentication*/
//////////////////
//Inside app.js
//Create get user function that sets user to null if there is no token provided, otherwise set user data to data state
//If there is a user we pass it as the second argument to our client function
//Getting our status functions from custom hook useAsync()
//We load either the Authenticated or Unauthenticated App Component based on whether or not we have user information (if the user is logged in)
//We use the Authorization library to handle the login and registration for the user passing in the form login and password information
//We show a full page loading spinner component whenever the status is loading
//We show an error component whenever we get an error
/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import * as auth from 'auth-provider';
import { FullPageSpinner } from './components/lib';
import * as colors from './styles/colors';
import { client } from './utils/api-client';
import { useAsync } from './utils/hooks';
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app';

async function getUser() {
  let user = null;

  const token = await auth.getToken();
  if (token) {
    const data = await client('me', { token });
    user = data.user;
  }

  return user;
}

function App() {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    run(getUser());
  }, [run]);

  const login = (form) => auth.login(form).then((user) => setData(user));
  const register = (form) => auth.register(form).then((user) => setData(user));
  const logout = () => {
    auth.logout();
    setData(null);
  };

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (isSuccess) {
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    );
  }
}

export { App };
//Inside utils.js and utilizing the client function which makes the http request
//We are now accepting data, token, customerHeaders, and customerConfig passed into client from app.js as an object {token} is what were using for now
//but if non are provided we default to an empty object
//We are destructuring these variables
//in params we are assigning the headers param passed in to a new variable named customerHeaders (like an alias in the params)
//in params we are assigning  the 'rest' of the arguments to the customerConfig variable by using the rest operator
//We initialie our config object we will pass to our fetch request
//if data exists will set method to 'POST' if none it will be 'GET'
//if data we will set a body to 'JSON.stringify(data)' if none we will set body to undefined
//if token we will set Authorization to `Bearer ${token}` if none it will be undefined
//if data we will make then Content-Type 'application/json' if none it will be undefined
//we spread any other customerHeaders inside the headers param in the config object that were passed into the object that was passed to client
//we spread any other customerConfig options that were passed into the object that was passed to client
import * as auth from 'auth-provider';
import { code } from 'esutils';
import { builtinModules } from 'module';
const apiURL = process.env.REACT_APP_API_URL;

function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  //We pass our confid options as an extra argument into the fetch api
  //If we get a 401 code (user trying to access information they shouldn't) then we log the user out and refresh the page
  //window.location.assign(window.location); will refresh the page and erase any headers we had in the browser
  //return Promise.reject({ message: 'Please re-authenticate.' }); will return a rejection from the fetch request and supply the message 'Please re-authenticate.'
  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        // refresh the page for them
        window.location.assign(window.location);
        return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Optimization*/
//////////////////
/*
-16ms or less for each task to prevent page lock
-Code Splitting for lazy loading large amounts of code, modules and libraries
-UseMemo: when we don't need to return a large function calculation on each rerender
-UseMemo: Also when we don't want to rerender an object each render because it's reference changes on each render and creation
-Production Move: npm run builtinModules, npm run serve - will be able to see how quick our app is in production
-Web Workers: For tasks longer than 16ms - web worker apis are async and won't lock the screen 
  ->webpack has this feature 
*/


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Cache Management*/
//////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Libraries For*/
//////////////////
//Error Boundaries
//Validation Libraries - Yup or react-hook-form
//Unique Keys Libraries
//Prop Types and Types
//Services to maintain SOLID
//HTTP Utilities
//Linters
//Latest Updates

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*React Design Patterns*/
//////////////////
Design

Context

Container/Presentation
Container - Logic
Child - Presentation

Render Props
