#!/bin/bash
set -e
source ../../../.scripts/BaseScript.sh

############# IMPORTANT! UPDATE THE FOLLOWING PARAMETERS BEFORE RUNNING THIS SCRIPT: #############
hlq=""; #<--------------- The high-level qualifier of the mainframe user (as defined in the test4z profile in zowe.config.json )
storageClass=""; #<------------ Storage class for Test4z deployment (must be a permanent storage class)
jobcard="//JOB_NAME   JOB IDxxx,
//            'TEST4ZRN',
//             NOTIFY=\&SYSUID,
//        MSGLEVEL=(1,1)
/*JOBPARM SYSAFF=*"  #<----------- Customize this JOBCARD to your system specification. Consult your mainframe administrator if you are unsure what the jobcard should look like. NOTE: Prepend any special character with '\' (Example: &SYSUID ---> \&SYSUID)

#*************************************************************************************************
# UPDATE THE FOLLOWING PARAMETERS ! END
#*************************************************************************************************

#GLOBAL VARIABLES START - (DO NOT CHANGE)
tempDirectoryName="TEST4Z_TEMP";
jobCardPlaceHolder='$$JOBCARD';
#GLOBAL VARIABLES END

#DATASET NAME DEF START - (DO NOT CHANGE)
TEST4Z_BATCHAPP_CAVIEW="TEST4Z.BATCHAPP.CAVIEW";
#DATASET NAME DEF END

#MAIN START
createDirectory "$tempDirectoryName";
#Verify the length of each dataset
DSNValidation "$TEST4Z_BATCHAPP_CAVIEW"

#Params DATASET NAME - FILE PATH - DS TYPE - REPLACE_NEEDED?
upload "$TEST4Z_BATCHAPP_CAVIEW" BROADCOM.TEST4Z.BATCHAPP.CAVIEW PDS Y
removeDirectory "$tempDirectoryName";
printf "\n\n\nBash execution was successful: Sample data sets were successfully deployed to the mainframe.\n";
printf "Execute a test case, explore how it works and use it to build your own test cases.\n\n";
#MAIN END
#SCRIPT END
