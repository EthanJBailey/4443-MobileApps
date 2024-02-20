## Assignment 4 - Mongo DB Configuration
### Ethan Bailey
### Description:

In this assignment, I undertook the task of setting up a server and configuring MongoDB. The process involved several steps:

Populating MongoDB:

I uploaded relevant files to my own server to populate the MongoDB database.
Options for uploading included drag and drop, Git clone, or using rsync.
After uploading, I ran the loadMongo.py script to create the "candy_store" database and the "candies" collection, ensuring that the database was ready to store candy-related information.
Creating New Routes:

With MongoDB set up, I edited the routes in the api.py file to tailor them specifically to the candy database.
I implemented various query routes to perform tasks such as retrieving all candies, fetching candies in a specific category, searching for candies by keyword in the description or name, retrieving candies by price range, and more.
Registering API:

To ensure continuous availability, I followed provided instructions to register the API with the server.
This registration process helped in keeping the API up and running consistently, ensuring users could access the candy-related information at any time.
Requirements:
Create a folder named "A04" in the Assignments folder and on the server under the root folder.
Place MongoDB classes and API code in the "A04" folder.
Ensure that the API is accessible at http://your.ip.address:8080.
All specified routes should be functional, allowing users to interact with the candy database seamlessly.