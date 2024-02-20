# Libraries for FastAPI
from http.client import HTTPException
from fastapi import FastAPI, Query, Path
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from pymongo import MongoClient
from typing import List
from pydantic import BaseModel
from bson import ObjectId
from mongoManager import MongoManager

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

#  Get candies in a specific category.
@app.get("/candies/category/{category}")
def candies_by_category(category: str):
    """
    Retrieve all candies in a specific category.

    Parameters:
    - `category_name`: str - The name of the category.
    
    Returns:
    - A list of candy documents within the specified category.
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"category": category},
        filter={"_id": 0, "name": 1, "price": 1, "category": 1},
    )
    return result

# Get candies with a keyword in the description.
@app.get("/candies/{keyword}")
def get_candy_by_key_in_Desc(keyword: str):
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
@app.get("/candies/id/{id}")
def get_candy_by_id(id: str):
    """
    Retrieve a candy by its unique ID.

    Parameters:
    - `candy_id`: str - The unique identifier for the candy.
    
    Returns:
    - The candy document with the specified ID.
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"id": id}, filter={"_id": 0, "name": 1, "price": 1, "category": 1}
    )
    return result

# Get a candy image.
@app.get("/candies/image")
def get_candy_image(candy_id: str):
    """
    Get the image URL for a specific candy given an ID.
    """
    image_url = f"http://142.93.185.100:8084/{candy_id}.jpg"
    print(image_url)
    return {}

# Update a candies price.
@app.put("/candies/price")
def update_candy_price(id: str, new_price: float):
    """
    Update the price of a specific candy.
    """
    result = mm.put2("_id", id, "price", new_price)
    if result["success"]:
        return {"message": "Price updated successfully"}
   

# Update a candies description
@app.put("/candies/desc")
def update_candy_description(id: str, new_description: str):
    """
    Update the description of a specific candy.
    """
    result = mm.put2("_id", id, "desc", new_description)
    if result["success"]:
        return {"message": "Description updated successfully"}
   
# Delete a candy.
@app.delete("/candies/")
def delete_candy(candy_id: str):
    """
    Remove a candy from the store's inventory.
    """
    client = MongoClient()
    db = client['candy_store']
    collection = db['candies']
    result = collection.delete_one({"_id": ObjectId(candy_id)})
    
    return {"message": "Candy deleted successfully"}

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