# Test4z Endpoint access methods
import sys
import json
sys.path.append("../../main")
from .HttpClient import post_request
from .ZoweClient import zowe_submit_job_notify
from model import CopyModel, SearchModel, UpdateModel

# Job submission through Z/OSMF
# @dataset - JCL dataset with the job/s
def submit_job_notify(dataset):
    return zowe_submit_job_notify(dataset)

# Copy the input dataset to the output dataset
# @inputDataset - Source dataset - the dataset which you want to copy
# @outputDataset - Target dataset - the result/output dataset
# @response - boolean success of the request
def copy(inputDataset, outputDataset):
    try:
        response = post_request("/copy", json.dumps(CopyModel(inputDataset, outputDataset).__dict__))
        if ('data' in response):
            print("Copy was successful")
            return True
        else:
            raise Exception(response)
    except Exception:
            raise Exception("Unexpected error")

# Reverting data back to the original state using the snapshot endpoint
# @inputDataset - Source dataset - the dataset which you have the backup data
# @outputDataset - Target dataset - the dataset which you want to override data from the source dataset (original dataset)
# @response - boolean success of the request
def roll_back_dataset(inputDataset, outputDataset):
    try:
        response = post_request("/copy", json.dumps(CopyModel(inputDataset, outputDataset).__dict__))
        if ('data' in response):
            print("Roll back was successful")
            return True
        else:
            raise Exception(response)
    except Exception:
        raise Exception("Unexpected error")

# Search the dataset using the filter query
# @dataset: Input dataset to perform search
# @copybook: Layout dataset for the input dataset
# @filter: Search filter(s)
# @limit?: An optional parameter for paging the search output
# @offset?: An optional parameter for setting the offset to the search output
# @response: Records array
def search(dataset, copybook, filters, limit=0, offset=0):
    try:
        model = SearchModel(dataset, copybook, filters)
        response = post_request("/search", json.dumps(model, default = lambda x: x.__dict__))
        if ('Record' in response['data']):
            print("Search was successful")
            return response['data']['Record']
        else:
            raise Exception(response)
    except Exception:
            raise Exception("Unexpected error")

# Update dataset, with or without a filter(filter_criteria)
# @dataset: Input dataset to perform update
# @copybook: Layout dataset for the input dataset
# @update_criteria: Update conditions
# @filter_criteria: Filter object to narrow down the records before the update
# @response: Number of the records updated
def update(dataset, copybook, update_criteria, filter_criteria):
    try:
        model = UpdateModel(dataset, copybook, update_criteria, filter_criteria)
        response = post_request("/update", json.dumps(model, default = lambda x: x.__dict__))
        if ('recordsChanged' in response['data']):
                print("Update was successful")
                return response['data']['recordsChanged']
        else:
            raise Exception(response)
    except Exception:
            raise Exception("Unexpected error")
