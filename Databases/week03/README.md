## ToDo App API Documentation

This documentation provides step-by-step instructions on how to use the ToDo App API, including the installation process, available endpoints, and examples of request objects. The ToDo App API is designed to support multiple users and provides various functionalities to manage ToDo lists and items.

To use the ToDo App API, you need to have the following installed:

Node.js
npm (Node Package Manager)
Postman (for testing the APIs)

### Installation

1. Clone the repository from GitHub
2. Navigate to the project directory
3. Install the required dependencies:
   npm install
4. Start the server:
   npm start

The server will start running on http://localhost:4000

## API Endpoints

1. Insert item(s) in ToDo list
   Endpoint: POST /create-item

Example request URL: http://localhost:4000/create-item

Example request body: {
"itemName": "Soup",
"isCompleted": false,
"listId": 2
}

2. Delete item(s) in ToDo list
   Endpoint: DELETE /delete/item/:itemID

Example request URL: http://localhost:4000/delete/item/7

3. Create a new ToDo list
   Endpoint: POST /create-list

Example request URL: http://localhost:4000/create-list

Example request body: {
"listName": "Reading",
"reminder": "2076-01-12",
"userId": 5
}

4. Delete a ToDo list
   Endpoint: DELETE /delete/:listId

Example request URL: http://localhost:4000/delete/11

5. Mark an item as completed and/or change name of a todo item.
   Endpoint: PUT /update/item

Example request URL: http://localhost:4000/update/item

Example request body: {
"isCompleted": true,
"itemID": 5,
"itemName":"Buy bread"
}

6. Add or update the reminder to the list
   Endpoint: PUT /add/reminder-to-list

Example request URL: http://localhost:4000/add/reminder-to-list

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
