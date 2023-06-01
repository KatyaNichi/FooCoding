## Start project

1. Install Node.js: Make sure you have Node.js installed on your computer.
2. Install Dependencies: Open the terminal or command prompt and navigate to the folder containing the file. Run the following command to install the required dependencies:
   npm install express mysql2
3. Set up the MySQL Database: Make sure you have the database named "new_world" and configure the MySQL connection details (host, user, password) in the code accordingly.
4. Run the File: node index.js
5. Access the API: The application will start a server on port 4000. You can access the API endpoints using a web browser or tools like Postman.
   The URLs will be in the format: http://localhost:4000/endpoint.
   What is the capital of country X ? http://localhost:4000/1/Ukraine
   List all the languages spoken in the region Y http://localhost:4000/2/Caribbean
   Find the number of cities in which language Z is spoken http://localhost:4000/3/Russian
   List all the continents with the number of languages spoken in each continent http://localhost:4000/4/
   For the country given as input, is there any countries that have the same official language is in the same continent http://localhost:4000/5/Germany

6. Terminate the Server: To stop the server, you can press Ctrl + C in the terminal or command prompt. This will gracefully shut down the server and close the MySQL connection.
