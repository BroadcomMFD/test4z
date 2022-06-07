# Test4z DB2 Sample

Example use case scenario:

1. The test suite writes 10 random records to the DB2 database.
2. Within the job submission, the batch application selects the records from the DB2 table based on some filters and afterwards it updates the notification date of this particular subset of records to today.
3. It is expected to have n records that have notification date as today. An SQL query will be executed to pick these records and to assert the n number.
4. The test suite removes the 10 random rows within the cleanup process.


## Information
* To be able to run the tests, at least one of the following conditions must be fulfilled:
    1. z/OSMF system and DB2 system are on the same LPAR
    2. In the /supportive_cases/db2/setup/script.sh file, specify the DB2 system (ex: *JOBPARM SYSAFF=HB01)
    
## Note
Before continue to this installation, make sure you completed the following installations:
* [/Readme.md](/README.md)

* During the `npm install`, some of the dependencies may throw errors, as long as `npm install` doesn't interrupt, these errors can be ignored.


   
## Installation
1. Open a **new terminal** and run the following commands:
    
        cd supportive_cases/db2
    
        npm install
        
2. Run the following command and enter the ZOSMF specific information. 
   Ask your mainframe administrator for the information.
   **You can skip this step if you ran this command before**

        npm run setZosmf

3. Run the following command and enter the DB2 specific information. 
   Ask your mainframe administrator for the information.

        npm run setDb2

        
4. Open the [/supportive_cases/db2/setup/script.sh](/supportive_cases/db2/setup/script.sh)  file and fill in the required parameters listed at the beginning of the file. Important: Make sure you use UPPER CASE for HLQ, SQLID and Job Card fields.
                                                                 
5. Copy the JCL test files to your z/OS system by executing the following command: 

        npm run setup
        
## Run the samples

* Run the tests using the following command:

        npm run test db2Test
