/*Adding Emmet to JS Files*/
{
    "emmet.includeLanguages": {
       "javascript": "javascriptreact"
    }
}

/*VS Code Styled Components (Intellisense)*/
/*Cntrl+P
Paste this: ext install vscode-styled-components
Choose vscode-styled-components to install (See below):
*/

/*Naming Files and File Types*/
//Make file and directory names lowercase. In general, separate words with hyphens, not underscores. Use only standard ASCII alphanumeric characters in file and directory names.

import thisStringValue = require("es-abstract/2015/thisstringvalue")

/*Make Modules Have Encapsulated Methods and Data*/
//Only export what you want accessible from a page, component, module, object, or function

/*Functions*/
//Encapsulate with factory functions and delegated objects by returning only properties you want exposed
// Encapsulation and private variables make it so no outside objects or functions rely on them meaning you can change code without breaking anything
//DRY, Do One Thing, Pure Functions, Less Is More, Keep It Simple
//Named function expressions are treated like Higher Order Functions and can be called by the same function (recursion)
//Lambda is a function that is used as data
//Declare variables at the top of functions before they get used
//Rarely use forEach -> use helper functions instead
//Functions should be stateless and generic when possible
//Never use the New keyword for objects
//Use Object.create(protoObjectLiteral) for delegate prototypes (parents) const proto = {props}
//Delegate reusable props and methods to delegate prototype

/*New Operators*/
//Nullish coalescing operator - a = a ?? 0
//Shorthand prop names
//Template Literals
//Arrow functions
//Param defaults
//Rest/Spread
//ESModules
//Optional Chaining - const streetName = user && user.address && user.address.street.name

/*Client-Side Concerns*/
//Find small robust micro libraries that have a solid core you will consistently use and that will help resolve the following problems!
//Module management
//Events
//Presentation and DOM manipulation
//Internationalization
//Data management and IO (including AJAX)
//Routing (translating URLs to script actions)
//Logging
//Analytics tracking
//Authentication
//Feature toggling (decouple code deployment and feature release)

/*Loose Coupling*/
//Make sure no elements functions or components rely on each other too much
//Never have relaying information too nested - have a mediator or connector relay messages vs having components rely on objects event emitters

/*Module Management*/
//Module management typically supplies your application with:
//Name spacing
//Sandbox (a base layer functionality that other modules can safely use)
//Access to environment variables and bootstrapped data
//Module lifecycle hooks (help with setup and teardown)
//An event system for inter-module communication

/*Async Patterns*/
//Start an async fetch at load time so that ie begins the download as early as possible (separate task running in parallel vs synchronously) before te dom is ready and before the page is done processing HTMLAllCollection,CSS and JS
//This can speed up perceived page-load times so you can render the page as early as possible but will add a small latency
//If you have data that is secondary to the main purpose of the page and can wait until after DOM is ready then let the page load normally and fetch data during render step
//This will reduce number of page requests that must be handled at page-load time and eliminate the small latency hit

/*Switch Statements*/
const expr = 'Papayas';
switch (expr) {
  case 'Oranges':
    console.log('Oranges are $0.59 a pound.');
    break;
  case 'Mangoes':
  case 'Papayas':
    console.log('Mangoes and papayas are $2.79 a pound.');
    // expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log(`Sorry, we are out of ${expr}.`);
}

/*JSON.stringify() and JSON.parse*/
//JSON.stringify() can be used to stringify anything like an object or value
//JSON.parse does the opposite - pulls the string without having quotes