//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*WHY TEST ?*/
/////////////
//Check if app behaves as expected, safeguard against unwanted behavior when changes maxHeaderSize, automated and efficient in the long term.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Are All Use Cases Accounted For?*/
///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Do All Use Cases Have Unit Tests, E2E Testing, DOM Testing?*/
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Use Typescript or Type Validation*/
////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Use Prop Type Validation*/
///////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Accessibility*/
////////////////
//Make sure you are using aria-labels and roles properly
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Form Validation*/
//////////////////
//File types
//File min size and max size
//Input types
//Min and max string length
//Min and max int size
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Consider All Dependencies.*/
//////////////////////////////
//We don't want dependencies shifting around.
//The * indicates you use the latest version of a dependency and that you keep up with latest versions
//This assumes you religiously unit test the code
//This assumes you that your deploy does not require its own npm install
//This assumes that you block deploys when integration tests fail
//This assumes that you have a process in place so that you don't break your production deployment if something changes
{
    "name": "gueslist",
    "version": "0.1.0",
    "author": "eric elliot",
    "description": "A handy tool for bouncers",
    "keywords": ["party", "gueslist"],
    "main": "dist/app.js",
    "scripts" {
        "test": "grunt test"
    },
    "devDepencies": {
        "traverse" : "*",
        "grunt" : "*",
        "grunt-browserify" : "*",
        "browserify" : "*",
    },
    "engines": {
        "node": ">0.6"
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Test Driven Development Setup*/
////////////////
//Create test before writing your actual code
//Write a failing test before writing implementation logic (don't event need to load anything on browser initially)
//Install JEST - for testing inside React Applications while using 'npx create-react-app my-app' Jest and react-testing-library comes with React so we need to only add react-test-renderer for rendering snapshots
//Run:
//If we are using yarn.... npm i -g yarn
npm i --save-dev react-test-renderer //or yarn add --dev react-test-renderer
npm i -D --exact jest-watch-typeahead@0.6.5 //You need to install specifically v0.6.5 of jest-watch-typeahead
//Install ENZYME
//You will need to install enzyme along with an Adapter corresponding to the version of react (e.g. if you are using enzyme with React 16, you can run):
//Run:
npm i --save-dev enzyme enzyme-adapter-react-16 //or yarn add --dev enzyme 
//Install Testing Playground
//Install 'Testing Playground' chrome extension - open extension and click on select element icon and when you hover over elements it gives you a suggested query (we want a getByRole or highest priority query)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*What to test?*/
/////////////////
/*Test High Value Features (Most Important Features)*/
/*Test Edge Cases in High Value Features (how can they break a form or the UI? test for errors that should throw graceful error messages)*/
/*Things that are EASY to break*/
/*Basic React Component Testing
  ---> User Interactions
  ---> Conditional Rendering
  ---> Uils / Hooks*/
/*DONT TEST Implementation Details (a decision that is left to be made by the developers, and is not specified at an earlier level (such as a requirement document or, depending on context, an architectural document))
  ---> Changes for variables and state (etc)*/
/*Testing from Bottom of LIST UP: Unit --> Integration --> E2E*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Testing Priorities*/
//Use screen.getByRole('') to find an accessible element with this string, can use this to see what roles are available in each element (text-box, button, etc)
//See https://testing-library.com/docs/queries/about/#priority
//The point is to mimic the user interaction as much as possible within our tests
//Accessible by Everyone
getByRole
getByLabelText //good for forms
getByPlaceholderText
getByText
//Semantic Queries - users wont be seeing but they can be read by screen readers
getByAltText
getByTitle
//Test ID - users will never see the test id or find elements by test id
getByTestId
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Triple A's of Testing*/
//ARRANGE --> ACT --> ASSERT Testing Pattern
//First phase of test we are arranging things (rendering component)
//Second phase we are acting the user is typing, clicking, interacting
//Third phase we are asserting where we are going to make our assertions
//emulate a user event (here we are typing into a input field)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Jest - Basic Use Case*/
import react from 'react';
import {render} from "@testing-library/react"
import App from "./App";

describe('Counter Testing', () => { //describe will combine related tests into one block
  test('renders the title of counter', () => { //say what the test will be
    const { getByText } = render(<App />); //this getByText function will grab this component as text
    const linkElement = getByText('This is counter app'); //getByText will find 'This is counter app' within the component
    expect(linkElement).toBeInTheDocument();
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*USEFUL SELECTORS*/
//screen looks in the dom/component we render and gives us a bunch of methods to get certain elements that we want from the component we render
it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
})

//common selectors
getBy(); //returns one match - error if none or more than one found - cannot use async
findBy(); //returns one match - error if none or more than one found - can use async
queryBy(); //returns one match - returns null if none found - error if more than one found - cannot use async
getAllBy(); //returns array if one or more found - error if none found - cannot use async
findAllBy(); //returns array if one or more found - error if none found - can use async
queryAllBy(); //returns array if one or more found - cannot use async

//Examples
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe("Header", () => {
    it('should render same text passed into title prop', () => {
        render(
            <Header 
              title="todo"
            />
        );
        const h1Element = screen.getByText(/todo/i);
        expect(h1Element).toBeInTheDocument();
    });
})

it('should render same text passed into title prop', () => {
    render(
        <Header 
          title="todo"
        />
    );
    const h1Element = screen.getByRole("heading");
    expect(h1Element).toBeInTheDocument();
});

it('should render same text passed into title prop', () => {
    render(
        <Header 
          title="todo"
        />
    );
    const h1Element = screen.getByRole("heading", { name: /todo/i });
    expect(h1Element).toBeInTheDocument();
});

it('should render same text passed into title prop', () => {
    render(
        <Header 
          title="todo"
        />
    );
    const h1Element = screen.getByTitle("Header");
    expect(h1Element).toBeInTheDocument();
});

it('should render same text passed into title prop', () => {
    render(
        <Header 
          title="todo"
        />
    );
    const h2Element = screen.getByTestId("header-2");
    expect(h2Element).toBeInTheDocument();
});

// // WITH FINDBY

it('should render same text passed into title prop', async () => {
    render(
        <Header 
          title="todo"
        />
    );
    const h1Element = await screen.findByText(/todo/i);
    expect(h1Element).toBeInTheDocument();
});

// // WITH QUERYBY

it('should render same text passed into title prop', () => {
    render(
        <Header 
          title="todo"
        />
    );
    const h1Element = screen.queryByText(/dogs/i);
    expect(h1Element).not.toBeInTheDocument
});

// // WITH GETALLBY

it('should render same text passed into title prop', () => {
    render(
        <Header 
          title="todo"
        />
    );
    const h1Elements = screen.getAllByText(/todo/i);
    expect(h1Elements.length).toBe(1);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*UNIT TESTS - Common Testing Functions and Practices*/
//Testing small parts of the code
//Testing a function
//Priorities - https://testing-library.com/docs/queries/about/#priority
//We want to prioritize using getByRole(), but if using form elements we want to getByLabelText()
//If there is no label in the form we can use getByLabelText
screen.debug() //esentially console.logs the body
screen.getByRole('') //finds an accessible element with this string, can use this to see what roles are available in each element (text-box, button, etc)
expect(screen.getByRole('button', {name: /pay/i}).toBeDisabled()); //will look for a button with the name with pay that is enabled (case insensitive search)
/*Basic Test*/
import userEvent from "@testing-library/user-event";
test('on initial render, the pay button is disabled', () => {
  render(<TransactionCreateStepTwo sender={{ id: '5'}} receiver={{ id: '5'}}/>) //can throw in props if the component expects props
  expect(screen.getByRole('button', {name: /pay/i}).toBeDisabled()); //will look for a button with the name with pay that is disabled (case insensitive search)
})
/*Waiting for Elements to Load - Deeper Dive Unit Tests*/
//When using Async Await to find an element we need to use the findByRole() function instead of getByRole function
//Here our button is enabled for a fraction of a second which gives our test false positives
import userEvent from "@testing-library/user-event";
test('on initial render, the pay button is disabled', async () => {
  render(<TransactionCreateStepTwo sender={{ id: '5'}} receiver={{ id: '5'}}/>) //can throw in props if the component expects props
  expect(await screen.findByRole('button', {name: /pay/i}).toBeDisabled()); //will look for a button with the name with pay that is disabled (case insensitive search)
})
test('if an amount and note is entered, the pay button is enabled', () => {
  render(<TransactionCreateStepTwo sender={{ id: '5'}} receiver={{ id: '5'}}/>)
  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/note/i), "This is a note");
  expect(await screen.findByRole('button', {name: /pay/i}).toBeEnabled()); //will look for a button with the name with pay that is enabled (case insensitive search)
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*INTEGRATION TESTS - Testing Functions and Practices*/
//Testing that multiple units in application are working correctly together*/
//Combining multiple unit test together*/
//Think about REALISTIC user flows
/*
--> Arrange ('render component')
--> Act ('user types something in')
--> Assert ('make assertion')
--> Act ('user types something else')
--> Assert ('make another assertion')
--> etc....
*/
//May combine MULTIPLE unit tests into an integration test, not about combining unit test but combining unit tests that resemble real user flows
test('if an amount and note is entered, the pay button is enabled', () => {
  render(<TransactionCreateStepTwo sender={{ id: '5'}} receiver={{ id: '5'}}/>)
  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/note/i), "This is a note");
  expect(await screen.findByRole('button', {name: /pay/i}).toBeEnabled()); //will look for a button with the name with pay that is enabled (case insensitive search)
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*END TO END TESTS - Common Testing Functions and Practices*/
//install 'Testing Playground' chrome extension - open extension and click on select element icon and when you hover over elements it gives you a suggested query (we want a getByRole or highest priority query)
//everyting in cypress will always use find vs get which we are used to in Jest
//setup cypress -- npm install -save--dev @testing-library/cypress OR yarn add -D cypress @testing-library/cypress (-D makes it a deve dependency)
//npm run cypress open OR yarn run crypress open
//remove default tests by going to cypress folder and in integration remove those two folders
//want to add the react-testing-library cypress commands -- go to support folder --> command.js and add the following:
import "@testing-library/cypress/add-commands"
//can start writing tests by going to cypress folder and in integration directory create a file (e.g. payment_spec.js)
describe('payment', () => {
  it('user can make payment', () => {
    //go through a use case yourself to see what you would do then write down the steps you want to emulate
    //login
    //check account balance
    //click on pay button
    //search for user
    //add amount and note and click pay
    //return to transactions
    //go to personal payments tab
    //click on payment
    //verify if payment was made
    //verify if payment amount was deducted
  })
})
//inside cypress window you can go to the payment_spec.js and click Run 1 integration spec (we are using the Electron environment but you can test within other environments)
const { v4: uuidv4 } = require('uuid'); //this import allows use to create unique identifiers

describe('payment', () => {
    it('user can make payment', () => {
        //  login
        cy.visit('/'); //this will ensure user visits the root of our app
        cy.findByRole('textbox', { name: /username/i }).type('johndoe');
        cy.findByLabelText(/password/i).type('s3cret');
        cy.findByRole('checkbox', { name: /remember me/i }).check();
        cy.findByRole('button', { name: /sign in/i }).click();

        //the account balance is dynamic and there are no real details in cypress
        //if you go to Open Selector Playground which looks like a target in the cypress browser, click on the amount ot the dynamic element and cypress will give you a data test id like this [data-test-sidenav-user-balance]
        //we want to grab and use this on our cy.get functions cy.get('[data-test=sidenav-user-balance]')
        //once we grab it we can search our directory for it
        //use test-id as a last resport the more your tests resembles the way a user will use it the better
        
        // check account balance
        let oldBalance; //later we will use the current balance and compare these
        cy.get('[data-test=sidenav-user-balance]').then($balance => oldBalance = $balance.text()).then($balance => console.log($balance)); //set old balance to the current balance - we don't need the console.log but can check the balance to make sure it is working correctly

        // click on new button - opens a new page where we can select a user name to send a new payment
        cy.findByRole('button', { name: /new/i }).click();

        // search for user and then click the user
        cy.findByRole('textbox').type('devon becker');
        cy.findByText(/devon becker/i).click();

        // add amount and note and click pay
        const paymentAmount = "5.00";
        cy.findByPlaceholderText(/amount/i).type(paymentAmount);
        const note = uuidv4();
        cy.findByPlaceholderText(/add a note/i).type(note); //this uuidv4() function allows use to create unique identifiers - must import the library see top of component
        cy.findByRole('button', { name: /pay/i }).click();

        // return to transactions
        cy.findByRole('button', { name: /return to transactions/i }).click();

        // go to personal payments
        cy.findByRole('tab', { name: /mine/i }).click();

        //potential errors if an element covers another element you will get an error
        //you can use scrollIntoView() to resolve this issue
        //if error occurs try to see if element is available in your REAL browser and if it is then force cypress to move forward with clicking of the element that is covered via {force: true} configuration within click() function

        // click on payment
        cy.findByText(note).click({ force: true }); //want to click on the unique text we created as it should be there now

        // verify if payment was made
        cy.findByText(`-$${paymentAmount}`).should('be.visible'); //check if '-$50.00' is visible on the screen - ASSERTIONS SUCCESS!
        cy.findByText(note).should('be.visible'); //chec if note is on the screen - ASSERTIONS SUCCESS!

        // verify if payment amount was deducted
        cy.get('[data-test=sidenav-user-balance]').then($balance => {
            const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, "")); //replace the '$' sign and ',' globally with empty string
            const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, "")); //need to convert new balance to text or it wont work
            expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(paymentAmount)); //create our own assertion - lookup 'to' keyword and 'equal' keyword
        });
    });
});

//REVIEW
//is app working as expected?
//did we test high value features?
//can we convert a ton of unit tests into a better integration test? (integration tests should cover an actual use case)
//ensure test are acting as a safegaurd against unwanted behavior in our tests
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Enzyme setupTest.js Configuration
//Import configure and adapter into setupTests.js
//and also configure new adapter in setupTests.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

//Import shallow into the MyComponent.test.js file
import { shallow } from "enzyme";

//Enzyme - Use Shallow - Basic Use Case*/
/*Enzyme Allows us to grab element from any selector (id, class, attribute, text, etc...*/
import react from 'react';
import { render } from "@testing-library/react"
import App from "./App";
import { shallow } from 'enzyme';

//Should be in our setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
  
describe("Counter Testing", () => {
  //remember, we can swap <App /> out with any other component or element (e.g. if you refactor and want to swap <App /> with <Counter /> we will get same results if shallow code is the same)
  let wrapper; //want wrapper to be accessible by any test so we declare it outside beforeEach()
  beforeEach(() => { //use before each whenever we want to have something happen before each test
    wrapper = mount(<App />); //if we use mount() over shallow() we will get everything inside the <App /> component AND the components inside the <App /> component (e.g. everything inside <Counter />)
    //can replace mount() with shallow()
  });

  test('render the title of counter', () => {
      const wrapper = shallow(<App />); //Wrapper is a convention - shapper will only render the outter part of the component //It will not go inside other elements or components inside rendered component
      console.log(wrapper.debug()) //we can check what is inside wrapper with the debug function //It will print contents to log
      expect(wrapper.find('h1').text()).toContain("This is counter app") //the find method functions the same as jquery as far as selectors go //this will return the text of 'h1' and expect it to contain the text we asked for
    });
  
  test("render the initial value of state in a div", () => {
    expect(wrapper.find("#counter-value").text()).toBe("0");
  });

  test("render the click event of increment button and increment counter value", () => {
    wrapper.find("#increment-btn").simulate("click");
    expect(wrapper.find("#counter-value").text()).toBe("1");
  });

  test("render the click event of decrrment button and decrement counter value", () => {
    wrapper.find("#increment-btn").simulate("click");
    expect(wrapper.find("#counter-value").text()).toBe("1");
    wrapper.find("#decrement-btn").simulate("click");
    expect(wrapper.find("#counter-value").text()).toBe("0");
  });

})
});
/***********DEEP DIVE JEST & ENZYME***********/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Enzyme Testing React Apps*/
//You will need to install enzyme along with an Adapter corresponding to the version of react (e.g. if you are using enzyme with React 16, you can run):
npm i --save-dev enzyme enzyme-adapter-react-16
//Each adapter may have additional peer dependencies which you will need to install as well. For instance, enzyme-adapter-react-16 has peer dependencies on react and react-dom.
/*Shallow Rendering*/
//Here you want to isolate test to a single component
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import MyComponent from './MyComponent';
import Foo from './Foo';

describe('<MyComponent />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find(Foo)).to.have.lengthOf(3);
  });

  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});
/*Full DOM Rendering*/
//Can test for lifecycle renders
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Foo from './Foo';

describe('<Foo />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Foo bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount((
      <Foo onButtonClick={onButtonClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });

  it('calls componentDidMount', () => {
    sinon.spy(Foo.prototype, 'componentDidMount');
    const wrapper = mount(<Foo />);
    expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
    Foo.prototype.componentDidMount.restore();
  });
});
/*Static Rendered Markup*/
//Render react components to static HTML
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';

import Foo from './Foo';
import { maxHeaderSize } from "http"

describe('<Foo />', () => {
  it('renders three `.foo-bar`s', () => {
    const wrapper = render(<Foo />);
    expect(wrapper.find('.foo-bar')).to.have.lengthOf(3);
  });

  it('renders the title', () => {
    const wrapper = render(<Foo title="unique" />);
    expect(wrapper.text()).to.contain('unique');
  });
});
/*React Hooks support*/
//Enzyme supports react hooks with some limitations in .shallow() due to upstream issues in React's shallow renderer:
//useEffect() and useLayoutEffect() don't get called in the React shallow renderer.
//useCallback() doesn't memoize callback in React shallow renderer.
//If you're using React 16.8+ and .mount(), Enzyme will wrap apis including .simulate(), .setProps(), .setContext(), .invoke() with ReactTestUtils.act() so you don't need to manually wrap it.
//A common pattern to trigger handlers with .act() and assert is:
const wrapper = mount(<SomeComponent />);
act(() => wrapper.prop('handler')());
wrapper.update();
expect(/* ... */);
//We cannot wrap the result of .prop() (or .props()) with .act() in Enzyme internally since it will break the equality of the returned value.
//However, you could use .invoke() to simplify the code:
const wrapper = mount(<SomeComponent />);
wrapper.invoke('handler')();
expect(/* ... */);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*JEST Matchers*/
////////////////
//Jest uses "matchers" to let you test values in different ways. This document will introduce some commonly used matchers.
//See full list here https://jestjs.io/docs/expect
//The simplest way to test a value is with exact equality
//Expect(2 + 2) returns an "expectation" object (you typically won't do much with these expectation objects except call matchers on them)
//.toBe(4) is the matcher (when jest runs it tracks all the failing matchers so that it can print out nice error messages for you)
test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });
//toBe uses Object.is to test exact equality
//If you want to check the value of an object, use toEqual instead
//toEqual recursively checks every field of an object or array.
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });
//You can also test for the opposite of a matcher
  test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

//Truthiness Matchers
//You should use the matcher that most precisely corresponds to what you want your code to be doing.
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  
  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

//Number Matchers
test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

//Floating Point Numbers
//Use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.
test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });

//String Matchers
//Check strings against regular expressions with toMatch
test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });

//Arrays and iterables
//Check if an array or iterable contains a particular item using toContain
const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];
  
  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
  });

//Exceptions
//If you want to test whether a particular function throws an error when it's called, use toThrow
//The function that throws an exception needs to be invoked within a wrapping function otherwise the toThrow assertion will fail.
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
  }
  
  test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);
  
    // You can also use the exact error message or a regexp
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*JEST Testing Async Code*/
////////////////
//When you have code that runs asynchronously, Jest needs to know when the code it is testing has completed, before it can move on to another test
//Callbacks
//The most common asynchronous pattern is callbacks.
//Let's say that you have a fetchData(callback) function that fetches some data and calls callback(data) when it is complete. 
//You want to test that this returned data is the string 'peanut butter'.
//By default, Jest tests complete once they reach the end of their execution. That means this test will not work as intended:
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
//The problem is that the test will complete as soon as fetchData completes, before ever calling the callback.
//Instead of putting the test in a function with an empty argument, use a single argument called done. 
//Jest will wait until the done callback is called before finishing the test.
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});
//If done() is never called, the test will fail (with timeout error), which is what you want to happen.
//If the expect statement fails, it throws an error and done() is not called.
//If we want to see in the test log why it failed, we have to wrap expect in a try block and pass the error in the catch block to done.
//Otherwise, we end up with an opaque timeout error that doesn't show what value was received by expect(data).

//Promises
//Return a promise from your test, and Jest will wait for that promise to resolve.
//If the promise is rejected, the test will automatically fail.
//Let's say that fetchData, instead of using a callback, returns a promise that is supposed to resolve to the string 'peanut butter'. 
//We could test it with
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
//Be sure to return the promise - if you omit this return statement, your test will complete before the promise returned from fetchData resolves and then() has a chance to execute the callback.
//If you expect a promise to be rejected, use the .catch method. 
//Make sure to add expect.assertions to verify that a certain number of assertions are called, otherwise, a fulfilled promise would not fail the test.
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});

//.resolve / .reject
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
//Be sure to return the assertion—if you omit this return statement, your test will complete before the promise returned from fetchData is resolved and then() has a chance to execute the callback.
//If you expect a promise to be rejected, use the .rejects matcher. It works analogically to the .resolves matcher. If the promise is fulfilled, the test will automatically fail.
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});

//Async/Await
//To write an async test, use the async keyword in front of the function passed to test.
//For example, the same fetchData scenario can be tested with
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
//You can combine async and await with .resolves or .rejects.
test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
//In these cases, async and await are effectively syntactic sugar for the same logic as the promises example uses.
//None of these forms is particularly superior to the others, and you can mix and match them across a codebase or even in a single file.
//It just depends on which style you feel makes your tests simpler.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*JEST Setup and Teardown*/
////////////////
//Often while writing tests you have some setup work that needs to happen before tests run, and you have some finishing work that needs to happen after tests run.
//Jest provides helper functions to handle this.
//Repeating Setup For Many Tests (beforeEach and afterEach)
//Say you have a method initializeCityDatabase() that must be called before each of these tests, and a method clearCityDatabase() that must be called after each of these tests.
//You can do this with
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
//beforeEach and afterEach can handle asynchronous code in the same ways that tests can handle asynchronous code - they can either take a done parameter or return a promise.
//For example, if initializeCityDatabase() returned a promise that resolved when the database was initialized, we would want to return that promise:
beforeEach(() => {
  return initializeCityDatabase();
});

//One Time Setup (Need To Return for Async Methods)
//In some cases, you only need to do setup once, at the beginning of a file.
//This can be especially bothersome when the setup is asynchronous, so you can't do it inline. 
//Jest provides beforeAll and afterAll to handle this situation.
//If both initializeCityDatabase and clearCityDatabase returned promises, and the city database could be reused between tests, we could change our test code to
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

//Scoping
//By default, the before and after blocks apply to every test in a file.
//You can also group tests together using a describe block. When they are inside a describe block, the before and after blocks only apply to the tests within that describe block.
//Say we had not just a city database, but also a food database. We could do different setup for different tests
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 veal', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
//Note that the top-level beforeEach is executed before the beforeEach inside the describe block. 
//It may help to illustrate the order of execution of all hooks.
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});
// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

//Order of execution of describe and test blocks
//Jest executes all describe handlers in a test file before it executes any of the actual tests.
//This is another reason to do setup and teardown inside before* and after* handlers rather than inside the describe blocks.
//Once the describe blocks are complete, by default Jest runs all the tests serially in the order they were encountered in the collection phase, waiting for each to finish and be tidied up before moving on.
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});
// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2

//Troubleshooting and General Advice
//If a test is failing, one of the first things to check should be whether the test is failing when it's the only test that runs.
//To run only one test with Jest, temporarily change that test command to a test.only
//If you have a test that often fails when it's run as part of a larger suite, but doesn't fail when you run it alone, it's a good bet that something from a different test is interfering with this one. 
//You can often fix this by clearing some shared state with beforeEach.
//If you're not sure whether some shared state is being modified, you can also try a beforeEach that logs data.
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});
test('this test will not run', () => {
  expect('A').toBe('A');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*JEST Mock Functions*/
////////////////
/*Mock functions allow you to test the links between code by erasing the actual implementation of a function, 
capturing calls to the function (and the parameters passed in those calls), 
capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.
There are two ways to mock functions: Either by creating a mock function to use in test code, or writing a manual mock to override a module dependency.*/

//Using a mock function
//Let's imagine we're testing an implementation of a function forEach, which invokes a callback for each item in a supplied array.
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
//To test this function, we can use a mock function, and inspect the mock's state to ensure the callback is invoked as expected.
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);
// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);
// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);
// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);
// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);

//.mock property
//All mock functions have this special .mock property, which is where data about how the function has been called and what the function returned is kept.
//The .mock property also tracks the value of this for each call, so it is possible to inspect this as well:
const myMock = jest.fn();
const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();
console.log(myMock.mock.instances);
// > [ <a>, <b> ]
//These mock members are very useful in tests to assert how these functions get called, instantiated, or what they returned:
// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);
// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');
// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');
// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');
// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);
// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toEqual('test');

//Mock Return Values
//Mock functions can also be used to inject test values into your code during a test
const myMock = jest.fn();
console.log(myMock());
// > undefined
myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
//Mock functions are also very effective in code that uses a functional continuation-passing style. 
//Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.
//Most real-world examples actually involve getting ahold of a mock function on a dependent component and configuring that, but the technique is the same.
//In these cases, try to avoid the temptation to implement logic inside of any function that's not directly being tested.
const filterTestFn = jest.fn();
// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
const result = [11, 12].filter(num => filterTestFn(num));
console.log(result);
// > [11]
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12

//Mocking Modules
//Suppose we have a class that fetches users from our API. The class uses axios to call the API then returns the data attribute which contains all the users
//users.js
import axios from 'axios';
class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}
export default Users;
//In order to test this method without actually hitting the API (and thus creating slow and fragile tests), we can use the jest.mock(...) function to automatically mock the axios module.
//Once we mock the module we can provide a mockResolvedValue for .get that returns the data we want our test to assert against.
//In effect, we are saying that we want axios.get('/users.json') to return a fake response.
//users.test.js
import axios from 'axios';
import Users from './users';
jest.mock('axios');
test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);
  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  return Users.all().then(data => expect(data).toEqual(users));
});

//Mocking Partials
//Subsets of a module can be mocked and the rest of the module can keep their actual implementation
//foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
//test.js
import defaultExport, {bar, foo} from '../foo-bar-baz';
jest.mock('../foo-bar-baz', () => {
  const originalModule = jest.requireActual('../foo-bar-baz');
  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});
test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});

//Mock Implementations
//Still, there are cases where it's useful to go beyond the ability to specify return values and full-on replace the implementation of a mock function.
//This can be done with jest.fn or the mockImplementationOnce method on mock functions.
const myMockFn = jest.fn(cb => cb(null, true));
myMockFn((err, val) => console.log(val));
// > true
//The mockImplementation method is useful when you need to define the default implementation of a mock function that is created from another module
//foo.js
module.exports = function () {
  // some implementation;
};
//test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');
// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
//When you need to recreate a complex behavior of a mock function such that multiple function calls produce different results, use the mockImplementationOnce method
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));
myMockFn((err, val) => console.log(val));
// > true
myMockFn((err, val) => console.log(val));
// > false
//When the mocked function runs out of implementations defined with mockImplementationOnce, it will execute the default implementation set with jest.fn (if it is defined)
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'

//Mock Names
//You can optionally provide a name for your mock functions, which will be displayed instead of "jest.fn()" in the test error output.
//Use this if you want to be able to quickly identify the mock function reporting an error in your test output.
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');

//Custom Matchers (For Mock Functions)
//In order to make it less demanding to assert how mock functions have been called, we've added some custom matcher functions for you:
// The mock function was called at least once
expect(mockFunc).toHaveBeenCalled();
// The mock function was called at least once with the specified args
expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);
// The last call to the mock function was called with the specified args
expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);
// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();
//These matchers are sugar for common forms of inspecting the .mock property. You can always do this manually yourself if that's more to your taste or if you need to do something more specific
// The mock function was called at least once
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);
// The mock function was called at least once with the specified args
expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);
// The last call to the mock function was called with the specified args
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);
// The first arg of the last call to the mock function was `42`
// (note that there is no sugar helper for this specific of an assertion)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);
// A snapshot will check that a mock was invoked the same number of times,
// in the same order, with the same arguments. It will also assert on the name.
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.getMockName()).toBe('a mock name');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*JEST Testing React Apps*/
////////////////
//Setup
//Using Create React App ships with Jest! You will only need to add react-test-renderer for rendering snapshots
//Install using the command
npm i --dev react-test-renderer

//Snapshot Testing
//Let's create a snapshot test for a Link component that renders hyperlinks
//Link.react.js
import React, {useState} from 'react';
const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};
const Link = ({page, children}) => {
  const [status, setStatus] = useState(STATUS.NORMAL);
  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };
  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };
  return (
    <a
      className={status}
      href={page || '#'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};
export default Link;
//Now let's use React's test renderer and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file
//Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../Link.react';
import { getByAltText, getByLabelText, getByPlaceholderText, getByRole, getByTestId, getByText, getByTitle } from '@testing-library/dom'
test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
//When you run npm test or jest, this will produce an output file like this
//__tests__/__snapshots__/Link.react.test.js.snap
exports[`Link changes the class when hovered 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 2`] = `
<a
  className="hovered"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;

exports[`Link changes the class when hovered 3`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}>
  Facebook
</a>
`;
//The next time you run the tests, the rendered output will be compared to the previously created snapshot.
//The snapshot should be committed along with code changes. 
//When a snapshot test fails, you need to inspect whether it is an intended or unintended change.
//If the change is expected you can invoke Jest with jest -u to overwrite the existing snapshot.

//Snapshot Testing with Mocks, Enzyme and React 16
//There's a caveat around snapshot testing when using Enzyme and React 16+. If you mock out a module using the following style:
jest.mock('../SomeDirectory/SomeComponent', () => 'SomeComponent');
//Then you will see warnings in the console:
Warning: <SomeComponent /> is using uppercase HTML. Always use lowercase HTML tags in React.
# Or:
Warning: The tag <SomeComponent> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
/*React 16 triggers these warnings due to how it checks element types, and the mocked module fails these checks. Your options are:
1. Render as text. This way you won't see the props passed to the mock component in the snapshot, but it's straightforward:
  jest.mock('./SomeComponent', () => () => 'SomeComponent');
2. Render as a custom element. DOM "custom elements" aren't checked for anything and shouldn't fire warnings. They are lowercase and have a dash in the name.
  jest.mock('./Widget', () => () => <mock-widget />);
3.Use react-test-renderer. The test renderer doesn't care about element types and will happily accept 
  e.g. SomeComponent. You could check snapshots using the test renderer, and check component behavior separately using Enzyme.
4. Disable warnings all together (should be done in your jest setup file):
  jest.mock('fbjs/lib/warning', () => require('fbjs/lib/emptyFunction'));
This shouldn't normally be your option of choice as useful warnings could be lost. 
However, in some cases, for example when testing react-native's components we are rendering react-native tags into the DOM and many warnings are irrelevant. 
Another option is to swizzle the console.warn and suppress specific warnings.*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*JEST Setup Kent C Dodds*/
////////////////
import { getHeapStatistics } from "v8"
//run code:
npm install --save dev jest
//add a test script
//run jest in that test script.
"scripts": {
    "test": "jest",
    "dev": "webpack-serve",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --listen 8080 dist",
    "lint": "eslint .",
    "format": "prettier \"**/*.js\" --write",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm run setup && npm run validate"
}
//in terminal npm run test or npm test or npm t.
//you'll get this error that says "no files found."
//of 15 files none of them matched this test match and so it didn't run any of our files as test. Let's go ahead and create that test file. We'll put it right in the source directory here(src folder)
//create a new directory __tests__ and that will match the testMatch glob in the terminal
//example.js. to the file name
//we'll just make a test that says, "It works."
test('it works', () => {})
//run our test script again and it runs our example. 
//We can also move this file right here(outside of the __test__ folder) and name it with a .test, and that will work just as well
//We want to co-locate the test to where the file is that it's testing as close as possible. You will find that I put my test directory right next to the file that's being tested.
//One other thing that I want to do here is if we check out my travesty YAML file, the CI configure here, we have this script that runs NPM run setup.
//That setup script is going to run install and then validate, and that validates that the project is in a working state. 
//Right now, it's running the linting and the build. I wanted to also run the test. If the linting passes, I'm going to have it run the test script. 
//run npm run validate, it's going to run the linting first, it'll run the test, and then it'll run the build.

/*Configure Jest's Test Environment for testing Node or Browser code*/
//Create new file in root directory
jest.config.js
//Within file add the following
//Be explicit about the environment to emulate the most real environment possible
module.exports = {
    testEnvironment: 'jest-environment-node' //can add jsdom at the end to explicitly make the environment brower based
}

/* Support Importing CSS Files W/ Jest's moduleNameMapper*/
//Need to use moduleNameMapper so we can map modules that end in .css to a different module (mock version of module) so it can be stebbed out and we can require this file in our test
//Open jest.config.js
//We'll say anything that ends in .css and this is a Rejex pattern here, we want to require resolve.
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '\\.css$': require.resolve('./test/style-mock.js'),
    },
  }

/*Support using Webpack CSS Modules with Jest*/
//add this line ('\\.module\\.css$': 'identity-obj-proxy',) to our moduleNameMapper
//Instead of actually importing auto-scaling-text.module.css, it's going to import identity-obj-proxy.
//What that is going to do is it will return a string for the path that was accessed for this particular module. 
//That makes our test a lot easier to debug. 
//It allows us to make some assertions on the class name that's going to be applied, even though that class name is going to be generated at run time.
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '\\.module\\.css$': 'identity-obj-proxy',
      '\\.css$': require.resolve('./test/style-mock.js'),
    }
  }