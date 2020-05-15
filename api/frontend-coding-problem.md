# Frontend Evaluation

### Summary
Consider you are trying to build a front-end app for an application that has the option of creating a User Story (i.e ticket or card). The App contains information about what kind of task needs to be performed. The Admin will review the User Story and make changes if required. The Admin will also be able to approve or reject the User story created by the user.

Please assume that there is already a backend application running and you are building the frontend application which talks to the backend application through REST APIs.
  
### Context  
The application will have 2 different user roles.    
 - User  
 - Admin  
  
Each role has its own set of functionalities.  
  
### Tasks
**Login as admin or normal user:** Create a login page with following components:
1.  Email ID input field
2.  Password field
3.  Submit button
4.  A toggle button to login as admin or normal user

On the click of submit button make a call to login API which will return an authentication token as response. You will find more details in the swagger documentation.

Once logged in; based on the userRoles, the user should navigate to either create a story option when logged in as a user, or see the stories available for review if logged in as an Admin. 


### Creating a Story as user:
Once logged in, a user of the platform should be able to create a User Story, (i.e a ticket or card) which will contain the information about the task which needs to be performed by the developer. 

-   Summary (Input field)
-   Description (Text area)
-   Type (like enhancement, bugfix, development, QA) (Dropdown)
-   Complexity (Dropdown with values: Low, Mid, High)
-   Estimated time for completion (Input)
-   Cost associated to it (numeric Input showing $ as prefix of input)

Design a page with with the above inputs controls and a SUBMIT button. On Submit, validate the form and call Create Story API.

Once the story is created take the user to story list page.

### User Story List
 Create a list page with the following columns to show the stories created by the logged in user:

-   ID
-   Summary
-   Description
-   Type
-   Complexity
-   Estimated time for completion
-   Cost

The user should be able to sort the stories by the Story ID and complexity. To keep it simple, sorting will be done based only one column at a time, no chaining is needed.

The user should be able to filter the stories by type

### Admin Story List
When logged in as Admin, the admin should be able to see all the stories. The story list will be the same as the users list view.

-   ID
-   Summary
-   Description
-   Type
-   Complexity
-   Estimated time for completion
-   Cost

**NOTE:** If for a story the status is ‘rejected’ then the particular story row color should be **RED**, if the status is accepted then row should be in **GREEN** else the row color should be **BLACK**


### Admin Story Review
As an Admin, he/she should be able to see the story details page when clicked on a row. Admin can either approve or reject the user story.
Elements on Page

1.  Read only fields for the following fields

	- Summary
	- Description
	- Type
	- Complexity
	- Estimated time for completion
	- Cost
	- Status

2.  Two buttons Accept(Green color) and Reject (Red color)
    
On Accept or Reject, take the admin to the story list view with updated status.

# Process

1.  Please design the UI as per what you feel is right.
2.  Design should be responsive and work on both desktop and mobile browser.
3.  All pages should have separate routes and when we refresh the browser, it should remain on the same page if authenticated.
4.  On App launch you need to check if the user is logged in. If not logged in, then show the login page.
5.  Usage of redux is encouraged but not mandatory.
6.  Please upload the working copy of your code to GitHub and send us the link .
7.  Please state all your assumptions in the readme file of your GitHub repository.

As a Bonus, it will be highly appreciated if you can also provide Javascript based unit tests for your front-end code.

### API Documentation
Please refer the [Readme](./README.md) documentation from API details.
  



