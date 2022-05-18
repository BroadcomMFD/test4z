# Test4z z/OS Connect sample
This folder contains test sample for triggering an API endpoint through z/OS Connect to place order in the Sample Catalogue Application running in CICS region. Prior to this and after the action we use Test4z to validate change in data. 

# Prerequisites
z/OS instance set up and running
CICS application with enabled REST API 
connection between z/OS Connect and CICS region established

# Installation

1. Open a **new terminal** and run the following commands to enter the Test4z specific information. Ask your mainframe administrator for the information.
    
        cd samples
    
        npm run setTest4z 

2. Run the following commands. 

       cd ../supportive_cases/zos-connect/

3. Make sure to change the z/OS Connect information in the ZosConnectSessionFactory (needs change, externalize those)
       

# Run the Samples
- Run the samples using the following command:

        npm run test zosconnect
