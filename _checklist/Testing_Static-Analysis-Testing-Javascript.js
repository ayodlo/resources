//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*SIMPLE ESLINT*/
//////////////////////////////////////////////////////
//eslint will help us avoid typos
//simple install first we need to npm init to initialize our project as a javascript project
npm install -g eslint
//configuration will ask you what you want eslint to do
eslint --init
//choose To check syntax, to find problems, and enforce code style
//check everything that applies to you after this
//dont want to use styling if we are going to use prettier
//go and make sure you have ESLINT extension installed in order to see the errors
//you will find the esclintrc.json file which is the configuration file for the linter
//more config - you can search for eslint in settings of vs code and make sure that autofix on save is on
//you can also go to eslintrc.json file and within rules define any rule you want (e.g. "no-console":"off" will turn the errors off - args "on", "warning" or "0", "1", "2")
//see all the rules available here - https://eslint.org/docs/rules/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*ESLINT IMPORT PLUGIN*/
//////////////////////////////////////////////////////
// article - https://dev.to/otamnitram/sorting-your-imports-correctly-in-react-213m
// installation
npm i eslint-plugin-import
// place the rules into rules
// Add the snippet below into "script" in package.json file.
"lint": "eslint ."
//Run 
npm run lint

"import/order": [
  "error",
  {
    "groups": ["builtin", "external", "internal"],
    "pathGroups": [
      {
        "pattern": "react",
        "group": "external",
        "position": "before"
      }
    ],
    "pathGroupsExcludedImportTypes": ["react"],
    "newlines-between": "always",
    "alphabetize": {
      "order": "asc",
      "caseInsensitive": true
    }
  }
],
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*PRETTIER CONFIG*/
///////////////////
/* Prettier */
/*Prettier Extension*/
//install and enable the extension
//within settings hit json version in top right
//add code:
{ 
  //Place your settings in this file to overwrite the default settings
  "editor.defaultFormatter": "esbenp.prettier-vscode", //the formatter that the prettier vs code extension exposes  to vs code so it can format our code
  "editor.formatOnSave": true //formats on save
  }
/* Prettier Configuration */
//prettier.io/playground/
//global section//
parser: flow //prettier will automatically figure out which parser to use based on the file extension
print-width: 80
tab-width: 2
//common section//
single-quote: true //change quotes from double to single which we want in js
no-bracket-spacing: true
prose-wrap: always //this is for markdown and we always want to wrap
//js section//
no-semi: true
jsx-single-quot: false
jsx-bracket-same-line: false
quote-props: as-needed
arrow-parens: avoid
trailing-comma: all
//html section//
html-whitespace-sensitivity: css
//special section//
insert-pragma: false
require-pragma: false
//range section//
range-start: none
range-end: none
//debug section//
show AST: none
show doc: none
show second format: none
//--> Copy config JSON and paste it in .prettierrc file within the src directory

/*Installing prettier with npm*/
npm install --save-dev prettier
//should see prettier in dev dependencies now and node_modules.bin
//can run:
npx prettier src/example.js
//this will log out same file contents with things formatted properly
//can run:
npm prettier srx/example.js --write
//add script in package.json to run this for us^:
"scripts": {
  "build": "babel src --out-dir dist",
  "lint": "eslint --ignore-path .gitignore .",
  "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\"" //this will match all files that are js or json
},

/*Disable Unnecessary ESLint Stylistic Rules with eslint-config-prettier*/
//prettier and eslint can clash if there is an eslint rule that can prevent something like having an extra semicolon but prettier would automatically fix that anyway
//we can look at that rule and disable it since its impossible to break anyways
//run code:
npm install --save-dev eslint-config-prettier //configuration that has already been configured to disable any rules that prettier determines useless
//should see eslint-config-prettier in package.json dev dependencies
//inside .eslintrc add "eslint-config-prettier" to the extends prop:
"extends": ["eslint:recommended", "eslint-config-prettier"] //it may also disable rules for other configuration types we are installing (e.g. typescript, babel, flowtype, react, standard, unicorn, vue, etc)

/*Validate All Files are Properly Formatted with Prettier*/
//add script:
"validate": "npm run lint && npm run build"
//run code:
npm run validate //will run all the linting and building and makes sure the project is in a good state
//want to make sure files in project are properly formatted with prettier
//add script:
"check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|json)\""
//run code:
npm run check-format //prettier will go through all files and will check if it were to format file would it actually change
//can add this script to the validate script
"validate": "npm run check-format && npm run lint && npm run build"
//can run code:
npm run validate //will run all our scripts, prettier being first and we can see that we didn't format that way we can run npm run format
//can run:
npm run format
npm run validate //so we can know that this project is in a good state when validate script passes
//the check-format and format scripts have a lot of duplication
//add prettier script which will have all commonalities between scripts
"scripts": {
  "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
  "format": "npm run prettier -- --write", //add -- which tells npm to forward all remaining arguments to this script here which here are --write
  "check-format": "npm run prettier -- --list-different",
  "validate": "npm run check-format && npm run lint && npm run build"
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*DEEP DIVE ESLINT AND OTHER STATIC TOOLS*/
///////////////////////////////////////////

/*Install ES Lint Plugin*/
//go to extensions and find eslint and enable it
//can run:
 npx eslint . --fix
 //^will apply as many fixes as possible across your current codebase
 //can disable a strict for current line or disable for entire file as well


 /*ES Lint Rules and Pre-made Rule Sets*/
 {
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "extends": ["eslint:recommended"], //can add more configurations, the latter being the one that over rides the previous
    "rules": {
        //we want to over ride the strict rule because we never want to use strict
        "strict": ["error", "never"],
    },
    //will tell the environment where the js is expected to run which will impact some rules
    "env": {
        "browser": true
    }
}
//can run:
npx eslint . --fix
//this will auto fix a lot of errors, but we can go in and fix on unresolved errors coming from eslint



/*Adding eslint script to package.json*/
//add "lint": "eslint ." to scripts and now we can run npm run lint to lint our code base
{
    "name": "static-testing-tools",
    "private": true,
    "author": "Kent C. Dodds (http://kentcdodds.com/)",
    "license": "GPLv3",
    "scripts": {
      "build": "babel src --out-dir dist",
      "lint": "eslint .",
    },
    "devDependencies": {
      "@babel/cli": "^7.12.8",
      "@babel/core": "^7.12.9",
      "@babel/preset-env": "^7.12.7",
      "eslint": "^7.14.0",
      "lint-staged": "^10.5.2",
    }
  }
  //if we run npm run build and npm run lint we get linting errors because babel is going to add 'use strict' to our dist directory
  //can create an .eslintignore and add:
  node_modules
  dist
  //OR we can --ignore-path .gitignore . to the lint script
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
  },
  //this will say use the .gitignore file we are not linting anything thats in the the .gitignore file which should be consistent with what we want to not lint
  //linting across all javascript files that are not in the dist or node_modules directory

//Installing eslint with npm
//npm install --save-dev eslint
//should now be able to go to package.json and see eslint under devDependencies
//must create .eslintrc file in the root of the project
//will get a parsing error without setting configure es6 to parse files properly

const { doc, format } = require("prettier")
const { getAllJSDocTags } = require("typescript")

//inside eslintrc:
{
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        //never need the use strict pragma because babel is going to compile and turn off use  strict automatically
        "strict": ["error", "never"],
        //will set the typeof rule which ensures typeof comparisons are valid
        "valid-typeof": "error", //can also use "warn" instead of "error"
        "no-unsafe-negation": "error",
        "no-unused-vars": "error",
        "no-unexpected-multiline": "error",
        "no-undef": "error"
    },
    //will tell the environment where the js is expected to run which will impact some rules
    "env": {
        "browser": true
    }
}



/* Prettier */
/*Prettier Extension*/
//install and enable the extension
//within settings hit json version in top right
//add code:
{ 
    //Place your settings in this file to overwrite the default settings
    "editor.defaultFormatter": "esbenp.prettier-vscode", //the formatter that the prettier vs code extension exposes  to vs code so it can format our code
    "editor.formatOnSave": true //formats on save
    }



/* Prettier Configuration */
//prettier.io/playground/
//global section//
parser: flow //prettier will automatically figure out which parser to use based on the file extension
print-width: 80
tab-width: 2
//common section//
single-quote: true //change quotes from double to single which we want in js
no-bracket-spacing: true
prose-wrap: always //this is for markdown and we always want to wrap
//js section//
no-semi: true
jsx-single-quot: false
jsx-bracket-same-line: false
quote-props: as-needed
arrow-parens: avoid
trailing-comma: all
//html section//
html-whitespace-sensitivity: css
//special section//
insert-pragma: false
require-pragma: false
//range section//
range-start: none
range-end: none
//debug section//
show AST: none
show doc: none
show second format: none
//--> Copy config JSON and paste it in .prettierrc file within the src directory



/*Installing prettier with npm*/
npm install --save-dev prettier
//should see prettier in dev dependencies now and node_modules.bin
//can run:
npx prettier src/example.js
//this will log out same file contents with things formatted properly
//can run:
npm prettier srx/example.js --write
//add script in package.json to run this for us^:
"scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\"" //this will match all files that are js or json
  },



/*Disable Unnecessary ESLint Stylistic Rules with eslint-config-prettier*/
//prettier and eslint can clash if there is an eslint rule that can prevent something like having an extra semicolon but prettier would automatically fix that anyway
//we can look at that rule and disable it since its impossible to break anyways
//run code:
npm install --save-dev eslint-config-prettier //configuration that has already been configured to disable any rules that prettier determines useless
//should see eslint-config-prettier in package.json dev dependencies
//inside .eslintrc add "eslint-config-prettier" to the extends prop:
"extends": ["eslint:recommended", "eslint-config-prettier"] //it may also disable rules for other configuration types we are installing (e.g. typescript, babel, flowtype, react, standard, unicorn, vue, etc)



/*Validate All Files are Properly Formatted with Prettier*/
//add script:
"validate": "npm run lint && npm run build"
//run code:
npm run validate //will run all the linting and building and makes sure the project is in a good state
//want to make sure files in project are properly formatted with prettier
//add script:
"check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|json)\""
//run code:
npm run check-format //prettier will go through all files and will check if it were to format file would it actually change
//can add this script to the validate script
"validate": "npm run check-format && npm run lint && npm run build"
//can run code:
npm run validate //will run all our scripts, prettier being first and we can see that we didn't format that way we can run npm run format
//can run:
npm run format
npm run validate //so we can know that this project is in a good state when validate script passes
//the check-format and format scripts have a lot of duplication
//add prettier script which will have all commonalities between scripts
"scripts": {
    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
    "format": "npm run prettier -- --write", //add -- which tells npm to forward all remaining arguments to this script here which here are --write
    "check-format": "npm run prettier -- --list-different",
    "validate": "npm run check-format && npm run lint && npm run build"
}



/*Validate Code in a pre-commit git Hook with husky*/
//We can make sure to run validation before anyone commits code
//run code:
npm install --save-dev husky
//inside the .git derictory there is a hook directory with a bunch of files that husky should have created
//create a .huskyrc file with the following:
{
    "hooks": {
        "pre-commit": "npm run validate"
    }
}
//^ that hooks directory is built into git and anytime we do a commit git is going to run that pre-commit script that is in the hooks directory.
// The pre-commit script that husky created is going to look up this configuration and run this script that we have here.
//rum code:
git add .
git commit -am 'husky rocks'
//this will run the pre-commit script which will run the validate script
//if we tried to do something that is incorrect before the commit, the pre-commit hook will fail
//if we want to make the commit we can add --no-verify flag:
git commit -am 'messup' --no-verify
//can run ls -a .git/hooks to see all hooks you can run with husky:
ls -a .git/hooks



/*Auto-format All Files and Validate Relevant Files in a precommit Script with lint-staged*/
//Good if you don't have prettier installed to auto format your code
//Disable format on save setting in the settings
//If there is bad formatting and we don't have prettier plugin installed on the editor, every time we commit code we would have to run validate script and if there was formatting necessary they would have to run format
//We are going to allow everyone to have their code auto formatted
//Run code:
npm install --save-dev lint-staged
//go to package.json and make sure that has been installed
//create new file in src directory called .lintstagedrc and add the following:
{
    "*.+(js|ts|tsx)": [
      "eslint" //lint stage will forward all files to this script which is eslint
    ],
    //handle formatting for any files that match the following extensions as well - run it through prettier and do a git add for the file as well
    "**/*.+(js|json|ts|tsx)": [
        "prettier --write",
        "git add"
    ]
  }
//this will run eslint script if any of these file types are being processed in this commit
//add the following to .huskyrc:
{
    "hooks": {
      "pre-commit": "npm run check-types && lint-staged && npm run build"
    }
  }
//lint-staged will run on commit via husky which is taking care of our linting and our formatting but not our types or build so we need to add those
//will run on commit^



/*Run Multiple npm Scripts in Parallel with npm-run-all*/
//we can run the validate script which does alot of nice things, but it takes a while and it'd be nice if we run all these things in parallel since none of them affect one another
//run code:
npm install --save-dev npm-run-all
//make sure it is added to package.json
//add the following code:
{
    "scripts": {
      ...
      "validate": "npm-run-all --parallel check-types check-format lint build"
    }
  }
//run code:
npm run validate //will run all scripts in parallel which is faster



/*Typescript*/


/*Prop Types*/