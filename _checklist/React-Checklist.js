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

//uuid library for unique ids
//install with npm i uuid
//Example
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*HTTP Request*/
////////////////
//Inside App.js
//You cannot return anything other than the cleanup function in useEffect (can't make the callback function provided to use effect asynchrnous)
/*
function ExampleComponent({url}) {
  useEffect(() => fetchData(url), [url]);
  return (<div></div>);
}

Considering url in the depndency list and reasoning for having it there...

1) That URL never changes, and the effect should only run once - GOOD.
2) That URL is changing but you only wanted it to query the first time - BAD.
3) That URL is changing, and you want it to query every time it does - GOOD.

For number 1, if the URL never changes going into the prop after the first time, then it’s already working correctly.
The URL is the dependency, and that dependency is not intended to change.
If for some reason, it does change, you are going to see that error much faster this way, whereas passing an empty array to the dependency array is going to “hide” this bug from you.

For number 3, this is what the dependency array is built for.
Each time that URL changes, the effect will be rerun, and you don’t need to set up any complex logic to keep it tied to the component like we had to do at the start of the article.

So the only real issue is number 2. But when you stop and think about it, there seems to be a more significant issue to the way you are constructing your components in this example.
You want data to come in, but that data is only representational of one instance of your component.
If someone were to take a snapshot of your component later on, and pass those inputs to a new component, you would not get the same output.

Our example does not have the referential transparency we want from our components.
We should expect that given a set of input, we always receive the same output.
And our goal should be that these components should be callable at any time.
So I highly encourage that if you are hitting the number 2 outcome, you should rethink your component through.

*/

//If you want to use async/await, the best way to do that is like so:
React.useEffect(() => {
  async function effect() {
    const result = await doSomeAsyncThing()
    // do something with the result
  }
  effect()
}) 
//OR
React.useEffect(() => {
  doSomeAsyncThing().then(result => {
    // do something with the result
  })
})
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
    /*Handling Errors*/
    //We have 2 options for handling errors
    // option 1: using .catch
      fetchPokemon(pokemonName)
      .then(pokemon => setPokemon(pokemon))
      .catch(error => setError(error))

      // option 2: using the second argument to .then
      fetchPokemon(pokemonName).then(
      pokemon => setPokemon(pokemon),
      error => setError(error),
      )
/*
  These are functionally equivalent for our purposes, but they are semantically different in general.
  Using .catch means that you’ll handle an error in the fetchPokemon promise, but you’ll also handle an error in the setPokemon(pokemon) call as well. This is due to the semantics of how promises work.
  Using the second argument to .then means that you will catch an error that happens in fetchPokemon only.
  In this case, I knew that calling setPokemon would not throw an error (React handles errors and we have an API to catch those which we’ll use later), so I decided to go with the second argument option.
  However, in this situation, it doesn’t really make much of a difference. If you want to go with the safe option, then opt for .catch.
*/
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
/*useEffect W/ Functions*/
/////////////////////////
////////////////////////////////////////
// #1: Move the function into the effect
// Usecase: This fetchData call is only ever used in this local useEffect.
/* If you plan on ever only using this function in this single useEffect, the most straightforward and suggested solution is to move the function directly into the effect closure.
This works for everything we discussed previous, and it ensures that our effect function itself is as pure and referentially transparent as possible.
It encapsulates the logic to one area and also lets developers know this function is intended as a side effect. So what does that look like
*/
function ExampleComponent({url}) {
  useEffect(() => {
    const fetchData = (url) => {
	  // fetch call here
	  }

    fetchData(url)
  }, [url]);
  return (<div></div>);
}
//Since the fetchData function is now part of our effect, it is no longer a dependency of our effect, and we can simply remove it from the dependency array.
////////////////////////////////////////////////////
//Approach #2: Memoize the function with useCallback
//Usecase: This function is used in multiple local hooks or is going to be passed down in a child component
/*useCallback is one of the new hooks available to React. 
It allows us to memoize a function so that on subsequent updates of the component, the function keeps its referential equality, and therefore does not trigger the effect.
useCallbacks use the same dependency array that a useEffect does, so if the values or functions it depends on change, it will be reinitialized.*/
/* Knowing that we can store the reference to a spot in memory for a given function, we can pass that reference into a dependency array of a useEffect. 
If the component is rerendered, and that function is not pointing to the same spot in memory (even if it’s the same function and parameters), 
the useEffect will be called again because it sees it as a new function. 
If we can memoize (remember) the function reference, that means we can stop the useEffect from rerunning unless it truly has changed. Let’s see what that looks like.
////////////////////
If you are only going to do a single use of the function, I recommend moving the logic in like below, but this pattern is handy when you need to pass the function into multiple useEffects.
You’ll find useCallback even handier when passing functions down into child components. If we don’t use this pattern, the child component will rerender every update, even if it is memoized. 
That’s because the function will never have the same referential equality to the previous render. 
Even more, if that child component has any hooks dependent on that function, the will be recalled every time. 
For that reason, it’s always a good bet to build your functions that are being passed to child components with useCallback.*/
function ExampleComponent({url}) {
	const fetchData = useCallback(() => {
	  // fetch call here
	}, [url]);
	
  useEffect(() => fetchData(), [fetchData]);
  return (<div></div>);
}
/*
Note: This does not mean you should build every function with useCallback. It’s only crucial if it is being passed to child components. 
Memoizing local functions calls can often add unnecessary overhead and complexity to your code.

So, we know that if we are using our functions in a dependency array, we should memoize them by wrapping this in a useEffect.
If we don’t do this, the effect will rerun after every update of the component.
So then, why in the original example of the useEffect did I now do that with the setData function?
*/

export function CatFacts({ id }) {
  const [data, setData] = useState();
  useEffect(() => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://cat-fact.herokuapp.com/facts/${id}`;
    fetch(proxyUrl + targetUrl)
      .then(response => response.json())
      .then(facts => {
        setData(facts.text);
      });
  }, [id, setData]);

  return <div>Cat Fact: {data}</div>;

/*That’s because the function returned in the useState hook is already memoized for you. The same goes for useReducer. 
And this sets up a fundamental design principle for you as a developer moving forward as you create your hooks. 
If you are returning a function from your hook, it’s highly likely you want that function memoized, so that developers can use them without the extra overhead of handling them.*/
//Last Example
//Link - https://codesandbox.io/s/useeffectwithandwithoutcallback-t3gff
function App() {
  const [index, setIndex] = useState(0);
  const notMemoized = () => {
    console.log("Rendered no callback");
  };

  const memoized = useCallback(() => console.log("Rendered callback"), []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <DemoEffect dep={notMemoized} />
      <DemoEffect dep={memoized} />
      <button onClick={() => setIndex(index + 1)}>Rerender</button>
    </div>
  );
}

function DemoEffect({ dep }) {
  useEffect(() => dep(), [dep]);
  return <div>Demo Effect</div>;
}
//////////////////////////////////////////
//Approach #3: Import the function instead
/*The last style we can use for our fetchData function actually moves it outside of the component itself. 
This is a style that isn’t often talked about as much as the prior two, but, depending on what it does, can often be my favourite. 
This style does need for you to use the ESM import style in your modules, and not the CJS style.

Note: Without going too into detail, this is because import statements are going to give us a single instance of a function that cannot be mutated, 
whereas an exported module with CJS can be mutated. This is also why ESM is statically analyzable. If you do want to read more about this, 
modules are talked about quite frequently in be Reducing JS Bundle Size series.*/

//In the example above, this could look something like this:

import { fetchData } from './utils';

export function CatFacts({ id }) {
  const [data, setData] = useState();
  useEffect(() => {
   fetchData(id, setData)
  }, [id, setData]);

  return <div>Cat Fact: {data}</div>;

/*Because the module cannot be mutated, we don’t have to specify the function in our dependency array, as it’s not possible for it to change. 
Now, you can still place the function in the dependency array, but even the ESLint won’t force you to do this. So why is this better? 
Just to avoid putting the function in the dependency array?

The biggest reason I often will split out my functions into utils functions like this is to increase the testability of it. 
Sometimes I will have some complex logic in my useEffect that I would like to test individually. Now, there are ways to test hooks, but they are a lot more challenging to do. 
I also find that splitting these chunks of code into named functions increases the readability of my code, so it often is more helpful to do this already, 
and moving it to a new module gives me better testing for free.

Last, when we do this, it also makes it easier to mock the side effects of that effect when we are doing integration testing of that component. 
In this example, we’ve split out the actual async “fetch” side effect. We could mock the fetchData method, and instead, 
just call the setData argument to be filled with what data we want to test against.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*HTTP Request - Maintaining State in an Object*/
////////////////////////////////////////////////
//When making HTTP Requests its best to use a 'status' to indicate where we are in deciding what to render
//Here it is easier to maintain all state in an object instead of chaining updates to state
import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: 'resolved', pokemon})
      },
      error => {
        setState({status: 'rejected', error})
      },
    )
  }, [])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    return (
      <div>
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Error Boundaries*/
///////////////////
//Use the react-error-boundary library for error boundaries
//Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
//Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
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
/*Lifting State*/
////////////////
//Lifting state meants finding the lowest common parent shared between the two components and placing the state management there, and then passing the state and a mechanism for updating that state down into the components that need it.
//We can pass the callback function two ways - passing an anonymous function as the prop OR passing the fallback and calling the callback with an anonmyous function within the child
//Colocation (having state inside the only component that needs it or the lowest common parent) is great because only the loest child component will have to rerender whenever state changes
import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  )
}

export default App
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
/*useLayoutEffect Hook*/
//////////////////////
//sometimes there is a janky experience with an app or visual element because when using useEffect there’s a gap between the time that the DOM is visually updated and our code runs
//this is when you use useLayoutEffect!
//useLayouEffect runs its effects before react paints the screen
//here’s the simple rule for when you should use useLayoutEffect: If you are making observable changes to the DOM, then it should happen in useLayoutEffect, otherwise useEffect.
//99% of the time useEffect is what you want, but sometimes useLayoutEffect can improve your user experience.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useReducer Hook*/
/////////////////
//if you have multiple elements of state that typically change together, then having an object that contains those elements of state can be quite helpful.
//typically, you’ll use useReducer with an object of state, but we’re going to start by managing a single number (a count).
//One important thing to note here is that the reducer (called nameReducer above) is called with two arguments:
//1) the current state which here is count
//2) whatever it is that the dispatch function is called with. This is often called an “action.”
//example:
const countReducer = (state, newState) => newState //since newState is the only thing returned this will be what count updates to

function Counter({initialCount = 0, step = 1}) {
  const [count, setCount] = React.useReducer(countReducer, initialCount)
  const increment = () => setCount(count + step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App

//another example showing you can pass anything as your action:
import * as React from 'react'
function Counter({initialCount = 0, step = 1}) {
  function countReducer(count, step) {//notice the step 'action' and the 'count' as the current state
    return count + step
  }
  const [count, changeCount] = React.useReducer(countReducer, initialCount)//changeCount is the name of the updater we will use while countReducer is the name of the reducer!!
  const increment = () => changeCount(step)//action is provided to the changeCount reducer
  return <button onClick={increment}>{count}</button>//onClick we are calling our action - convtion like 'changeMyVar'
}
function App() {
  return <Counter />
}
export default App

//another example using conventions state and action (reduxish)
import * as React from 'react'

const countReducer = (state, action) => ({...state, ...action})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => setState({count: count + step})
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App

//another example supporting a function passed to setState AND an object
import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  function countReducer(state, newState) {
    //newState can be a function or an object, but if its a function we need to treat it the same way we defined it as the arg to setState
    if (typeof newState === 'function') {
      return newState(state) //state represents currentState within the setState function - we need to pass it an argument for it to work since that is how we define the function in setState
    } else {
      return {...state, ...newState}
    }
  }

  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount, //notice there is always an initialized argument to our components!!!
  })
  const {count} = state //plucking off count from initial state
  const increment = () =>
    setState(currentState => ({count: currentState.count + step})) //notice we are passing a callback as an arguement to our updater function - we will need to pass the same arguments we expect here into the function within the reducer
  //the effects of this are the same as in our normal useState hook, except this entire callback will be passed to the reducer
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

//same as above but Kent C Dodds version way cleaner
import * as React from 'react'

const countReducer = (state, action) => ({
  ...state,
  ...(typeof action === 'function' ? action(state) : action),
})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () =>
    setState(currentState => ({count: currentState.count + step}))
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App

//traditional dispatch object with a type and switch statement
import * as React from 'react'

function countReducer(state, action) {//can also destructure our vars here as well by replacing action with {type, step}
  //count pluck count here with {count} = state
  const {type, step} = action//destructure out vars here
  switch (type) {
    case 'increment': {
      return {
        ...state,//we dont destructure count from state in args of countReducer because we end up needing the entire state variable
        count: state.count + step,
      }
    }
    default: {
      throw new Error(`Unsupported action type: ${type}`) //great to have default fall back to unsupported action type incase people make errors
    }
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => dispatch({type: 'increment', step})//by adding the step to our initial state we have made the step configurable! consider doing this for other vars for more flexibility
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App

//last example with lazy intialization
//if you pass a third function argument to useReducer, it passes the second argument to that function and uses the return value for the initial state.
//this could be useful if our init function read into localStorage or something else that we wouldn’t want happening every re-render.
function init(initialStateFromProps) {
  return {
    pokemon: null,
    loading: false,
    error: null,
  }
}

// ...

const [state, dispatch] = React.useReducer(reducer, props.initialState, init)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useRef Hook - useContext*/
///////////////////////////
//Sharing state between components is a common problem. The best solution for this is to 📜 lift your state. This requires 📜 prop drilling which is not a problem, but there are some times where prop drilling can cause a real pain.
//To avoid this pain, we can insert some state into a section of our react tree, and then extract that state anywhere within that react tree without having to explicitly pass it everywhere.
//This feature is called context. In some ways it’s like global variables, but it doesn’t suffer from the same problems (and maintainability nightmares) of global variables thanks to how the API works to make the relationships explicit.
//Keep in mind that while context makes sharing state easy, it’s not the only solution to Prop Drilling pains and it’s not necessarily the best solution either. 
//React’s composition model is powerful and can be used to avoid issues with prop drilling as well.
//Read here for more: https://twitter.com/mjackson/status/1195495535483817984
//Example
//<FooDisplay /> could appear anywhere in the render tree, and it will have access to the value which is passed by the FooContext.Provider component.
import * as React from 'react'

//Need our contenxt component in order to initiailze context to a useContext hook and use it as a wrapper in which you pass your value/state to which will be assigned to the variable you assigned to useContext
const FooContext = React.createContext()

function FooDisplay() {
  const foo = React.useContext(FooContext)//here you are assigning the value/state you pass the wrapper to a var in your component
  return <div>Foo is: {foo}</div>
}

ReactDOM.render(
  <FooContext.Provider value="I am foo">
    <FooDisplay />
  </FooContext.Provider>,
  document.getElementById('root'),
)
// renders <div>Foo is: I am foo</div>

//another example more context no pun

import * as React from 'react'

const CountContext = React.createContext()//define context sort of like a global state with convention MyVarContext or MyStateContext

function CountProvider(props) {//create the Provider component with same convention MyVarProvider or MyStateProvider
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]//want the value to be whatever is shared among both components that need either or both the count and setCount
  // could also do it like this:
  // const value = React.useState(0)
  return <CountContext.Provider value={value} {...props} />//return the component with MyVarContext.Provider or MyStateContext.Provider (use the context component you created above and pass any your value and props)
  //also may provide all other props you want to define inline when using the <CountProvider example={0}  example2={'foo'} /> component
}

function CountDisplay() {
  const [count] = React.useContext(CountContext)//here we have access to the context value passed into value which we destructure as we passed [count,setCount]
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = React.useContext(CountContext)//here we leave the first destructure null but pluck off setCount as its the second argument passed to value [count, setCount] which we provided in the CountProvider component
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>{/*Here we wrap our components using the value coming from CountProvider with the CountProvider component that uses the CountContext we created with CountContext.createContext()*/}
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App

//another version with custom hook and error handling
//we can put useCount() and CountProvider() in its own module and import it below as import {CountProvider, useCount} from '../context/count-context'
//here we create a custom hook that abstracts the [count, setCount] values and also handles error handling all in on custom hook (think of useCount as the value returned from provider)
//if the component we are using this in is not within the CountProvider it won't work and will throw an error
import * as React from 'react'

//SHOULD BE IN OWN MODULE
const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return <CountContext.Provider value={value} {...props} />
}

function useCount() {
  const context = React.useContext(CountContext) //getting value from provider
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context //returning value from provider
}
//END SHOULD BE IN OWN MODULE

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App

//another example - larger more realy world - cache
import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'
import {useAsync} from '../utils'

// 🐨 Create a PokemonCacheContext
const PokemonCacheContext = React.createContext()
// 🐨 create a PokemonCacheProvider function
function PokemonCacheProvider(props) {
  function pokemonCacheReducer(state, action) {
    switch (action.type) {
      case 'ADD_POKEMON': {
        return {...state, [action.pokemonName]: action.pokemonData}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  const value = [cache, dispatch]
  return <PokemonCacheContext value={value} {...props} />
}

function PokemonInfo({pokemonName}) {
  const [cache, dispatch] = React.useContext(PokemonCacheContext)
  const {data: pokemon, status, error, run, setData} = useAsync()
  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName])
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData})
          return pokemonData
        }),
      )
    }
  }, [cache, pokemonName, run, setData])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function PreviousPokemon({onSelect}) {
  // 🐨 get the cache from useContext with PokemonCacheContext
  const cache = React.useContext(PokemonCacheContext)
  return (
    <div>
      Previous Pokemon
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName} style={{margin: '4px auto'}}>
            <button
              style={{width: '100%'}}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PokemonSection({onSelect, pokemonName}) {
  // 🐨 wrap this in the PokemonCacheProvider so the PreviousPokemon
  // and PokemonInfo components have access to that context.
  return (
    <PokemonCacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info" style={{marginLeft: 10}}>
          <PokemonErrorBoundary
            onReset={() => onSelect('')}
            resetKeys={[pokemonName]}
          >
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
    </PokemonCacheProvider>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  )
}

export default App
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useRef Hook - DOM Element Access*/
///////////////////////////////////
//For refs on the DOM we want to use the useRef variable inside a useEffect
//Remember that when you do: <div>hi</div> that’s actually syntactic sugar for a React.createElement so you don’t actually have access to DOM nodes in your function component.
//In fact, DOM nodes aren’t created at all until the ReactDOM.render method is called. 
//Your function component is really just responsible for creating and returning React Elements and has nothing to do with the DOM in particular.
//To get access to the DOM, you need to ask React to give you access to a particular DOM node when it renders your component. The way this happens is through a special prop called ref.
//After the component has been rendered, it’s considered “mounted.” That’s when the React.useEffect callback is called and so by that point, the ref should have its current property set to the DOM node.
//So often you’ll do direct DOM interactions/manipulations in the useEffect callback.
//most of the time we don't want to hook into dom element by manipulating dom directly with document.getElementById or something
//ref is an object that stays consistent between renders of your React component. It has a current property on it which can be updated to any value at any time. 
//In the case of interacting with DOM nodes, you can pass a ref to a React element and React will set the current property to the DOM node that’s rendered.
//we need to make sure we are using the ref.current.value (current is important)
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
/*useMemo*/
//////////
//When you update state in react our entire component gets rerendered
//useMemo comes in handy if the arguments for a slow function we are using does not change
//if we don't want to rerun a function for updating a piece of state it does not depend on we use useMemo
//the drawback is useMemo gets called every single time and we need to store stuff in memory - only use it for the performance benefits
//useMemo takes a function and it is going to return the return value of that function
//useCallback takes a function and reutrns the entire function vs the return function of that function which allows us to give the function parameters
export default function App() {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number]) //whenever number changes we want to recalculate our function but if not we don't

  const themeStyles = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black'
  }

  return (
    <>
    <input type='number' value={number} onChange={e => setNumber(parseInt(e.target.value))} />
    <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
    <div style={themeStyles}>{doubleNumber}</div>
    </>
  )
}

function slowFunction(num) {
  console.log('Calling Slow Function')
  for (let i = 0; i <= 100000000000000; i++) {}
  return num * 2;
}

////////////////////////////////////////
//second use case - referential equality
//useMemo takes a function and it is going to return the return value of that function
//useCallback takes a function and reutrns the entire function vs the return function of that function which allows us to give the function parameters
export default function App() {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number]) //whenever number changes we want to recalculate our function but if not we don't

  //Here we use useMemo to ensure that unless the dark variable doesn't change we will not change themeStyles which will prevent a rerender in useEffect
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'
    }
  }, [dark])
//each render will create a new themeStyles for a function or object such as themeStyles in this case
useEffect(() => {
  console.log(themeStyles)
}, [themeStyles])

  return (
    <>
    <input type='number' value={number} onChange={e => setNumber(parseInt(e.target.value))} />
    <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
    <div style={themeStyles}>{doubleNumber}</div>
    </>
  )
}

function slowFunction(num) {
  console.log('Calling Slow Function')
  for (let i = 0; i <= 100000000000000; i++) {}
  return num * 2;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useCallback Simple*/
/////////////////////
//useMemo takes a function and it is going to return the return value of that function
//useCallback takes a function and reutrns the entire function vs the return function of that function which allows us to give the function parameters
//We want to useCallback for referential equiality issues similar to useMemo which will only happen when using some other hook with dependency issues
export default function App() {
  const [number, setNumber] = useState(1)
  const [dark, setDark] = useState(false)

  const getItems = useCallback((incrementor) => {
    return [number + incrementor, number + 1 + incrementor, number + 2 + incrementor]
  }, [number])

  const theme = {
    backgroundColor: dark ? '#333' : '#FFF',
    color: dark ? '#FFF' : '#333'
  }

  return (
    <div style={theme}>
      <input 
      type="number"
      value={number}
      onChange={e => setNumber(parseInt(e.target.value))} 
      />
      <button onClick={() => setDark(prevDark => !prevDark)}>
        Toggle Theme
      </button>
      <List getItems={getItems} />
    </div>
  )

}

//List.js
//notice here we can pass parameters to getItems
export default function List({getItems}) {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(getItems(1))
    console.log('Updating Items')
  }, [getItems])

  return items.map(item => <div key={item}>{item}</div>)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*useCallback W/ Custom Hooks*/
//////////////////////////////
//Memoization is actually a specific type of caching
//While caching can refer in general to any storing technique (like HTTP caching) for future use, memoizing specifically involves caching the return values of a function
//useCallback returns an entire function passed to it while useMemo only returns the value provided by the function it is given
//We want to use useCallback if we don't want our component to rerender our component resulting in the rerender of children (basically if we have referential equality problems where we use another hook where that function value is inside the depency array) or other components OR if creating a function is really expensive
//For example if we have a getItems function inside our component which a is being passed to a child, but also have a [darkTheme, setDarkTheme] state and setter inside that same component we don't want the child to rerender just because the darkTheme changes
//This can be avoided via useCallback
//Simple Example of Memoization:
const values = {}
function addOne(num: number) {
  if (values[num] === undefined) {
    values[num] = num + 1 // <-- here's the computation
  }
  return values[num]
}
//One other aspect of memoization is value referential equality. For example:
const dog1 = new Dog('sam')
const dog2 = new Dog('sam')
console.log(dog1 === dog2) // false
//Even though those two dogs have the same name, they are not the same. However, we can use memoization to get the same dog:
const dogs = {}
function getDog(name: string) {
  if (dogs[name] === undefined) {
    dogs[name] = new Dog(name)
  }
  return dogs[name]
}
const dog1 = getDog('sam')
const dog2 = getDog('sam')
console.log(dog1 === dog2) // true
//Memoization in React: read more here - https://epicreact.dev/memoization-and-react
//In react we have two options for memozation: useMemo and useCallback.
//If we are using a function in our callback that needs to be added to our dependency list, then we use one of these instead of useEffect
//Example
const updateLocalStorage = () => window.localStorage.setItem('count', count)
React.useEffect(() => {
  updateLocalStorage()
}, [updateLocalStorage]) // <-- function as a dependency
//We cant use useEffect because updateLocalStorage is defined inside the component function body. So it’s re-initialized every render. 
//Which means it’s brand new every render. Which means it changes every render. Which means an infinite loop!
//This is where useCallback comes in
const updateLocalStorage = React.useCallback(
  () => window.localStorage.setItem('count', count),
  [count], // <-- yup! That's a dependency list!
)
React.useEffect(() => {
  updateLocalStorage()
}, [updateLocalStorage])
//What that does is we pass React a function and React gives that same function back to us
//if the elements in the dependency list are unchanged, instead of giving the same function back that we give to it, React will give us the same function it gave us last time
//example - this is not how React actually implements this function. We're just imagining!
let lastCallback
function useCallback(callback, deps) {
  if (depsChanged(deps)) {
    lastCallback = callback
    return callback
  } else {
    return lastCallback
  }
}
//lastly useCallback is just a shortcut to using useMemo for functions:
// the useMemo version:
const updateLocalStorage = React.useMemo(
  // useCallback saves us from this annoying double-arrow function thing:
  () => () => window.localStorage.setItem('count', count),
  [count],
)

// the useCallback version
const updateLocalStorage = React.useCallback(
  () => window.localStorage.setItem('count', count),
  [count],
)

//real memoized example without useCallback....
import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(asyncCallback, initialState, dependencies) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  React.useEffect(() => {
    const promise = asyncCallback()
    if (!promise) {
      return
    }
    dispatch({type: 'pending'})
    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
    // too bad the eslint plugin can't statically analyze this :-(
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return state
}

function PokemonInfo({pokemonName}) {
  const state = useAsync(
    () => {
      if (!pokemonName) {
        return
      }
      return fetchPokemon(pokemonName)
    },
    {status: pokemonName ? 'pending' : 'idle'},
    [pokemonName],
  )

  const {data: pokemon, status, error} = state

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox

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