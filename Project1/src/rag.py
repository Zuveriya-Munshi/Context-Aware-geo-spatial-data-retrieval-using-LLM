# import logging
# from langchain.document_loaders import UnstructuredFileLoader
# from langchain_community.vectorstores.faiss import FAISS
# from langchain_community.embeddings.huggingface import HuggingFaceEmbeddings
# from langchain.text_splitter import CharacterTextSplitter

# # Initialize logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Global variable to hold the knowledge base (cached once created)
# knowledge_base = None

# # Function to load and chunk the document (load only once)
# def load_and_chunk_document(file_path: str):
#     global knowledge_base

#     if knowledge_base:
#         logger.info("Knowledge base already loaded and cached.")
#         return knowledge_base  # Return cached knowledge base

#     # Log document loading
#     logger.info("Loading the document for the first time...")

#     # Load the document
#     loader = UnstructuredFileLoader(file_path)
#     documents = loader.load()

#     # Create document chunks
#     text_splitter = CharacterTextSplitter(separator="/n", chunk_size=1000, chunk_overlap=200)
#     text_chunks = text_splitter.split_documents(documents)

#     # Log embedding and vector store creation
#     logger.info("Creating knowledge base with embeddings...")

#     # Load the vector embedding model and create a knowledge base
#     embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
#     knowledge_base = FAISS.from_documents(text_chunks, embeddings)
#     logger.info("Knowledge base created and cached.")
#     return knowledge_base  # Return the created knowledge base

import logging
from langchain.document_loaders import UnstructuredFileLoader
from langchain_community.vectorstores.faiss import FAISS
from langchain_community.embeddings.huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import CharacterTextSplitter

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variable to hold the knowledge base (cached once created)
knowledge_base = None

# Function to load and chunk the document (load only once)
def load_and_chunk_document(file_path: str):
    global knowledge_base

    if knowledge_base:
        logger.info("Knowledge base already loaded and cached.")
        return knowledge_base  # Return cached knowledge base

    # Log document loading
    logger.info("Loading the document for the first time...")

    # Load the document
    loader = UnstructuredFileLoader(file_path)
    documents = loader.load()

    # Create document chunks
    text_splitter = CharacterTextSplitter(separator="/n", chunk_size=1000, chunk_overlap=200)
    text_chunks = text_splitter.split_documents(documents)

    # Log embedding and vector store creation
    logger.info("Creating knowledge base with embeddings...")

    # Load the vector embedding model and create a knowledge base
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    knowledge_base = FAISS.from_documents(text_chunks, embeddings)
    logger.info("Knowledge base created and cached.")
    return knowledge_base  # Return the created knowledge base
