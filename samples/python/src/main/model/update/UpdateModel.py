# Request model for /update endpoint

class UpdateModel:
    def __init__(self, dataset, copy_book, update_criteria, filter_criteria):
        self.dataset = dataset
        self.copybook = copy_book
        self.updateCriteria = update_criteria
        self.filterCriteria = filter_criteria
