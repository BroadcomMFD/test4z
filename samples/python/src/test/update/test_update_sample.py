"""
Copyright (c) 2022 Broadcom.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

Example test suite for Test4z update feature with Python
"""

import sys
import pytest
sys.path.append("../../main")
from service import submit_job_notify, get_config_prop, copy, roll_back_dataset, search, update
from model import FilterBuilder, UpdateCriteriaBuilder, Types, Operators, QueryOperators
from utility import job_successful, request_successful

#Testing variables
batch_app_jcl_dataset = "TEST4Z.BATCHAPP.JCL(CUSTSEQ)"
main_dataset = "TEST4Z.BATCHAPP.DATA(CUSTIN)"
copy_dataset = "TEST4Z.BATCHAPP.DATA(CUSTINC)"
copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)"
search_filters = [
    FilterBuilder()
      .field_name("ACTUAL-CHECKS")
      .field_operator(Operators.LESSOREQUAL.value)
      .field_value(["3"])
      .field_type(Types.NUMBER.value)
      .query_operator(QueryOperators.AND.value)
    .build(),
    FilterBuilder()
      .field_name("TOTAL-CHECKS")
      .field_operator(Operators.EQUAL.value)
      .field_value(["30"])
      .field_type(Types.NUMBER.value)
      .query_operator(QueryOperators.AND.value)
    .build(),
    FilterBuilder()
      .field_name("PRODUCT-TYPE")
      .field_operator(Operators.EQUAL.value)
      .field_value(["S,C"])
      .field_type(Types.CHARACTER.value)
      .query_operator(QueryOperators.OR.value)
    .build(),
    FilterBuilder()
      .field_name("ACTUAL-CHECKS")
      .field_operator(Operators.LESSOREQUAL.value)
      .field_value(["5"])
      .field_type(Types.NUMBER.value)
      .query_operator(QueryOperators.AND.value)
    .build(),
    FilterBuilder()
      .field_name("TOTAL-CHECKS")
      .field_operator(Operators.EQUAL.value)
      .field_value(["50"])
      .field_type(Types.NUMBER.value)
      .query_operator(QueryOperators.AND.value)
    .build(),
    FilterBuilder()
      .field_name("PRODUCT-TYPE")
      .field_operator(Operators.EQUAL.value)
      .field_value(["S,C"])
      .field_type(Types.CHARACTER.value)
      .query_operator(QueryOperators.OR.value)
    .build(),
    FilterBuilder()
      .field_name("ACTUAL-CHECKS")
      .field_operator(Operators.LESSOREQUAL.value)
      .field_value(["8"])
      .field_type(Types.NUMBER.value)
      .query_operator(QueryOperators.AND.value)
    .build(),
    FilterBuilder()
      .field_name("TOTAL-CHECKS")
      .field_operator(Operators.EQUAL.value)
      .field_value(["80"])
      .field_type(Types.NUMBER.value)
      .query_operator(QueryOperators.AND.value)
    .build(),
    FilterBuilder()
      .field_name("PRODUCT-TYPE")
      .field_operator(Operators.EQUAL.value)
      .field_value(["S,C"])
      .field_type(Types.CHARACTER.value)
    .build(),
]

update_criteria = [
    UpdateCriteriaBuilder()
        .field_name("PRODUCT-TYPE")
        .field_operator(Operators.LIKE.value)
        .field_type(Types.CHARACTER.value)
        .filter_value("B")
        .target_value("C")
    .build()
]

update_filter = FilterBuilder().field_name("ACCOUNT-NUMBER").field_operator(Operators.EQUAL.value).field_value(["123456000068"]).field_type(Types.CHARACTER.value).build()

@pytest.fixture
def yield_fixture():
    # Retrieve HLQ from config property
    HLQ = get_config_prop("TEST4Z", "hlq")
    global main_dataset, copy_dataset, copybook, batch_app_jcl_dataset
    main_dataset = HLQ + "." + main_dataset
    copy_dataset = HLQ + "." + copy_dataset
    copybook = HLQ + "." + copybook
    batch_app_jcl_dataset = HLQ + "." + batch_app_jcl_dataset
    # Take a backup of the main_dataset
    copy_result = copy(main_dataset, copy_dataset)
    assert request_successful(copy_result)
    yield
    # Roll back the main dataset
    roll_back_result = roll_back_dataset(copy_dataset, main_dataset)
    assert request_successful(roll_back_result)

def test_with_yield_fixture(yield_fixture):
    # Execute Batch Application to modify the main data set
    job = submit_job_notify(batch_app_jcl_dataset)
    assert job_successful(job)

    # Pick some customers using the given inputs and assert the number of the customers
    search_result = search(main_dataset, copybook, search_filters)
    assert request_successful(search_result)
    assert len(search_result['data']['Record']) == 24

    # Roll back the changes by replacing the main data set with the copy data set
    roll_back_result = roll_back_dataset(copy_dataset, main_dataset)
    assert request_successful(roll_back_result)

    # Update a particular record in the dataset and assert the number of the customers affected
    update_result = update(main_dataset, copybook, update_criteria, update_filter)
    assert request_successful(update_result)
    assert update_result['data']['recordsChanged'] == 1

    # Execute Batch Application again to modify the main data set
    job2 = submit_job_notify(batch_app_jcl_dataset)
    assert job_successful(job2)

    # Verify the number of the updated records changed after the batch application
    search_result2 = search(main_dataset, copybook, [update_filter])
    assert request_successful(search_result2)
    assert len(search_result2['data']['Record']) == 1
