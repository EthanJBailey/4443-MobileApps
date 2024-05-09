# Libraries for FastAPI
from http.client import HTTPException
from fastapi import FastAPI, Query, Path, APIRouter
from fastapi import UploadFile, File
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from pymongo import MongoClient
from typing import List, Optional
from pydantic import BaseModel
from bson import ObjectId
from mongoManager import MongoManager
from datetime import datetime

import bcrypt
import shutil

# Builtin libraries
import os

from random import shuffle

"""
           _____ _____   _____ _   _ ______ ____
     /\   |  __ \_   _| |_   _| \ | |  ____/ __ \
    /  \  | |__) || |     | | |  \| | |__ | |  | |
   / /\ \ |  ___/ | |     | | | . ` |  __|| |  | |
  / ____ \| |    _| |_   _| |_| |\  | |   | |__| |
 /_/    \_\_|   |_____| |_____|_| \_|_|    \____/

The `description` is the information that gets displayed when the api is accessed from a browser and loads the base route.
Also the instance of `app` below description has info that gets displayed as well when the base route is accessed.
"""

description = """
## Description:
(This is for Assignment 4)

#### Contact Information:

- **Address:** Texas.
- **Phone:** (123) 968-7378 [or (123 you-bailey)]
- **Email:** bailey@comealong.site
- **Website:** www.comealong.site

"""

# Needed for CORS
# origins = ["*"]


# This is the `app` instance which passes in a series of keyword arguments
# configuring this instance of the api. The URL's are obviously fake.
app = FastAPI(
    title="Bailey-API",
    description=description,
    version="0.0.1",
    terms_of_service="http://www.comealong.site/worldleterms/",
    contact={
        "name": "comealong.site",
        "url": "http://www.comealong.site/worldle/contact/",
        "email": "bailey@www.comealong.site",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)

# Needed for CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

"""
  _      ____   _____          _         _____ _                _____ _____ ______  _____
 | |    / __ \ / ____|   /\   | |       / ____| |        /\    / ____/ ____|  ____|/ ____|
 | |   | |  | | |       /  \  | |      | |    | |       /  \  | (___| (___ | |__  | (___
 | |   | |  | | |      / /\ \ | |      | |    | |      / /\ \  \___ \\___ \|  __|  \___ \
 | |___| |__| | |____ / ____ \| |____  | |____| |____ / ____ \ ____) |___) | |____ ____) |
 |______\____/ \_____/_/    \_\______|  \_____|______/_/    \_\_____/_____/|______|_____/

This is where you will add code to load all the countries and not just countries. Below is a single
instance of the class `CountryReader` that loads countries. There are 6 other continents to load or
maybe you create your own country file, which would be great. But try to implement a class that 
organizes your ability to access a countries polygon data.
"""

mm = MongoManager(db="candy_store")

"""
  _      ____   _____          _        __  __ ______ _______ _    _  ____  _____   _____
 | |    / __ \ / ____|   /\   | |      |  \/  |  ____|__   __| |  | |/ __ \|  __ \ / ____|
 | |   | |  | | |       /  \  | |      | \  / | |__     | |  | |__| | |  | | |  | | (___
 | |   | |  | | |      / /\ \ | |      | |\/| |  __|    | |  |  __  | |  | | |  | |\___ \
 | |___| |__| | |____ / ____ \| |____  | |  | | |____   | |  | |  | | |__| | |__| |____) |
 |______\____/ \_____/_/    \_\______| |_|  |_|______|  |_|  |_|  |_|\____/|_____/|_____/

This is where methods you write to help with any routes written below should go. Unless you have 
a module written that you include with statements above.  
"""


"""
  _____   ____  _    _ _______ ______  _____
 |  __ \ / __ \| |  | |__   __|  ____|/ ____|
 | |__) | |  | | |  | |  | |  | |__  | (___
 |  _  /| |  | | |  | |  | |  |  __|  \___ \
 | | \ \| |__| | |__| |  | |  | |____ ____) |
 |_|  \_\\____/ \____/   |_|  |______|_____/

 This is where your routes will be defined. Routes are just python functions that retrieve, save, 
 delete, and update data. How you make that happen is up to you.
 
 Get candies by price range.
 Get candy with with a specified ID.
 Get a candy image.
 Update a candies price.
 Update a candies { ....... }
 Delete a candy.
"""

# Base Route
@app.get("/")
async def docs_redirect():
    """Api's base route that displays the information created above in the ApiInfo section."""
    return RedirectResponse(url="/docs")

# Get all candies.
@app.get("/candies")
def list_all_candies():
    """
    Retrieve a list of all candies available in the store.
    """
    mm.setCollection("candies")
    result = mm.get(filter={"_id": 0})
    return result

# Get a list of categories.
@app.get("/candies/category/")
def list_all_categories():
    """
    Get a list of candy categories
    """
    mm.setCollection("candies")
    result = mm.get(filter={"_id": 0, "category": 1},)
    return result
    
@app.get("/candies/category/{category}")
def candies_by_category(category: str, search_keyword: str = None):
    """
    Get candies within a certain category.
    """
    client = MongoClient()
    db = client['candy_store']
    collection = db['candies']
    
    query = {"category": {"$regex": category, "$options": "i"}}
    if search_keyword:
        query["$or"] = [
            {"name": {"$regex": search_keyword, "$options": "i"}},
            {"desc": {"$regex": search_keyword, "$options": "i"}}
        ]
    
    key_desc_candies = collection.find(query, {"_id": 0, "name": 1, "price": 1, "category": 1, "desc": 1})
    candies_list = list(key_desc_candies)
    return candies_list
    
# Get candies with a keyword in the description.
@app.get("/candies/{keyword}")
def get_candy_by_key_in_Description(keyword: str):
    """
    Get candies with a key word in the description.
    """
    client = MongoClient()
    db = client['candy_store']
    collection = db['candies']
    key_desc_candies = collection.find({"desc": {"$regex": keyword, "$options": "i"}},
                              {"_id": 0, "name": 1, "price": 1, "category": 1, "desc": 1,})
    candies_list = list(key_desc_candies)
    
    #if not candies_list:
    #   raise HTTPException(status_code=404, detail=f"No candies found with keyword '{keyword}' in the description")
    
    return candies_list

# Get candies with a key word in the name.
@app.get("/candies/{key}")
def get_candy_by_key_in_Name(key: str):
    """
    Retrieve a candy (or candies) by its name.

    Parameters:
    - `candy_name`: str - The name of the candy.
    
    Returns:
    - A candy document (or documents) with the specified name.
    """
    client = MongoClient()
    db = client['candy_store']
    collection = db['candies']
    
    key_candies = collection.find({"$and": [
        {"name": {"$regex": f"^{key}$", "$options": "i"}},
        {"desc": {"$exists": False}}
    ]},{"_id": 0, "name": 1, "price": 1, "category": 1, "desc": 1})

    key_list = list(key_candies)

    return key_list

# Get candies by price range.
@app.get("/candies/{upper_price}/{lower_price}")
def get_candy_by_price_range(upper_price: float, lower_price: float):
    """
    Get candies within a specified price range.
    """
    price_range_query = {"price": {"$gte": lower_price, "$lte": upper_price}}
    mm.setCollection("candies")
    rangeQuery = mm.get(
        query=price_range_query,
        filter={"_id": 0, "price": 1, "category_id": 1, "name": 1},
        sort_criteria={"price": -1},
    )
    return rangeQuery

    
# Get candy with with a specified ID.
@app.get("/candies/id/")
def get_candy_by_id(id: str):
    """
    Retrieve a candy by its unique ID.

    Parameters:
    - `id`: str - The unique identifier for the candy.
    
    Returns:
    - The candy document with the specified ID.
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"id": id}, filter={"_id": 0, "name": 1, "price": 1, "category": 1}
    )
    return result


# Update a candies based on a given key.
@app.put("/candies/update")
def update_candy_info(id: str, key: str, val: str):
    """
    Update the details of a specific based on a given key.
    """
    mm.setCollection("candies")
    print(id,key,val)
    mm.put({"id": id}, {key: val})
    return {"message": "Candy updated successfully"}
   
# Delete a candy.
@app.delete("/candies/")
def delete_candy(candy_id: str):
    """
    Remove a candy from the store's inventory.
    """
    client = MongoClient()
    db = client['candy_store']
    collection = db['candies']
    result = collection.delete_one({"id": candy_id})
    return {"message": "Candy deleted successfully"}


# Data models
class UserCreate(BaseModel):
    firstName: str
    lastName: str
    username: str
    email: str
    password: str
    
class TempUserCreate(BaseModel):
    email: str
    password: str
    
# Register user route
@app.post("/api/register")
async def register_user(user: UserCreate):
    # Initialize MongoDB client)
    client = MongoClient()
    db = client["caribcoffee"]
    users_collection = db["users"]
    
    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    
    # Create the new user with hashed password
    new_user = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "username": user.username,
        "email": user.email,
        "password": hashed_password.decode('utf-8')  # Store the hashed password in the database
    }
    
    # Insert the new user into the database
    result = users_collection.insert_one(new_user)
    if result.inserted_id:
        return {"message": "User created successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to create user")

# Login user route
@app.post("/api/login")
async def login_user(credentials: TempUserCreate):
    # Initialize MongoDB client)
    client = MongoClient()
    db = client["caribcoffee"]
    users_collection = db["users"]
    # Extract email and password from request body
    email = credentials.email
    password = credentials.password
    
    # Query the database to retrieve user by email
    existing_user = users_collection.find_one({"email": email})
    
    if existing_user:
        # Check if the provided password matches the hashed password in the database
        if bcrypt.checkpw(password.encode('utf-8'), existing_user['password'].encode('utf-8')):
            return {"success": True, "message": "User logged in successfully"}
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password")
    else:
        raise HTTPException(status_code=401, detail="User not found")

# Login user route
@app.post("/api/login")
async def login_user(credentials: TempUserCreate):
    # Extract email and password from request body
    email = credentials.email
    password = credentials.password
    
    # Query the database to retrieve user by email
    existing_user = users_collection.find_one({"email": email})
    
    if existing_user:
        # Check if the provided password matches the hashed password in the database
        if bcrypt.checkpw(password.encode('utf-8'), existing_user['password'].encode('utf-8')):
            return {"success": True, "message": "User logged in successfully"}
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password")
    else:
        raise HTTPException(status_code=401, detail="User not found")

class UserCreate3(BaseModel):
    user_id: str
    first_name: str
    last_name: str 
    
@app.post("/api/user")
def create_generic_user(user: UserCreate3):
    """
    Create a generic user.
    """
    mm = MongoManager(db="caribcoffee")
    mm.setCollection("user")
    # Save the user location data to your database
    # Here, you would use your MongoManager to insert the data into the appropriate collection
    mm.post({
        "user_id": user.user_id,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })
    return {"message": "User location created successfully"}

class UserLocationCreate(BaseModel):
    user_id: str
    latitude: float
    longitude: float

@app.post("/api/user_location")
def create_user_location(user_location: UserLocationCreate):
    """
    Create a user location entry.
    """
    mm = MongoManager(db="caribcoffee")
    mm.setCollection("location")
    # Save the user location data to your database
    # Here, you would use your MongoManager to insert the data into the appropriate collection
    mm.post({
        "user_id": user_location.user_id,
        "latitude": user_location.latitude,
        "longitude": user_location.longitude,
        "timestamp": datetime.utcnow()
    })
    return {"message": "User location created successfully"}

# @app.get("/api/user_locations")
# def get_user_locations():
#     """
#     Retrieve a list of all locations.
#     """
#     client = MongoClient()
#     db = client['caribcoffee']
#     collection = db['location']
    
#     # Projection to include only the specified fields and exclude the _id field
#     projection = {"_id": 0, "user_id": 1, "latitude": 1, "longitude": 1}
    
#     # Fetch locations with the specified projection
#     locations = collection.find({}, projection)
    
#     # Convert cursor to list
#     locations_list = list(locations)
    
#     return locations_list


@app.get("/api/user_locations")
def get_user_locations():
    """
    Retrieve a list of all locations with user first and last names.
    """
    client = MongoClient()
    db = client['caribcoffee']
    location_collection = db['location']
    user_collection = db['user']
    
    # Projection to include only the specified fields and exclude the _id field
    location_projection = {"_id": 0, "user_id": 1, "latitude": 1, "longitude": 1}
    
    # Fetch locations with the specified projection
    locations = location_collection.find({}, location_projection)
    
    # Convert cursor to list
    locations_list = list(locations)
    
    # Iterate over locations and add user first and last names
    for location in locations_list:
        # Fetch user data based on user_id
        user_data = user_collection.find_one({"user_id": location["user_id"]}, {"_id": 0, "first_name": 1, "last_name": 1})
        if user_data:
            # Add user first and last names to location data
            location["first_name"] = user_data.get("first_name", "")
            location["last_name"] = user_data.get("last_name", "")
        else:
            # If user data not found, set first_name and last_name to None
            location["first_name"] = None
            location["last_name"] = None
    
    return locations_list


########################################################
#
# NEW COFFEE ROUTES 
#
#
@app.get("/coffee")
def search_coffee(category: str = None, keyword: str = None, price_range: str = None):
    """
    Search for coffee recipes based on category, keyword, and price range.
    """
    client = MongoClient()
    db = client['caribcoffee']
    collection = db['coffee']
    
    query = {}
    if category:
        query["category"] = {"$regex": category, "$options": "i"}
    if keyword:
        query["$or"] = [
            {"name": {"$regex": keyword, "$options": "i"}},
            {"description": {"$regex": keyword, "$options": "i"}}
        ]
    if price_range:
        # Split the price range string into min and max prices
        min_price, max_price = map(float, price_range.split('-'))
        query["price"] = {"$gte": min_price, "$lte": max_price}
    
    coffee_recipes = collection.find(query, {"_id": 0})
    coffee_list = list(coffee_recipes)
    return coffee_list


@app.get("/coffee/categories")
def get_coffee_categories():
    """
    Get unique coffee recipe categories.
    """
    client = MongoClient()
    db = client['caribcoffee']
    collection = db['coffee']
    
    categories = collection.distinct("category")
    return categories

@app.get("/coffee/price_ranges")
def get_coffee_price_ranges():
    """
    Get available price ranges for coffee recipes.
    """
    client = MongoClient()
    db = client['caribcoffee']
    collection = db['coffee']
    
    price_ranges = collection.aggregate([
        {"$group": {
            "_id": None,
            "min_price": {"$min": "$price"},
            "max_price": {"$max": "$price"}
        }}
    ])
    price_range = list(price_ranges)[0]
    return price_range

######################################################################
# POSTS 
#

# CORS middleware to allow requests from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route to upload image files
@app.post("/recipe/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded file to a directory
        with open(f"/var/www/html/images/{file.filename}", 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Return the uploaded image filename
        return {"filename": file.filename, "message": "Image uploaded successfully"}
    except Exception as e:
        return {"message": f"Failed to upload image: {str(e)}"}

    
# Define a model for the post data
class Post(BaseModel):
    title: str
    description: str
    image: str
    category: str
    
# Route to create a new post without image upload
@app.post("/recipe/posts")
async def create_post(post: Post):
    try:
        # Simulating MongoDB connection and post creation code
        mm = MongoManager(db="caribcoffee")
        mm.setCollection("posts")
        
        # Save the post data to the database
        mm.post({
            "title": post.title,
            "description": post.description,
            "image": post.image,
            "category": post.category
        })
        
        # Return success message
        return {"message": "Post created successfully"}
    except Exception as e:
        # Return error message if an exception occurs
        return {"message": f"Failed to create post: {str(e)}"}

# Route to fetch all posts
@app.get("/recipe/posts", response_model=List[Post])
def get_posts():
    # MongoDB connection
    client = MongoClient()
    db = client['caribcoffee']
    collection = db['posts']
    # Fetch all posts from the database
    posts = list(collection.find())
    return posts

# class UserLocation(BaseModel):
#     user_id: str
#     first_name: str
#     last_name: str
#     latitude: float
#     longitude: float

# Endpoint to fetch user locations
# @app.get("/api/user_locations")
# def get_user_locations():
#     """
#     Retrieve a list of all user locations.
#     """
#    # Set up MongoDB collections
#     mm_user = MongoManager(db="caribcoffee")
#     mm_user.setCollection("user")

#     mm_locations = MongoManager(db="caribcoffee")
#     mm_locations.setCollection("location")

#     # Fetch user data
#     user_query = {"user_id": 1, "first_name": 1, "last_name": 1}
#     users = mm_user.get(query=user_query)
     
#     # Fetch location data
#     location_query = {"user_id": 1, "latitude": 1, "longitude": 1}
#     locations = mm_location.get(query=location_query)
        
#     # Create a dictionary to store user locations
#     user_locations = {}
        
#     # Populate user locations dictionary
#     for user in users["data"]:
#         user_id = user["user_id"]
#         user_locations[user_id] = {
#             "user_id": user_id,
#             "first_name": user["first_name"],
#             "last_name": user["last_name"],
#             "latitude": None,
#             "longitude": None
#         }
        
#     # Update user locations with latitude and longitude
#     for location in locations["data"]:
#         user_id = location["user_id"]
#         if user_id in user_locations:
#             user_locations[user_id]["latitude"] = location["latitude"]
#             user_locations[user_id]["longitude"] = location["longitude"]
        
#     return user_locations
    
# @app.get("/api/user_locations")
# def get_user_locations() -> List[UserLocation]:
#     """
#     Fetch user name and locations.
#     """
#     # Set up MongoDB collections
#     mm_user = MongoManager(db="caribcoffee")
#     mm_user.setCollection("user")

#     mm_locations = MongoManager(db="caribcoffee")
#     mm_locations.setCollection("location")

#     # MongoDB aggregation query to join users and locations collections
#     pipeline = [
#         {
#             "$lookup": {
#                 "from": "location",          # The collection to join
#                 "localField": "user_id",     # Field from the users collection
#                 "foreignField": "user_id",   # Field from the locations collection
#                 "as": "user_location"        # Output array field that contains the joined records
#             }
#         },
#         {
#             "$unwind": "$user_location"    # Deconstructs the array field from the output to output a document for each element
#         },
#         {
#             "$project": {                   # Define the structure of the output documents
#                 "_id": 0,                   # Exclude this field
#                 "user_id": "$user_id",      # Include user_id
#                 "first_name": "$first_name",# Include first_name
#                 "last_name": "$last_name",  # Include last_name
#                 "latitude": "$user_location.latitude",    # Include latitude from the joined data
#                 "longitude": "$user_location.longitude"   # Include longitude from the joined data
#             }
#         }
#     ]

#     # Execute the aggregation query
#     user_locations = mm_user.aggregate(pipeline)

#     return user_locations


"""
This main block gets run when you invoke this file. How do you invoke this file?

        python api.py 

After it is running, copy paste this into a browser: http://142.93.185.100:8080 

You should see your api's base route!

Note:
    Notice the first param below: api:app 
    The left side (api) is the name of this file (api.py without the extension)
    The right side (app) is the bearingiable name of the FastApi instance declared at the top of the file.
"""
if __name__ == "__main__":
    uvicorn.run(
        "api:app", host="142.93.185.100", port=8084, log_level="debug", reload=True
    )
"""                                   ^
                                      |
CHANGE DOMAIN NAME                    |              

"""