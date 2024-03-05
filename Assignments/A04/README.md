## Assignment 4 - Mongo DB Configuration
### Ethan Bailey
### Description:

In this assignment, I undertook the task of setting up a server and configuring MongoDB. The process involved several steps:

#### Populating MongoDB:

I uploaded relevant files to my own server to populate the MongoDB database.
After uploading, I ran the loadMongo.py script to create the "candy_store" database and the "candies" collection, ensuring that the database was ready to store candy-related information.

#### Creating New Routes:

With MongoDB set up, I edited the routes in the api.py file to tailor them specifically to the candy database.
I implemented various query routes to perform tasks such as retrieving all candies, fetching candies in a specific category, searching for candies by keyword in the description or name, retrieving candies by price range, and more.

#### Registering API:

To ensure continuous availability, I followed provided instructions to register the API with the server.
This registration process helped in keeping the API up and running consistently, ensuring users could access the candy-related information at any time.

#### Testing:
I also created an apiTest.py file to write tests for my API endpoints. These tests ensure that each route functions as expected and returns the correct data.
These tests cover scenarios such as querying for candies, categories, updating candy information, deleting candies, and more.

#### Requirements:
- My API is accessible at http://142.93.185.100:8084/docs#/.
- All specified routes should be functional, allowing users to interact with the candy database seamlessly.
