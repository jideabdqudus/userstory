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
      
    $ cd frontent
    $ yarn
    $ yarn start
    
If the frontend starts successfully, you will see the following in your terminal

    Compiled successfully!
    
    You can now view frontend in the browser.
    
      Local:            http://localhost:2370
      On Your Network:  http://192.168.8.103:2370
    
    Note that the development build is not optimized.
    To create a production build, use yarn build.

**Frontend Url:** `http://localhost:2370` 

## Note

- I updated the Mock API and added status to the mock stories

- I assumed that the major task of the Admin will be Reviewing of User Stories for Acceptance and Rejection, hence on the Admin dashboard, when there are pending stories, only the pending stories are displayed. When there are no pending stories, All user stories are listed

- I assumed that an Admin would not be creating Stories, hence an Admin doesn't see the `Create Story` Button. If an admin navigates to the Create Story url, an error notification is shown and the admin is redirected to the Stories Page

- The API doesn't make provision for Approval/Decline off the User Story, hence I updated the api with a new route that handles the approval and rejection of stories

- I assumed that when a user created a story, the default status should be `pending`, hence I updated the mock api to append `pending` to newly created stories

- I observed that the API doesn't use the amount and estimates hours from the request body, in order for this not to be a blocker, I updated the mock api 

- On the Stories List page, a user is able to alphabetically sort the stories by ID, Complexity, Type and Status  

- On the Stories List page, a user is able to filter stories by Type  