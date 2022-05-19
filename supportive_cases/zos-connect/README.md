# Test4z z/OS Connect sample
This folder contains a test sample that triggers an API endpoint through z/OS Connect. The sample places an order in the CICS Catalog manager of the example application. First it checks the status of the stock of the item. After the order is placed, it validates the success by checking the stock again.

# Prerequisites
- The CICS Catalog manager example application with webservice is enabled.
- The connection between z/OS Connect and the CICS region is established.

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
