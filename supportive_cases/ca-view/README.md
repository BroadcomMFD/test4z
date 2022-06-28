# Test4z Ca-view Sample
This folder contains test samples for submitting the jobs and retrieving the job spool content through z/OSMF. 
The Web-Viewer instance collects the jobs submitted through z/OSMF. Using the caview-plugin-for-zowe , the job spool content is retrieved from the Web Viewer instance.

# Installation

1. Open a **new terminal** and run the following commands:
    
        cd supportive_cases/ca-view
    
        npm install

2. Run the following command and enter the ZOSMF specific information. Ask your mainframe administrator for the information. You can skip this step if you ran this command before

        npm run setZosmf

3. Run the following command and enter your HLQ:

        npm run setHlq

4. Open the [/supportive_cases/ca-view/setup/script.sh](/supportive_cases/ca-view/setup/script.sh) file and fill in the required parameters listed at the beginning of the file. Important: Make sure you use UPPER CASE for HLQ and Job Card fields.

5. Run the following command and enter the ca-view specific information. Ask your mainframe administrator for the information.

       npm run setup

6. Optional: To run the tests related to CA View, the Web-Viewer instance should be ready and running. 
 
       npm run setCAView


# Run the Samples
1. Run the samples using the following command:

       npm run test caviewsample

2. Uncomment the second test case to retrieve the job logs from CA View.
