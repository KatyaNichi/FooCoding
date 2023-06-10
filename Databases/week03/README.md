## ToDo App API Documentation

This documentation provides step-by-step instructions on how to use the ToDo App API, including the installation process, available endpoints, and examples of request objects. The ToDo App API is designed to support multiple users and provides various functionalities to manage ToDo lists and items.

To use the ToDo App API, you need to have the following installed:

Node.js
npm (Node Package Manager)
Postman (for testing the APIs)

### Installation

1. Clone the repository from GitHub
2. Navigate to the project directory
3. Configure the MySQL connection
4. Install the required dependencies:
   npm install
5. Start the server:
   npm start

The server will start running on http://localhost:4000

## API Endpoints

1. Insert item(s) in ToDo list
   Endpoint: POST /listId/create-item

Example request URL: http://localhost:4000/6/create-item

Example request body: {
"itemName": "Soup",
"isCompleted": false
}

2. Delete item(s) in ToDo list
   Endpoint: DELETE /delete/item

Example request URL: http://localhost:4000/delete/item

Example request body:

{
"itemID": 3
}

3. Create a new ToDo list
   Endpoint: POST /:userId/create

Example request URL: http://localhost:4000/2/create

Example request body: {
"listName": "Reading",
"reminder": "2076-01-12"
}

4. Delete a ToDo list
   Endpoint: DELETE /delete

Example request URL: http://localhost:4000/delete

Example request body: {
"listId": 9
}

5. Mark an item as completed and/or change name of a todo item.
   Endpoint: PUT /update/item

Example request URL: http://localhost:4000/update/item

Example request body: {
"isCompleted": true,
"itemName": "Ice cream",
"itemID": 5
}

6. Add a reminder for the list
   Endpoint: PUT /add-reminder-to-list

Example request URL: http://localhost:4000/add-reminder-to-list

Example request body: {
"listId": 6,
"reminder": "2024-11-11"
}

7. Add a new user
   Endpoint: POST /users
   Example request URL: http://localhost:4000/users

Example request body: {
"email": "amanda@example.com",
"password": "098",
"firstName": "Amanda",
"lastName": "Black"
}

8. Add a tag to list
   Endpoint: POST /add/tag
   Example request URL: http://localhost:4000/add/tag

Example request body: {
"listID": 8,
"tagName": "Not important"
}

9. Display all users
   Endpoint: GET /
   Example request URL: http://localhost:4000/

10. Display all lists from the database
    Endpoint: GET /lists
    Example request URL: http://localhost:4000/lists

11. Display all todo items
    Endpoint: GET /items
    Example request URL: http://localhost:4000/items