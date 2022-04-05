//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*What is NodeJS For?*/
///////////////////////////////////
// It is used to run code on a server for things like Authentication, Input Validation, Connecting to Databases, and any Business Logic that will run too slow in the browser
// Users don't have access to this server
// Also does a lot of scripts for file management and things like package management
// For our use case, we will write NodeJS to create Servers AND handle those Server Requests (validate input, connect to db, handle requests and handle responses)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*HTTP*/
///////////////////////////////////
// Hyper Text Transfer Protocol
// Protocol for transfering data which is understood by the Browser and Server that allows transfering of data from Browser to Server and vis versa
// HTTPS encrypts this data via SSL
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*The Nature of NodeJS*/
///////////////////////////////////
// REMEMBER FUNCTIONS WILL BE CALLED BASED ON THEIR LISTENER!
// This is what makes NodeJS so special, because it is non blocking, asynchronous which will always finish the task once the event lister is called (such as end)
/* Performance - MOST IMPORTANT PART*/
// Within the eventLoop is responsible for running callback code whenever an event occurs
// it is important to note that the long taking processes are not handled by the event loop, only the call back once the long taking code completes
// the long taking code is handled by a Worker Pool (long taking operations)
// the worker pool can do all the heavy lifting (such as handling a file)
// once the worker is done (e.g. once we read a file) it will trigger the callback for that readFile operation and since the since the event loop is responsible for the events and callbacks this will again end up in the event loop so there nodejs will executre the appropraite callback
/* Event Loop */
// At the beginning of each loop the following will be looked at in the queue and will execute based on priority in the following order:
// 1) Timers: Execute setTimeout, setInterval Callbacks
// 2) Pending Callbacks: Execture I/O related Callbacks that were deferred - write or read files, network operations and in general other blocking long taking operations
//  --> if there are too many oustanding callbacks it will continue its loop iteration and postpone these callbacks until the next iteration
// 3) Poll Phase: Look for new I/O events and do its best execute their callbacks if possible, if not possible it will defer execution and register them as a pending callback
//  --> it will also check if there are any timer callbacks and if there are and complete those callbacks
// 4) Check Phase: setImmediate() callbacks will be executed in the check phase immediately always after any open callbacks have been executed (theoretical terrain)
// 5) Close Event Callback Phases: Execute all 'close' event callbacks
// 6) process.exit phase: if there are no listeners left: refs ==0
//  --> internally nodejs keeps track of its open event listeners and it has a counter 'refs' which it increments by 1 for each new callback or listener thats opened and reducers that counter by 1 every time it finishes one of those callback or listener
//  --> since it is never ending b default the program will never end
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Creating React App Simple*/
///////////////////////////////////
// In root directory create server.js or app.js because it is the root file that will make up the note.js application that will run on the cloud in a server
// Some core modules that come with NodeJS are: http, https, fs, path, os
// CommonJS is used to import packages
// app.js
const http = require('http');

//we create our callback function to pass to createServer OR we can create an anonymous function as we do further below
// function requestListener(req, res) {}

//createServer requires a request listener callback function that will execute for every incoming request - we create this function above
// http.createServer(requestListener);

// *createServer with anonymous function and assign it to server*
const server = http.createServer((req, res) => {
  console.log(req);
  // will hard exit server which is something we don't usually want to do
  process.exit();
});

// have the server start listening on the port of our choice
server.listen(3000);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Request Properties*/
///////////////////////////////////
req.url; // provides url (everything after domain or server ip)
req.method; // provides request method used
req.headers; // provides headers user
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Rerouting Requests*/
///////////////////////////////////
// each url or route is being considered here based on the if conditions
// on line 59 we are creating a form and sending it as a response that when submitted will send a POST request to the url /message when this form is submitted and will also look into the form and if the inputs have name it will put that message into the request into the server
// when we return res.end() we are ensuring we are not checking any other routes and are returning from the anonymous function
// in the /message route we are ensuring this only proceeds if the route is message AND the method is post - method is parsed earlier in the chain
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Parsing Request Body*/
///////////////////////////////////
// Stream of data is an ongoing process in which the request is read in chunks
// to work with these chunks we use a Buffer which allows us to hold multiple chunks and work with them before they are released or before we are done
// req.on('data') allows us to listen to certain events which here is our data event
// we will listen for the data event and the data event will be fired whenever there is a new chunks for us to read
// the second argument is the function that will be executed for every incoming data event
// the event will receive a chunk of data
// we will push our chunk to the body array every time we have a new chunk
// we also use the end listener in which we call a function is called in which we use the Buffer object and concat the body which we created to the Buffer
// we now convert the Buffer to a string which works because we know the incoming data is text because the body of the text is going to be text
// we can see the parsed body in which our message from the form which is the key and the value is the input from the form
// we can now split the parsedBody by the = sign and grab the second element and move the writeFileSync into the end listener or else it will get called to soon
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Response Properties*/
///////////////////////////////////
// We can write whatever we want as a response to requests - the following will send back and HTML reseponse which will be treated as 'text/html' by the browser
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  // res.end() will send the response back to the browser
  res.end();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Headers*/
///////////////////////////////////
// On both requests and responses, Http headers are added to transport metadata from A to B.
// The following article provides a great overview of available headers and their role: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Seperating Code Node JS*/
///////////////////////////////////
// We are essentialy exporting the routes into the app.js file and passing those routesinto the createServer function so each request will be checked by each route
// if we use the module system (e.g. module.exports = requestHandler)
// we are importing all exports in the app.js file via require('./routes')

// app.js
const http = require('http');
const routes = require('./routes');
console.log(routes.someText);
const server = http.createServer(routes.handler);
server.listen(3000);

// routes.js
const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

// this is a shortcut for node.js which originally was modules.exports.handler = requestHandler etc....
exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
