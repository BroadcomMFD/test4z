#Object for the diagnostic check

class DiagnosticModel:
    def __init__(self, dsCreate, commandExec, fmpLoadLibExist, fmpLoadLibValid, fmpLoadLibAccess, dsDelete, dsWrite, serviceVersion, serviceUserID, fmpLoadLibDS, fmpLoadLibVersion):
        self.dsCreate = self.get_status(dsCreate)
        self.commandExec = self.get_status(commandExec)
        self.fmpLoadLibExist = self.get_status(fmpLoadLibExist)
        self.fmpLoadLibValid = self.get_status(fmpLoadLibValid)
        self.fmpLoadLibAccess = self.get_status(fmpLoadLibAccess)
        self.dsDelete = self.get_status(dsDelete)
        self.dsWrite = self.get_status(dsWrite)
        self.serviceVersion = self.get_status(serviceVersion)
        self.serviceUserID = self.get_status(serviceUserID)
        self.fmpLoadLibDS = self.get_status(fmpLoadLibDS)
        self.fmpLoadLibVersion = self.get_status(fmpLoadLibVersion)


    def get_status(self, input):
        return input['status']
