def request_successful(response):
    if 'data' in response:
        return True
    else:
        raise AssertionError(response)

def job_successful(response):
    if response['retcode'] in ["CC 0000", "CC 0004"]:
        return True
    else:
        raise AssertionError("Expected return code CC 0000 or CC 0004 but received: " + response['retcode'])

def service_healthy(response):
    checks = []
    for attr, value in response.__dict__.items():
        if value in ["Fail", "Skip", None]:
            checks.append("\n" + attr + " : " + value)
    if len(checks) > 0:
        raise AssertionError("Diagnostic check failed for the following privileges:\n" + ', '.join(checks))
    else:
        print ("Test4z Service is up and running. The user has all the required privileges")
        return True
