from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Query(BaseModel):
    question: str
    user_ip: str
    latitude: str
    longitude: str

@app.post("/ask")
async def ask(query: Query):
    # Mock response for demonstration
    if query.question.lower() == "what is the temperature in diu?":
        return {"result": "The temperature in Diu is 28°C."}
    else:
        raise HTTPException(status_code=404, detail="Query not understood")

# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import motor.motor_asyncio
# from geopy.distance import geodesic

# # Initialize FastAPI app
# app = FastAPI()

# # MongoDB Configuration
# MONGO_URI = "mongodb://localhost:27017"
# client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
# db = client.geospatial  # Database
# places_collection = db.places  # Collection for places

# # Request and Response Models
# class ChatRequest(BaseModel):
#     user_message: str
#     center_location: tuple[float, float]  # (latitude, longitude)
#     max_distance_km: float  # Max distance in kilometers

# class Place(BaseModel):
#     name: str
#     coordinates: tuple[float, float]  # (latitude, longitude)
#     description: str

# # Dummy data loader (streaming example)
# @app.on_event("startup")
# async def load_data():
#     """Loads geospatial data into MongoDB."""
#     await places_collection.delete_many({})  # Clear existing data
#     dummy_data = [
#         {"name": "Central Park", "coordinates": (40.785091, -73.968285), "description": "A large public park in NYC"},
#         {"name": "Empire State Building", "coordinates": (40.748817, -73.985428), "description": "A skyscraper in NYC"},
#         {"name": "Brooklyn Bridge", "coordinates": (40.706086, -73.996864), "description": "A bridge connecting Manhattan and Brooklyn"},
#     ]
#     for place in dummy_data:
#         await places_collection.insert_one(place)

# # Root route
# # Redirect root URL to the login page
# @app.get("/")
# async def root():
#     return RedirectResponse(url="/app/src/login")

# # Dummy login route (example)
# @app.get("/app/src/login")
# async def login_page():
#     return {"message": "This is the login page."}
# # Chat route
# @app.post("/chat")
# async def chat(request: ChatRequest):
#     user_message = request.user_message.lower()
    
#     # Fetch geospatial data based on distance
#     center = request.center_location
#     max_distance = request.max_distance_km

#     async def filter_places():
#         """Filter places within max_distance from the center."""
#         async for place in places_collection.find():
#             place_coords = tuple(place["coordinates"])
#             if geodesic(center, place_coords).km <= max_distance:
#                 yield place

#     if "find places" in user_message:
#         results = []
#         async for place in filter_places():
#             results.append({
#                 "name": place["name"],
#                 "coordinates": place["coordinates"],
#                 "description": place["description"]
#             })
#         if results:
#             return {"response": "Here are the places within your range:", "places": results}
#         else:
#             return {"response": "No places found within the specified distance."}
    
#     return {"response": "I can help you find places within a distance. Try 'find places'!"}
