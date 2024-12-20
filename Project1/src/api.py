# import logging
# from fastapi import FastAPI
# from pydantic import BaseModel
# from src.main import setup_system, get_answer

# # Initialize logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# app = FastAPI()

# # Initialize the system when the server starts (only once)
# @app.on_event("startup")
# async def startup_event():
#     logger.info("Starting the system setup process...")
#     setup_system("data\data1.csv")
#     logger.info("System setup complete.")

# # Define a request body model
# class QueryModel(BaseModel):
#     question: str

# # Define an endpoint to answer questions
# @app.post("/ask")
# async def ask_question(query: QueryModel):
#     try:
#         logger.info(f"Received query: {query.question}")
#         answer = get_answer(query.question)
#         # return {"retrieved_documents": answer["retrieved_documents"], "answer": answer["llm_response"]}
#         return {"answer":answer}
#     except Exception as e:
#         logger.error(f"Error processing the query: {e}")
#         return {"error": str(e)}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.main import setup_system, get_answer
import logging
import os 

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend's domain (e.g., http://localhost:3000)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


def check_files_in_folder(folder_path):
    """
    Check if there are files other than 'dat.csv' and 'data.csv' in the 'data' folder.

    Args:
        folder_path (str): Path to the folder containing the 'data' subfolder.

    Returns:
        (bool, str): A tuple containing a boolean indicating if any such file exists,
                     and the full path of the other file (or None if no other files are found).
    """
    data_folder_path = os.path.join(folder_path, 'data')
    logger.info(f"Checking folder: {data_folder_path}")
    
    if not os.path.exists(data_folder_path):
        logger.error("Data folder does not exist.")
        return False, None  # If 'data' folder does not exist, return False and None.

    # List all files in the 'data' folder
    files = [file for file in os.listdir(data_folder_path) if os.path.isfile(os.path.join(data_folder_path, file))]
    logger.info(f"Files found in the folder: {files}")
    
    # Exclude 'dat.csv' and 'data.csv' for files of interest
    other_files = [file for file in files if file not in ('data.csv', 'data1.csv')]
    
    if other_files:
        other_file_path = os.path.join(data_folder_path, other_files[0])
        logger.info(f"Found other file: {other_file_path}")
        return True, other_file_path
    else:
        logger.info("No other files found.")
        return False, None

@app.on_event("startup")
async def startup_event():
    logger.info("Starting the system setup process...")
    # folder_path = 'C:\\Users\\karta\\Desktop\\geo-chatbot\\Project1'
    # has_other_files, other_files = check_files_in_folder(folder_path)
    # logger.info(f"Has other files: {has_other_files}, File: {other_files}")
    
    # if has_other_files:
    #     setup_system(other_files)
    # else:
    setup_system("data\data1.csv")
    logger.info("System setup complete.")


class QueryModel(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(query: QueryModel):
    try:
        logger.info(f"Received query: {query.question}")
        logging.info("Entering")
        folder_path = 'C:\\Users\\karta\\Desktop\\geo-chatbot\\Project1'
        has_other_files, other_files = check_files_in_folder(folder_path)
        logging.info("HELLO")
        if has_other_files:
          logging.info(" extrernal File Found")
          setup_system(other_files)
          logging.info("File setup successfully")
        else:
          setup_system("data\data1.csv")
          logging.info("Default folder")
        logging.info("Exiting")
        answer = get_answer(query.question)
        return {"answer": answer}
    except Exception as e:
        logger.error(f"Error processing the query: {e}")
        return {"error": str(e)}


# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from src.main import setup_system, get_answer
# import logging
# import shutil

# # Initialize logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# app = FastAPI()

# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Update with your frontend's domain (e.g., http://localhost:3000)
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods
#     allow_headers=["*"],  # Allow all headers
# )

# @app.on_event("startup")
# async def startup_event():
#     logger.info("Starting the system setup process...")
#     setup_system("data/data1.csv")  # Initialize with your default data
#     logger.info("System setup complete.")

# class QueryModel(BaseModel):
#     question: str

# @app.post("/ask")
# async def ask_question(query: QueryModel):
#     try:
#         logger.info(f"Received query: {query.question}")
#         answer = get_answer(query.question)
#         return {"answer": answer}
#     except Exception as e:
#         logger.error(f"Error processing the query: {e}")
#         return {"error": str(e)}

# # Endpoint to handle file upload
# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     try:
#         # Save the uploaded file locally
#         file_location = f"uploaded_files/{file.filename}"
#         with open(file_location, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)
        
#         logger.info(f"File uploaded successfully: {file.filename}")
        
#         # You can also process the file as needed, for example:
#         # If you need to feed the file into the system
#         # setup_system(file_location)
        
#         return {"filename": file.filename, "file_location": file_location}
    
#     except Exception as e:
#         logger.error(f"Error uploading the file: {e}")
#         return {"error": str(e)}

