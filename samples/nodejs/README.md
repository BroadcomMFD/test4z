# Test4z NodeJS Samples

This repository contains the Test4z Samples in NodeJS.
* In the [code_snippets](/samples/nodejs/code_snippets) folder, you can find small code snippets for each of the Tezt4z features. These functional snippets can lead you to use in your own tests
    * compare
    * copy
    * search
    * update
    
* In the [business_cases](/samples/nodejs/business_cases) folder, you can find test suites of real world applications. Each sub folder has the use case explanation.
    * checkOrdering 

## Note
Before continuing with the installation, make sure you completed the following installations:

* [/samples/README.md](/samples/README.md)

## Continue Installing

Run the following command and enter the Test4z specific information to continue the installation. Ask your mainframe administrator for the information. 

        npm run setTest4z
     
## Run the Samples
1. Before running the samples, check the Test4z Service health status by executing the following command:

        npm run diagnostic
        
    It checks the 7 main permissions that enable you to run the Test4z Samples
    
    | Permission | Description |
    | --- | --- |  
    **dsCreate**         | Checks whether the user ID has sufficient rights to create data sets
    **commandExec**      | Checks whether the user ID has sufficient rights to execute TSO commands through TSOCMD
    **fmpLoadLibExist**  | Checks whether the load library exists
    **fmpLoadLibValid**  | Checks whether the load library belongs to File Master Plus
    **fmpLoadLibAccess** | Checks whether the user ID has sufficient rights to access the load library
    **dsDelete**         | Checks whether the user ID has sufficient rights to delete existing data sets. If the user ID does not have sufficient rights to delete data sets, the Test4z APIs execute, but do not delete the temporary data sets created during execution
    **dsWrite**          | Checks whether the user ID has sufficient rights to write records in existing data sets
                              
    **Possible values for these controls : Pass, Fail and Skip**
    
    In case of a failure get in touch with your System Administrator
2. Run the tests using the following command. Select one of the files contained in the [code_snippets](/samples/nodejs/code_snippets), or [business_cases](/samples/nodejs/business_cases) folder.

        npm run test <FILENAME>
