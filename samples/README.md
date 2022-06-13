# Samples

This folder contains Test4z sample test suites and code snippets in Python and NodeJS environments.

## Note
1. Before continuing with the installation, make sure you met the prerequisites and you cloned the repository:
    * [/Readme.md](/README.md)

2. You can run the mock server for Test4z to use samples with no need to install the Test4z service on z/OS. 
See [Mock Server](/samples/mock/Readme.md) for more information.

## Continue Installation

1. Open a **new terminal** and run the following commands:
    
        cd samples
    
        npm install
    
2. Run the following command and enter the Z/OSMF specific information. Ask your mainframe administrator for the information.
    
        npm run setZosmf
            
3. Open the [/samples/setup/script.sh](/samples/setup/script.sh)  file and fill in the required parameters listed at the beginning of the file. Important: Make sure you use UPPER CASE for HLQ and Job Card fields.
                                                                 
4. Copy the JCL test files to your z/OS system by executing the following command: 

        npm run setup
    
5. Test4z Samples are provided in Python and NodeJS environments. Select the environment and proceed with the installation.

    * NodeJS [/samples/nodejs/README.md](/samples/nodejs/README.md)
    * Python [/samples/python/README.md](/samples/python/README.md) 


## Notes

1. The samples using rollbackDataSet method have a limitation for the VSAM datasets. 
 Independently the source dataset volume, as a result, target dataset always has NOVOL 
 (temporary) storage class. If you roll back BackupDataset to OriginalDataset, OriginalDataset 
 becomes a temporary dataset to be deleted. This limitation is in our backlog and will be resolved soon.
 
2. Copy feature generates a temporary data set when it runs.
We recommend you to delete the temporary data set by opening the terminal and issuing the following command:

        npx zowe zos-files delete data-set 'HLQ.TEST4Z.BATCHAPP.DATA(CUSTINC)' -f

    Click [here](https://docs.zowe.org/stable/web_help/docs/zowe_zos-files_delete_data-set.html)
    for more information about the ZOWE data set delete command.
