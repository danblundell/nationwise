## Nationwise banking

This is a fictious banking app used to develop coding skills

## Requirements

* node (v4+)
* nodemon
* npm
* heroku
* a healthy dose of optimism

## Run the Service

To bring in dependencies run:
```
npm install
```
To start the service run:
```
npm start
```

## Run the application

You will need to run Mongo Db:
```
{MongoInstance_filepath}/mongod.exe --dbpath {MongoData_filepath}
```
You can run Nodemon:
```
nodemon {Application_filepath}/server.js
```

## Deployment

This app can be deployed to heroku.

Use the following link to log in a set up:
```
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
```

## Development

Take a fork of this repo and add to it as you need to, routes are in routes.js and body-parser is already included for heavy lifting on handling requests.