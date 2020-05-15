# Archimydes User Story

This application is a simple react application built as a solution to the Archimydes Frontend coding challenge. 

---
## Requirements

To get this application up and running. You need to have the following tools in your machine
- nodejs
- yarn or npm

## Running the mock API
      
    $ cd api
    $ yarn
    $ yarn start
    
if the api starts successfully, the terminal will print out the following

    Api server listerning at port 3000
    Swager API Doc is available now at http://localhost:3000/api-docs

## Running the Frontend
      
    $ cd frontend
    $ yarn or npm install 
    $ yarn start or npm start
    
If the frontend starts successfully, you will see the following in your terminal

    Compiled successfully!
    
    You can now view frontend in the browser.
    
      Local:            http://localhost:2370
      On Your Network:  http://192.168.8.103:2370
    
    Note that the development build is not optimized.
    To create a production build, use yarn build.

**Frontend Url:** `http://localhost:2370` 

## JA

Users can filter stories by type, also able to sort stories by ID, complexity, type, description, and status. 
I added features to the API, such as status, approval/decline of story, pending status.

