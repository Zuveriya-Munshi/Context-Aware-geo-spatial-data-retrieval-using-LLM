# # import logging
# # from src.llm import load_llm, answer_with_llm
# # from src.rag import load_and_chunk_document
# # from langchain.chains import RetrievalQA

# # # Initialize logging
# # logging.basicConfig(level=logging.INFO)
# # logger = logging.getLogger(__name__)

# # # Global variables for LLM and knowledge base (cached once initialized)
# # llm = None

# # # Function to set up the system (LLM and RAG)
# # def setup_system(file_path: str):
# #     global llm
 
# #     # Load LLM if not already loaded
# #     if not llm:
# #         logger.info("Initializing the LLM for the first time...")
# #         llm = load_llm()
# #     else:
# #         logger.info("LLM already initialized.")
   
# #     # Load and cache the knowledge base (RAG) - loads only once
# #     load_and_chunk_document(file_path)

# # # Function to get the final answer from both retrieval and LLM
# # def get_answer(query: str):
# #     if not llm:
# #         raise Exception("LLM is not set up. Call setup_system first.")
    
# #     # Retrieve knowledge base (RAG part)
# #     knowledge_base = load_and_chunk_document(None)  # Cached knowledge base

# #     # Retrieve relevant documents based on the query
# #     logger.info("Entered")
# #     # logger.info(f"Retrieved documents: {retriever}")
# #     qa_chain = RetrievalQA.from_chain_type(llm,retriever = knowledge_base.as_retriever(search_kwargs={"k": 10}))
# #     logger.info(f"Asking LLM model the query: {query}")
# #     response = qa_chain.invoke({"query": query})
# #     # Generate the answer with the LLM
# #     # llm_response = answer_with_llm(llm, query)
# #     logger.info(f"LLM response: {response}")
# #     # return {
# #     #     "retrieved_documents": retriever,  # Relevant chunks retrieved
# #     #     "llm_response": response  # LLM-generated response
# #     # }
# #     return response["result"]


# import logging
# from src.llm import load_llm
# from src.rag import load_and_chunk_document
# from langchain.chains import RetrievalQA

# # Initialize logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Global variables for LLM and knowledge base (cached once initialized)
# llm = None

# # Function to set up the system (LLM and RAG)
# def setup_system(file_path: str):
#     global llm

#     # Load LLM if not already loaded
#     if not llm:
#         logger.info("Initializing the LLM for the first time...")
#         llm = load_llm()
#     else:
#         logger.info("LLM already initialized.")
   
#     # Load and cache the knowledge base (RAG) - loads only once
#     load_and_chunk_document(file_path)

# # Function to get the final answer from both retrieval and LLM
# def get_answer(query: str):
#     if not llm:
#         raise Exception("LLM is not set up. Call setup_system first.")
    
#     # Retrieve knowledge base (RAG part)
#     knowledge_base = load_and_chunk_document(None)  # Cached knowledge base

#     # Retrieve relevant documents based on the query
#     logger.info("Entered")
#     qa_chain = RetrievalQA.from_chain_type(llm, retriever=knowledge_base.as_retriever(search_kwargs={"k": 10}))
#     system_prompt = """
#     You are a knowledgeable ,smart and friendly assistant. You are an expert in geography and linguistics. Based on the geographic context of the user’s prompt, you respond in the dominant native language of the country or region.You have to give specific answer based on latitude and langitude if provided in the query.strictly Don't haullicination.
#     """
#     full_prompt = f"{system_prompt}\nHuman: {query}\nAI:"
#     logger.info(f"Asking LLM model the query: {full_prompt}")
#     response = qa_chain.invoke({"query": full_prompt})
    
#     logger.info(f"LLM response: {response}")
#     return response["result"]

import logging
from src.llm import load_llm
from src.rag import load_and_chunk_document
from langchain.chains import RetrievalQA

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for LLM and knowledge base (cached once initialized)
llm = None
knowledge_base = None

# Function to set up the system (LLM and RAG)
def setup_system(file_path: str):
    global llm, knowledge_base

    # Load LLM if not already loaded
    if not llm:
        logger.info("Initializing the LLM for the first time...")
        llm = load_llm()
    else:
        logger.info("LLM already initialized.")

    # Load and cache the knowledge base (RAG) - loads only once
    if not knowledge_base:
        knowledge_base = load_and_chunk_document(file_path)

# Function to get the final answer from both retrieval and LLM
def get_answer(query: str):
    if not llm:
        raise Exception("LLM is not set up. Call setup_system first.")
    if not knowledge_base:
        raise Exception("Knowledge base is not set up. Call setup_system first.")
    
    # Retrieve relevant documents based on the query
    logger.info(f"Entered query: {query}")
    qa_chain = RetrievalQA.from_chain_type(llm, retriever=knowledge_base.as_retriever(search_kwargs={"k": 10}))
    
    # System prompt for LLM to ensure it's using the relevant data
    system_prompt = """
    You are a knowledgeable, smart, and friendly assistant. You are an expert in geography and linguistics. Based on the geographic context of the user’s prompt, you respond in the dominant native language of the country or region. You must provide specific answers based on latitude and longitude if provided in the query. Strictly don't hallucinate. Your responses must strictly reflect the content from the uploaded data source (not static knowledge) when queried.
    """
    full_prompt = f"{system_prompt}\nHuman: {query}\nAI:"
    logger.info(f"Asking LLM model the query: {full_prompt}")

    response = qa_chain.invoke({"query": full_prompt})
    
    logger.info(f"LLM response: {response}")
    return response["result"]






