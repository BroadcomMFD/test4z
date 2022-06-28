# Test4z z/OS Connect sample
This folder contains a test sample that triggers an API endpoint through z/OS Connect. The sample places an order in the CICS Catalog manager of the example application. First it checks the status of the stock of the item. After the order is placed, it validates the success by checking the stock again.

# Prerequisites
- The CICS Catalog manager example application with webservice is enabled.
- The connection between z/OS Connect and the CICS region is established.

# Installation

1. Open a **new terminal** and run the following commands:
    
        cd supportive_cases/zos-connect/

        npm install

2. Run the following command and enter the Test4z specific information. 
   Ask your mainframe administrator for the information.
   **You can skip this step if you ran this command before**

        npm run setTest4z
      
3. Run the following command and enter the z/OS Connect specific information. 
   Ask your mainframe administrator for the information.
   **In case you do not have the username and password, you can leave them blank**

        npm run setZosConnect

4. Navigate to [src/test/zosConnectSample](/supportive_cases/zos-connect/src/test/zosConnectSample.test.ts) and change the values of mainDataset and copybook to  reflect your environment. We are using the [CICS Catalog Manager example application](https://www.ibm.com/docs/en/cics-ts/5.6?topic=samples-cics-catalog-manager-example-application). 

       
# Run the Samples
- Run the sample using the following command:

        npm run test zosConnectSample
