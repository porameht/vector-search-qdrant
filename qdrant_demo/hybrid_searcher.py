from qdrant_client import QdrantClient
from qdrant_demo.config import QDRANT_URL, QDRANT_API_KEY, EMBEDDINGS_MODEL


class HybridSearcher:
    DENSE_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
    SPARSE_MODEL = "prithivida/Splade_PP_en_v1" # not support thai language
    
    def __init__(self, collection_name):
        self.collection_name = collection_name
        # initialize Qdrant client
        self.qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY, prefer_grpc=True)
        self.qdrant_client.set_model(self.DENSE_MODEL)
        # comment this line to use dense vectors only
        self.qdrant_client.set_sparse_model(self.SPARSE_MODEL)
        
    def search(self, text: str):
        search_result = self.qdrant_client.query(
            collection_name=self.collection_name,
            query_text=text,
            query_filter=None,  # If you don't want any filters for now
            limit=5,  # 5 the closest results
        )
        # `search_result` contains found vector ids with similarity scores 
        # along with the stored payload
        
        # Select and return metadata
        metadata = [hit.metadata for hit in search_result]
        return metadata