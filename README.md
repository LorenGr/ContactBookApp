# Contact Book App

This app provides a list of contacts. Each one is zoomable into a 
profile page which can be edited and deleted.
New contacts can be added to the contact book.

## Demo
https://contactbookapp.herokuapp.com

### Initialisation
*Build application and Start Rest API*
``` javascript
npm start
```

## Source Code
- [Project Files](src/)
- [Deployment Files](public/)
- [Rest API Files](server/)
- [MongoDB model Files](model/)

## Libraries and Architecture

###### Stack
* Webpack
* React
* Redux
* Node
* Express
* Mongoose
* MongoDB

The application was created with React and is being served and compiled with webpack. Communication between elements and 
state management is all being handled by a Redux architecture. The app is calling Node server through an Express API.
Data is stored on MongoDB and communicates with the app through Mongoose middleware.
