# CLI Application for API Interaction

This command-line interface (CLI) application allows you to interact with an API to perform various operations on users and posts.

## Usage:

1. Open a terminal or command prompt.

2. Navigate to the project directory.

3. Install the dependencies by running the following command:

4. Run the CLI application using the following command:
   node cli_handler.js

5. Follow the prompts to interact with the API.

## Command Line Arguments

The CLI application supports the following command line arguments:

--resource <resource>: Specifies the resource to work with (users or posts).
--method <method>: Specifies the HTTP method to use (DELETE, GET, PATCH, POST).
--id <id>: Specifies the ID of the user or post when performing operations by ID.
--all: Used with the GET method to get all users or posts.
If the command line arguments are provided, the application will use them directly. Otherwise, it will prompt you to enter the required information.

## Examples

### To work with users and make a GET request to retrieve all users:

node cli_handler.js --resource users --method GET --all

### To work with posts and make a GET request to retrieve a post by ID:

### node cli_handler.js --resource posts --method GET --id 5

### To work with users and create a new user using a POST request:

node cli_handler.js --resource users --method POST

### To work with users and modify the user using a PATCH request:

node cli_handler.js --resource users --method PATCH

### To work with posts and delete the post using a DELETE request:

node cli_handler.js --resource posts --method DELETE --id 5
