# Helper class for building the proper update criteria

from .UpdateCriteria import UpdateCriteria
class UpdateCriteriaBuilder(object):

    def __init__(self):
        self.fieldName = None
        self.fieldOperator = None
        self.fieldType = None
        self.filterValue = None
        self.targetValue = None

    def field_name(self, fieldName):
        self.fieldName = fieldName
        return self

    def field_operator(self, fieldOperator):
        self.fieldOperator = fieldOperator
        return self

    def field_type(self, fieldType):
        self.fieldType = fieldType
        return self

    def filter_value(self, filterValue):
        self.filterValue = filterValue
        return self

    def target_value(self, targetValue):
        self.targetValue = targetValue
        return self

    def build(self):
        if self.fieldName is None: raise Exception("field_name():Method not implemented.")
        if self.fieldOperator is None: raise Exception("field_operator():Method not implemented.")
        if self.fieldType is None: raise Exception("field_type():Method not implemented.")
        if self.filterValue is None: raise Exception("filter_value():Method not implemented.")
        if self.targetValue is None: raise Exception("target_value():Method not implemented.")
        return UpdateCriteria(self.fieldName, self.fieldOperator, self.fieldType, self.filterValue, self.targetValue)
