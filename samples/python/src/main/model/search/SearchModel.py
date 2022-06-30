# Request model for /search endpoint

class SearchModel:
    def __init__(self, dataset, copy_book, search_query, limit=0, offset=0):
        self.dataset = dataset
        self.copybook = copy_book
        self.searchQuery = search_query
        self.limit = limit
        self.offset = offset
