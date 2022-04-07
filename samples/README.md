# Test4z Sample

This folder contains Test4z sample test suites and code snippets in Python and NodeJS environments.

## Note
Before continue to this installation, make sure you completed the following installations:
* [/Readme.md](/README.md)

## Continue Installing

1. Open a **new terminal** and run the following commands:
    
        cd samples
    
        npm install
    
2. Run the following commands and enter the ZOSMF specific information. Ask your mainframe administrator for the information.
    
        npx zowe config set profiles.lpar1.profiles.zosmf.properties.host
    
        npx zowe config set profiles.lpar1.profiles.zosmf.properties.port
    
        npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user
    
        npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password
            
3. Open the [/samples/setup/script.sh](/samples/setup/script.sh)  file and fill in the required parameters listed at the beginning of the file. Important: Make sure you use UPPER CASE for HLQ and Job Card fields.
                                                                 
4. Copy the JCL test files to your z/OS system by executing the following command 

        npm run setup
    
5. Test4z Samples are provided in Python and NodeJS environments. Choose one below and proceed for the final installation.

    * Python [/samples/python/README.md](/samples/python/README.md) 
    * NodeJS [/samples/nodejs/README.md](/samples/nodejs/README.md)


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