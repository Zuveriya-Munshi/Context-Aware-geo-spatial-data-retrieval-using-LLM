from langchain_community.llms import Ollama
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize and load the LLM model with a system prompt
def load_llm():
    logger.info("Loading the LLM model with a system prompt...")
    
    # system_prompt = """
    # You are a knowledgeable and friendly assistant. You are an expert in geography and linguistics. Based on the geographic context of the user’s prompt, you respond in the dominant native language of the country or region.strictly don't haullicination
    # """
    
    llm = Ollama(
        model="llama3.2:1b",
        temperature=0,
    )
    
    logger.info("LLM model loaded successfully with system prompt.")
    return llm
# from langchain_community.llms import Ollama
# import logging

# # Initialize logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Initialize and load the LLM model with a system prompt
# def load_llm():
#     logger.info("Loading the LLM model with a system prompt...")

#     llm = Ollama(
#         model="llama3.2:1b",
#         temperature=0,
#     )
    
#     logger.info("LLM model loaded successfully with system prompt.")
#     return llm
