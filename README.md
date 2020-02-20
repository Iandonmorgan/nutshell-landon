# The Pernicious Paydays Nutshell Dashboard
​
## Setup: Follow these steps exactly
​
1. Clone this repository
1. Load or create a `database.json` file in the `api` directory
1. run `json-server -p 8088 -w database.json` from `api` directory in terminal
1. run `hs -o` from `src` directory in terminal
​
## Summary
​
Nutshell is a new product offering. It's a dashboard for people to use to organize their daily tasks, events, news article, friends, and chat messages.
​
Full functionality exists with this version, excluding "friends" relationships. This app does not utilize real authentication. It is a simulation of it using Vanilla JavaScript, Session Storage, and local database.json file. Skills and concepts utilized, below.
​
1. Functions
1. Databases/API ([JSON Server Documentation](https://github.com/typicode/json-server))
1. Github
1. Objects
1. CSS/Flexbox
1. Array methods
1. Handling user events
1. Factory functions
1. Implementing CRUD operations
1. Modular code with Webpack
1. Relational data
​
## How to LOGIN
1. Enter a valid email address or username into the username field. Enter a valid password into the password field, click `LOGIN`.
​
## How to CREATE A NEW USER ACCOUNT
1. Click "create a new user account" from the login page.
1. Enter a unique username into the username field.
1. Enter a unique email address into the email field.
1. Enter a password into the password field.
1. Enter the same password into confirm password field.
1. Enter a URL into the photo URL field for your user photo.
1. Click `CREATE NEW ACCOUNT`
​
## How to use CHAT
• Click `LOGIN TO CHAT`
• Type a message into the chat input field; click `SUBMIT`
• Click `EDIT` to edit a previously posted message created from your user account.
   • Once `EDIT` is clicked, you will have an option to `CANCEL` or `SAVE` changes entered into newly formed input field.
• Click `DELETE` to remove a previously posted message created from your user account.
• Scroll upward in the chatlog by using two-finger trackpad gesture, or mouse + scroll bar.
​
## How to use EVENTS
• Your Event Itinerary is displayed below the CHAT window in sequential order from Soonest to Latest.
  • Your nextmost event will be displayed with a lavender background.
• Click `NEW EVENT` to open Event Input Form
  • Type an Event Name, Event Date, Event Location, Street Adress, City, State and Zip Code into the appropriate input fields; click `SAVE EVENT` to add the Event to your Event List.
  • Click `CANCEL` to remove the Event Input Form from view.
• Click `EDIT` to edit a previously posted Event on your Event Itinerary.
   • Once `EDIT` is clicked, the Event Input Form will appear at the top of the Event Itinerary, complete with your Event details. You will have an option to `CANCEL` or `SAVE EVENT` changes entered into newly formed input field.
• Click `DELETE` to remove a previously posted Event from your Event Itinerary.
​
## How to use TASKS

•  When user clicks on `TASKS` button, a form will populate the DOM allowing the user to create a new task.
  •  User can then enter a task name and expected completion date, and then click the `SAVE TASK` button to add that task to the database.
•  User can view all incomplete tasks by clicking `VIEW TASKS` button.
  •  User can mark a task `COMPLETE` when checkbox is clicked, and the next time `VIEW TASKS` button is clicked the user will not see that completed task anymore.
  •  User can delete an incomplete task by clicking `DELETE` button and remove that task from the database.
  •  User can edit an incomplete task's name by clicking on the task name in the tasks list, and then update the name in the input field, which will then replace the original name in the database when the user clicks the enter key.
​
## How to use NEWS ARTICLES

• Click on the `NEW ARTICLE` button to launch the form for adding a new article. 
  • Fill out the form and click `SAVE`, this will add a new article to the dashboard.
  • The `CANCEL` button will clear any data, and hide the form. 
• To modify an existing news article, you can either `EDIT` or `DELETE`
  • `EDIT` will launch the form, pre-populated with the data to be edited. Clicking `SAVE` will update that News Article in the dashboard. 
  • `DELETE` will remove the News Article, which requires the user to confirm deletion.
​
## How to LOGOUT
1. Click the `LOGOUT` button in the upper right corner of the page.
​
## FUTURE FEATURE REQUESTS
​
- USER AUTH
    - add keypress listener (keycode 13 functionality) from login page
​
- CHAT
    - chat refresh button (reload chat room)
    - chat logout button
    - user logged into chat notification
    - user logged out of chat notification
    - auto sizing for chat input
    - include photoURL info to 
​
- TASKS
    - display tasks on page load
    - hide tasks functionality
    - Confirmation notice for Tasks delete
    - View completed tasks?
    - save task event
        - clear task form with save task click
        - refresh view tasks with save task click
​
- FRIENDS
    - Friends functionality (MVP)
​
- ARTICLES
    - View Articles / Hide Articles functionality
    - expanded text field when inputting synopsis
​
## BUGS
​
- no known bugs