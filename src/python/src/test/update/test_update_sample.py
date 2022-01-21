import sys
import json
sys.path.append("../../main")
from service import submit_job_notify, copy, roll_back_dataset, search
from model import FilterBuilder, Types, Operators, QueryOperators
import unittest

batchAppJCLDataset = "BEKHI01.TEST4Z.BATCHAPP.JCL(CUSTSEQ)"
mainDataset = "BEKHI01.TEST4Z.BATCHAPP.CUSTIN"
copyDataset = "BEKHI01.TEST4Z.BATCHAPP.CUSTIN2"
copybook = "BEKHI01.TEST4Z.BATCHAPP.COPY(CUSTREC)"
filters = [
          FilterBuilder()
              .field_name("TOTAL-CHECKS")
              .field_operator(Operators.EQUAL.value)
              .field_value(["30","50","80"])
              .field_type(Types.NUMBER.value)
              .query_operator(QueryOperators.AND.value)
          .build(),
          FilterBuilder()
              .field_name("ACTUAL-CHECKS")
              .field_operator(Operators.LESSOREQUAL.value)
              .field_value(["3","5","8"])
              .field_type(Types.NUMBER.value)
              .query_operator(QueryOperators.AND.value)
          .build(),
          FilterBuilder()
              .field_name("PRODUCT-TYPE")
              .field_operator(Operators.EQUAL.value)
              .field_value(["C","P"])
              .field_type(Types.CHARACTER.value)
          .build()
]
class TestApis(unittest.TestCase):
    def test_job_submit(self):
      print("\n---------------Update Sample---------------")
      #take snapshsot

      #assert submit_job_notify("BEKHI01.TEST4Z.BATCHAPP.JCL(CUSTSEQ)") == "CC 0000"

      records_1 = search(mainDataset, copybook, filters)
      assert len(records_1) == 13

      assert roll_back_dataset(copyDataset, mainDataset) == True

      #update
      #job submit
      #search
      print("----------------Completed----------------")


