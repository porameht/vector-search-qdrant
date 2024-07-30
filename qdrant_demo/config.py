import os

CODE_DIR = os.path.dirname(__file__)
ROOT_DIR = os.path.dirname(CODE_DIR)
DATA_DIR = os.path.join(ROOT_DIR, "data")
STATIC_DIR = os.path.join(ROOT_DIR, "static")

QDRANT_URL = os.environ.get("QDRANT_URL", "http://localhost:6333/")
QDRANT_API_KEY = os.environ.get("QDRANT_API_KEY", "")

COLLECTION_NAME = os.environ.get("COLLECTION_NAME", "product_nc-1")
# EMBEDDINGS_MODEL = os.environ.get("EMBEDDINGS_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
EMBEDDINGS_MODEL = os.environ.get("EMBEDDINGS_MODEL", "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")


print(COLLECTION_NAME)
TEXT_FIELD_NAME = "document"
