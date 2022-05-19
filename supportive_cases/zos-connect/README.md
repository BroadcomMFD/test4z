# Test4z z/OS Connect sample
This folder contains test sample for triggering an API endpoint through z/OS Connect to place order in the CICS Catalog manager example application. Prior to this we check the status of stock of the item. After the order is placed, we validate it happened by checking the stock again.  

# Prerequisites
z/OS instance set up and running
CICS Catalog manager example application with webservice enabled
connection between z/OS Connect and CICS region established

# Installation

1. Open a **new terminal** and run the following commands to enter the Test4z and z/OS Connect specific information. Ask your mainframe administrator for the information.
    
        cd samples
    
        npm run setTest4z 

        npm run setZosConnect

2. Run the following command. 

       cd ../supportive_cases/zos-connect/

3. Navigate to src/test/zosConnectSample and change the values of mainDataset and copybook to reflect your environment. We are using the CICS Catalog Manager example application. (stuff from IBM, do we mention that? dunno)
       

# Run the Samples
- Run the sample using the following command:

        npm run test zosConnectSample
