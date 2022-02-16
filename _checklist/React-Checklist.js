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
/*JSX and React.create element Basics*/
////////////////
// It is good to understand how JSX works - if we can imagine how JSX elements will be rendered via the React.createElement() function we will have an easier time with it
const ui = <h1 id="greeting">Hey there</h1>
// ↓ ↓ ↓ ↓ compiles to ↓ ↓ ↓ ↓
const ui = React.createElement('h1', {id: 'greeting', children: 'Hey there'})
// ReactDOM is responsible for rendering the elements to the dom
ReactDOM.render(ui, rootElement) 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*JSX Interpolation*/
////////////////
//String interpolation ends up creating properties vs normal string elements
//Example:
const element = <div className={className.toUppercase()}>{children.toLowercase()}</div>
//Will literally get converted to this
var element = React.createElement("div", {
  id: 'string',
  className: className.toUppercase()
}, children.toLowercase()); 

ReactDOM.render(element, document.getElementById('root'));
//Everything gets converted to javascript inside {} - note that we can only use expressions inside the interpolation
//Expressions is something that evauluates to a value while Statements are some imperative logic that you can apply for your program or app
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*JSX Props*/
////////////////
//Different way we can pass props to our JSX elements
const children = 'Hello World'
const className = 'container'
const props = {children, className}
const element = <div />
//#1
const element = React.createElement('div', props)
//#2
const element = React.createElement('div', {...props})
//#3
const element = <div {...props}/>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Prop Types*/
////////////////
//declare PropTypes object inside compoent and set your props
function FavoriteNumber({favoriteNumber}) {
  return <div>My favorite number is: {favoriteNumber}</div>
}

// define your checker functions within the PropTypes object and use them inside the propTypes property on your component
const PropTypes = {
  number(props, propName, componentName) {
    if (typeof props[propName] !== 'number') {
      return new Error(`Hey, the component ${componentName} needs the prop ${propName} to be a type of "number" but was passed a ${type}.`)
    }
  },
}
// add propTypes property to component and define your checker functions which we defined in the PropTypes object
FavoriteNumber.propTypes = {
  favoriteNumber: PropTypes.number,
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Prop Types With Library*/
////////////////
// declare PropTypes object inside compoent and set your props
function Message({subject, greeting}) {
  return <div className='Message'>{greeting}, {subject}</div>
}

// use PropTypes method we imported from prop-types on a component and define your prop types for each prop
Message.PropTypes = {
  subject: PropTypes.string.isRequired, // need to use isRequired if we don't want props missing from component usage
  greeting: PropTypes.string.isRequired,
}

const element = (<div className='Container'>
  <Message subject="World" />
  <Message greeting="Goodbye" subject={5} />
</div>)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Key Prop for Rendering Arrays*/
////////////////////////////////
//Make sure to add keyprop when rendering arrays or else React will not know if an item was just removed from the end or if an item was moved somewhere else and the value of the last item changed
//Needs to be a unique identifier that is not the index
import * as React from 'react'

const allItems = [
  {id: 'apple', value: '🍎 apple'},
  {id: 'orange', value: '🍊 orange'},
  {id: 'grape', value: '🍇 grape'},
  {id: 'pear', value: '🍐 pear'},


function App() {
  const [items, setItems] = React.useState(allItems)

  function addItem() {
    const itemIds = items.map(i => i.id)
    setItems([...items, allItems.find(i => !itemIds.includes(i.id))])
  }

  function removeItem(item) {
    setItems(items.filter(i => i.id !== item.id))
  }

  return (
    <div className="keys">
      <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {items.map(item => (
          // 🐨 add a key prop to the <li> below. Set it to item.id
          <li key={item.id}>
            <button onClick={() => removeItem(item)}>remove</button>{' '}
            <label htmlFor={`${item.id}-input`}>{item.value}</label>{' '}
            <input id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul>
    </div>
  )
}
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
/*FORMS*/
////////////////
//You can attach a submit handler to a form element with the onSubmit prop. This will be called with the submit event which has a target.
//That target is a reference to the <form> DOM node which has a reference to the elements of the form which can be used to get the values out of the form!
//Ways to get the form values:
//Via their index: event.target.elements[0].value
//Via the elements object by their name or id attribute: event.target.elements.usernameInput.value - the htmlForm corresponds to the id so use id and htmlForm
//By default without prevent default the submit will make a get request to the current url with the form inputs as query params ?usernameInput=currentValue - add event.preventDefault()
//Event here is a SyntheticEvent, an object React creates to act exactly as a native event would, but it uses event delgation to help performance wise - can still access native event via event.nativeEvent
//event.target will be the actual form - event.target.elements[0] or event.target.elements.usernameInput will be the input element
//best to access elements via their name they are given - using event.target.elements will provide all the elements within the form (target) which can then be access by their names
//thus we use event.target.elements.usernameInput.value to get the value
import * as React from 'react'

function UsernameForm({onSubmitUsername}) {// define UsernameForm component and expect the onSubmitUsername function prop
  const handleSubmit = event => { //make sure we grab the event prop which automatically comes with the onSubmit event as long as it's provided in the callback
    event.preventDefault() //prevent default action which is sending a get request or a post request
    onSubmitUsername(event.target.elements.usernameInput.value) //grab input field via usernameInput id provided within the input
  }

  return (
    // make sure to define onSubmit within the form element - also make sure to provide event as a property of the callback
    // make sure to use htmlFor on our labels as well as give the input a name and id
    // make sure to give the button a type of submit
    <form onSubmit={event => handleSubmit(event)}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input type="text" name="usernameInput" id="usernameInput" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*FORMS - Controlled Inputs*/
////////////////////////////
//Can add an error variable ([error, setError]) to conditionally show error messages and disable buttons if we need to!
//Typically you’ll want to provide an onChange handler as well so you can be made aware of “suggested changes” to the input’s value (where React is basically saying "if I were controlling this value, here’s what I would do, but you do whatever you want with this").
//Typically you’ll want to store the input’s value in a state variable (via React.useState) and then the onChange handler will call the state updater to keep that value up-to-date.

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  const [username, setUsername] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmitUsername(username)
  }

  function handleChange(event) {
    setUsername(event.target.value.toLowerCase())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          id="usernameInput"
          type="text"
          onChange={handleChange}
          value={username}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return (
    <div style={{minWidth: 400}}>
      <UsernameForm onSubmitUsername={onSubmitUsername} />
    </div>
  )
}

export default App
export default App
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
/*NOTES ON FETCH
The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, as soon as the server responds with headers, the Promise will resolve normally (with the ok property of the response set to false if the response isn’t in the range 200–299), and it will only reject on network failure or if anything prevented the request from completing.

fetch() won’t send cross-origin cookies unless you set the credentials init option. (Since April 2018. The spec changed the default credentials policy to same-origin. Firefox changed since 61.0b13.)

Here we are fetching a JSON file across the network and printing it to the console. The simplest use of fetch() takes one argument — the path to the resource you want to fetch — and does not directly return the JSON response body but instead returns a promise that resolves with a Response object.

The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON.
*/
import { client } from './utils/api-client';

export function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  };

  return window.fetch(`${endpoint}`, config).then(async (response) => {
    const data = await response.json(); //response object does not directly include JSON response body so we use the .json() function to get that body from resp object
    if (response.ok) { //the 'ok' property of resp object will be true if it is in range of 200-299 - see above for more details
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
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
import { string } from 'prop-types'
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
/*useState Hook*/
////////////////
//here we destructure an array provided by the useState function given by React
function App() {
  const [counter, setCounter] = useState(0)
}
//we can lazily load the initial value for useState if it is an expensive computation
//this works because if we just put an actual function (e.g. useState(myFunction())) then my function will get rendered every time the component rerenders because it is being called, however, if we provide an anonymous function that returns a function it will only be called once
//after the first render the useState() hook will have served its purpose and will not be called again!
function App() {
  const [counter, setCounter] = useState(() => {
    myFunction();
    return 0;
  })
}
//lastly, we can use the current value of state to determine the next value of state if it depends on the previous value of state
//here React checks if setCounter is called with a function it will give that function a parameter that is equivalent to the latest value of state here which is 'currentStateValue'
function App() {
  const [counter, setCounter] = useState(0)
  //counter = 0
  return (
    <div className="App">
      <h1 onClick={() => 
      setCounter(currentStateValue => currentStateValue + 1)
      setTimeout((currentStateValue) => {
        setCounter(currentStateValue)
      }, 1000)
      setTimeout((currentStateValue) => {
        setCounter(currentStateValue)
      }, 3000)} />
    </div>
    )
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useEffect Hook*/
////////////////
//Allows component to be aware of changes
//Realize whenever we use the useState or setState our component will rerender
//The dependency array determines when the function passed in will run (if its not provided it will run after each rerender, if its empty after the first rerender and if dependencies are provided it will run if any of those dependencies change)
//Second meeting MUST be an array or undefined
//Here we are binding these set of values to this effect
//You can have multiple useEffects
//Remember if trying to update state in useEffect we might run into trouble because you will encounter an infinite loop (generally don't update state value inside useEffect without conditional checks)
//Only use the useState var inside the useEffect or else the memory location of your object or dependency inside the useEffect hook will not work properly
//Good for making HTTP request or interacting with DOM APIs
function App() {
  const [counter, setCounter] = useState(0)
  const [counter2, setCounter2] = useState(0)

  useEffect (() => {
    console.log('Counter 1 changed')
  }, [counter])

  useEffect (() => {
    console.log('Counter 2 changed')
  }, [counter2])

  return (
    <div className="App">
      <h1 onClick={() => setCounter(currentCounterValue => currentCounterValue + 1)} />
      <h1 onClick={() => setCounter2(currentCounter2Value => currentCounter2Value + 1)} />
    </div>
    )
}
//Another Example W/ Local Storage and Lazy Loading & Nullish Operator
import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(() => window.localStorage.getItem('name') ?? initialName)

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useEffect Hook - Cleaup*/
////////////////
//We can return a function in useEffect as a means of cleaning up after counter 1 has been updated and the effect has ran
//The clean up will only run when the instance of the UI is torn down and rebuilt
function App() {
  const [counter, setCounter] = useState(0)

  useEffect (() => {
    console.log('Counter 1 changed') //1 first time this runs //2 this runs the second time AFTER the clean up runs
    return () => {
      console.log('Clean up after counter 1 updated') //2 second time this runs because the first UI gets torn down and rebuilt since the var changed
    }
  }, [counter])

  return (
    <div className="App">
      <h1 onClick={() => setCounter(currentCounterValue => currentCounterValue + 1)} />
    </div>
    )
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useRef Hook - DOM Element Access*/
//////////////////
//most of the time we don't want to hook into dom element by manipulating dom directly with document.getElementById or something
//ref is an object that stays consistent between renders of your React component. It has a current property on it which can be updated to any value at any time. 
//In the case of interacting with DOM nodes, you can pass a ref to a React element and React will set the current property to the DOM node that’s rendered.
//need to make sure we are using the ref.current.value (current is important)
//useRef on every render will return the same object - whatever we store in it will be stored as the current properties values and can be modified without a component rerender
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
    console.log(inputEl.current.value) // notice we don't need the target here (target would be the form)
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useRef Hook - Mutable Objects*/
//////////////////
//another example demonstrating how we can change this object 'obj' value without a rerender or rerender without the value changing (it can be mutated but if you update obj.current it will not trigger a rerender)
//can store a mutable value inside your function while also getting free memory clean up
//e.g. cons obj = useRef({json: '<heavy>...'}) - this memory will be freed once the component is unmounted vs not being freed if it is in the global space
function App() {
  const obj = useRef(5) //{current: 5}
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log('Effect ran!')
  }, [obj])

  useEffect(() => {
    obj.current *= 5
  }, [counter])

  return (<div className="App">
    <h1 onClick={() => setCounter(val => val + 1)}>Hello World {counter}</h1>
  </div>)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Custom Hooks - useMyFunction*/
///////////////////////////////
//Good for making areusable functions or making hooks you are currently using more generic (e.g. grabbing state from local stoage and setting local storage based on state) 
//Cutom Hooks need to start with 'use' without quotes e.g. useLocalStorageState
//Custom Hooks are merely functions that use other hooks (prebuilt hooks or custom hooks)

import * as React from 'react'

function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState] //notice we return the hook in the same way we expect to use our useState hook where we need this hook
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Custom Hooks - useMyFunction - MORE GENERIC*/
//////////////////////////////////////////////
//Great for bringing huge and generic customization of hooks that already exist!
import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
  {serialize = JSON.stringify, deserialize = JSON.parse} = {}, 
  //JSON.stringify() can be used to stringify anything like an object or value
  //JSON.parse does the opposite - pulls the string without having quotes
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue //checking if value is a function (computationally expensive) then we want to call it aka lazy load and if not we want to leave it as a value
  })

  // Here we are using the useRef to store the previous key without having to rerender if it changes
  const prevKeyRef = React.useRef(key)

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  // here we compare the prev key to the new key - if they don't match we remove the old key/item from localstorage and store it with our new key
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*PATTERNS*/
///////////
// 1) Repetitive Props - Whenever props are repetitive within a component we are using alot
import {useState} from 'react';

const Button = (props) => {
  const [counter, setCounter] = useState(0);
  return (
    <div onClick={() => {setCounter(c => {c + props.increment})}} style={{color: props.color, text-decoration: props.underline ? 'underline' : undefined}}>I am a button {conter}</div>
    )
}

function App() {
  /* JSX Code => React.createElement('Button', {prop1: '100'}, ...objectDesctructingHere)
  the above equals <Button prop1={'100'}/>*/
  const props = {
      increment: 2,
      underline: true,
      color: 'black'
    }

  return (
    <div className='App'>
    <Button {...props} color={{'black'}}/>
    <Button color={{'green'}} />
    <Button color={{'blue'}} />
    </div>
  )
}

// 2) State Machines
// step 1 - program starts
// step 2 - 10 buttons that do different things (click button 1 -> state 2) - (click button 2 -> state 3) etc...
// step 3 - each button makes the app go into a different state
// step 4 - we want to replace boolean values with having a state instead (e.g. we want to get away from something like const [busy, setBusy]=useState(false) because there are many different state possibilities)
// step 5 - this is where a reducer comes in handy
// final - below we have created a 'state machine' in which each time a button is clicked it goes to the next state and cycles!
// great for HTTP requests - e.g. on initial request change state to LOADING, once we hae made request switch state to LOADED, if there is an error change state to ERROR, if there is a success change state to SUCCESS and depending on the state we can render the component differently
import {useReducer} from 'react';
function reducer({state}, ) { //first argument is our dependency? it automatically placed by the app since we are giving it state //second argument is what we pass into dispatch function which here is nothing
  switch(type) {
    case 'PRESSED_ONCE':
      return {state: 'PRESSED_TWICE'}
  }
    case 'PRESSED_TWICE':
      return {state: 'PRESSED_THREE'}
  }
    case 'PRESSED_THREE':
      return {state: 'PRESSED_ONCE'}
  }
}

const Button = (props) => {
  const [counter, setCounter] = useState(0)
  const [state, dispatch] = useReducer(reducer, {state: 'PRESSED_ONCE'});
  return (
    <div onClick={() => dispatch()} style={{color: props.color, text-decoration: props.underline ? 'underline' : undefined}}>I am a button {conter}</div>
    <div>{state.state}</div>
  )
}

function App() {
  /* JSX Code => React.createElement('Button', {prop1: '100'}, ...objectDesctructingHere)
    the above equals <Button prop1={'100'}/>*/
    const props = {
      increment: 2,
      underline: true,
      color: 'black'
    }

  return (
    <div className='App'>
    <Button {...props} color={{'black'}}/>
    <Button color={{'green'}} />
    <Button color={{'blue'}} />
    </div>
  )
}
// 3) State Machines - HTTP Request
//this pattern is great for maintaining your state - its better than having 2 states with useState and helps keep things organized and clean
//states we will have:
//idle
//loading
//loaded
//error

import React from 'react';
function App() {
  const [state, setState] = React.useState('idle');
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  
  function clicked() {
    setError(null)
    setState('loading');
    window.fetch('/data.json').then((response) => {
      try {
        setData(response.json());
        setState('loaded')  
      } catch(error) {
        setError(error.message)
        setState('req-error')
      }
    }).catch((error) => {
      setError(error.message)
      setState('network-error')
    })
  }

  if(state === 'idle') {
    return (
      <div onclick={() => {clicked()}}>
        Current State: {}
      </div>
    )
  }

  if(state === 'req-error') {
    return (
      <div onclick={() => {clicked()}}>
        <p>There was a request error - bad server response:</p>
        <p style={{color: red}}>{error ? 'error' : 'Could not load network request error message'}</p>
      </div>
    )
  }
  
  if(state === 'network-error') {
    return (
      <div onclick={() => {clicked()}}>
        <p>There was a network error:</p>
        <p style={{color: red}}>{error ? 'error' : 'Could not load network error message'}</p>
      </div>
    )
  }
  
  
  if(state === 'lodaing') {
    return (
      <div onclick={() => {clicked()}}>
        Loading...
      </div>
    )
  }
  
  if(state === 'loaded') {
    return (
      <div onclick={() => {clicked()}}>
        Loaded!
      </div>
    )
  }

  export default App()
}

// 3) Compound Components
// common when using external libraries like Material UI or UI library
//e.g. if there is a checkbox and there are certain child components that are only valid for that component
//example - inside material ui if you have table and tbody they are compound components which build on top of each other
//example:
//want to make it so when we click the label the checkbox gets clicked and vis verca
import React from 'react';

const Checkbox = ({children}) => {
  //React.Children is a utilit function that allows us to iterate over every child in parent element with map method that the Children object contains
  //we want to use React.Children inside the parent element which here is the Checkbox
  //this allows us to pass prop to child - here we are passing toggle() function to Label component by overriding props with React.children
  //the objects that are returned are JSX elements
  const allChildren = React.Children.map(children, (child) => {//takes children as what we are going to iterate over
    child.prop.hello = 'Hello World!' //here we can over ride the current childs prop - this won't work because internally React does not let us change props like this
    // console.log(child) to checkout object returned
    /*real pattern starts here...*/
    const [checked, setChecked] = useState(true);
    const clone = React.cloneElement(child, {
      checked, //so instead here we are cloning the child element and as the second argument we are passing props component should accept
      setChecked //so instead here we are cloning the child element and as the second argument we are passing props component should accept
    }); 
    return clone;
  })
  return allChildren; //now we have access to the hello prop in all children components without explicitly passing it to those components - 
}

const CheckboxInput = ({checked, setChecked}) => { //now we have access to prop hello in both components
  return <input type="checkbox" checked={checked} onChange={(event) =>  {setChecked(event.target.checked)}} /> //using checked property of target element
}

const Label = ({toggle, children, checked, setChecked}) => { //now we have access to prop hello in both components
  return <label onClick={() => {setChecked((state) => {!state})}}>{children}</label> //we pass setChecked an arrow function which gives us access to the current 'check' state which we are calling 'state' here - from here we can toggle that 'check' state
}

function App() {

  return (
    <CheckBox>
      <CheckboxInput />
      <Label>Checkbox Label</Label>
    </CheckBox>
  )
}
// 4) Compound Components - DOM Elements
// for basic understanding see previous notes from #3) Compound Components
import React from 'react';

const Checkbox = ({children}) => {
  const allChildren = React.Children.map(children, (child) => {

    if(typeof child.type === 'string') { // this allows us to pass in any normal dom element - we can go further by making sure it is a string as we will know it is a dom element
      // we can whitelist lements which we allow - lets do if(child.type !== Label) this will point to the same function in memory so we can point to the same rf sinc thy ar outside component they are not being created over and over again
      // this is not our element to manipulate
      throw new Error(`<${child.type} /> DOM element is not allowed inside) <Checkbox /> component`) // the other option we have is to remove error as it will ignore those dom elements
    }
    const [checked, setChecked] = useState(true);
    const clone = React.cloneElement(child, {
      checked,
      setChecked
    }); 
    return clone;
  })
  return allChildren;
}

const CheckboxInput = ({checked, setChecked}) => {
  return <input type="checkbox" checked={checked} onChange={(event) =>  {setChecked(event.target.checked)}} /> 
}

const Label = ({toggle, children, checked, setChecked}) => {
  return <label onClick={() => {setChecked((state) => {!state})}}>{children}</label>
}

function App() { //we cannot add normal elements as children as we try below

  return (
    <CheckBox>
      <CheckboxInput />
      <Label>Checkbox Label</Label>
      <br />
    </CheckBox>
  )
}
// 5) Compound Components - Prevent users from using components individually 
import React from 'react';

const Checkbox = ({children}) => {
  const allChildren = React.Children.map(children, (child) => {

    if(typeof child.type !== Label && child.type !== CheckboxInput) {
      throw new Error('No custom element supported') // the other option we have is to remove error as it will ignore those dom elements
    }
    const [checked, setChecked] = useState(true);
    const clone = React.cloneElement(child, {
      checked,
      setChecked
    }); 
    return clone;
  })
  return allChildren;
}

const CheckboxInput = ({checked, setChecked}) => {
  return <input type="checkbox" checked={checked} onChange={(event) =>  {setChecked(event.target.checked)}} /> 
}

const Label = ({toggle, children, checked, setChecked}) => {
  return <label onClick={() => {setChecked((state) => {!state})}}>{children}</label>
}

function App() {

  return (
      <Label>Checkbox Label</Label>
  )
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*REACT FLOW & LIFECYCLE*/
/////////////////////////
//First when it is first mounted first being rendered we are running our lazy initializers
//Next we are going to run the rest of our render function where that useState resides
//Next we are updating the dom and we are creating our elements
//Next we use layout effects
//Next React stops running, React says we updated the DOM and then the browser paints those DOM updates - this is the time between when we add classes or styles and when the user sees those changes (this is called painting the screen)
//Next we run effects (updating local storage or whatever)
//////////////////////////////////////////////////////////
//Next when we get a state update we run an update (rerender)
//We DONT run lazy initializers
//We run the contents of the component functions (render phase)
//React updates DOM again
//Next we run clean up phase for LayoutEffects
//Next we run layout effects
//Next we paint the screen
//Next we run cleanup effects for useEffect
//Next we run effects
//--> this loops until the component gets removed from screen
//////////////////////////////////////////////////////////
//After component gets removed from screen we run all our cleanup effects for LayoutEffects and useEffects
//////////////////////////////////////////////////////////
/*NOTE any children components will start their mount process AFTER the current component has finished its RENDER stage*/
/*NOTE The virtual dom checks for differences in its nodes and will repaint nodes that have changed*/
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