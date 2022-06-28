#!/bin/bash
set -e
source ../../../.scripts/BaseScript.sh

############# IMPORTANT! UPDATE THE FOLLOWING PARAMETERS BEFORE RUNNING THIS SCRIPT: #############
hlq=""; #<--------------- The high-level qualifier of the mainframe user (as defined in the test4z profile in zowe.config.json )
sqlid=""; #<-------------- The prefix for DB2 objects. 
storageClass=""; #<------------ Storage class for Test4z deployment
db2Subsystem=""; #<------------ DB2 subsystem
jobcard="//JOB_NAME   JOB IDxxx,
//            'TEST4ZRN',
//             NOTIFY=\&SYSUID,
//        MSGLEVEL=(1,1)
/*JOBPARM SYSAFF=*"  #<----------- Customize this JOBCARD to your system specification. Consult your mainframe administrator if you are unsure what the jobcard should look like. NOTE: Prepend any special character with '\' (Example: &SYSUID ---> \&SYSUID)

#*************************************************************************************************
# UPDATE THE FOLLOWING PARAMETERS ! END
#*************************************************************************************************

#GLOBAL VARIABLES START - (DO NOT CHANGE)
tableSpace="T4ZTBSPC"
db2StorageGroup="T4ZSTRG";
db2DatabaseName="T4ZDB";
db2TableName="TEST4ZTB";
tempDirectoryName="TEST4ZDB_TEMP";
hlqPlaceHolder='$$HLQ';
sqlidPlaceHolder='$$SQLID';
jobCardPlaceHolder='$$JOBCARD';
stoPlaceHolder='$$sto';
db2SubsystemPlaceHolder='$$subsystem';
db2DatabaseNamePlaceHolder='$$dbname';
db2TableNamePlaceHolder='$$tablename';
db2TableSpacePlaceHolder='$$tablespace';
#GLOBAL VARIABLES END

#DATASET NAME DEF START - (DO NOT CHANGE)
TEST4ZDB_BATCHAPP_DBRMLIB="TEST4ZDB.BATCHAPP.DBRMLIB";
TEST4ZDB_BATCHAPP_JCL="TEST4ZDB.BATCHAPP.JCL";
TEST4ZDB_BATCHAPP_PGM="TEST4ZDB.BATCHAPP.PGM";
TEST4ZDB_BATCHAPP_LOADLIB="TEST4ZDB.BATCHAPP.LOADLIB";
TEST4ZDB_BATCHAPP_DB="TEST4ZDB.BATCHAPP.DB";
#DATASET NAME DEF END



#MAIN START
createDirectory "$tempDirectoryName";
#Verify the length of each dataset
DSNValidation "$TEST4ZDB_BATCHAPP_DBRMLIB"
DSNValidation "$TEST4ZDB_BATCHAPP_JCL"
DSNValidation "$TEST4ZDB_BATCHAPP_PGM"
DSNValidation "$TEST4ZDB_BATCHAPP_LOADLIB"
#Params DATASET NAME - FILE PATH - DS TYPE - REPLACE_NEEDED?
upload "$TEST4ZDB_BATCHAPP_JCL" BROADCOM.TEST4ZDB.BATCHAPP.JCL PDS Y
upload "$TEST4ZDB_BATCHAPP_PGM" BROADCOM.TEST4ZDB.BATCHAPP.PGM PDS Y
upload "$TEST4ZDB_BATCHAPP_DB" BROADCOM.TEST4ZDB.BATCHAPP.DB PDS Y
createteLibrary "$TEST4ZDB_BATCHAPP_LOADLIB"
create "$TEST4ZDB_BATCHAPP_DBRMLIB" PDS
removeDirectory "$tempDirectoryName";
createDatabase "$TEST4ZDB_BATCHAPP_DB""(CREATEDB)";
compileDB2Cobol "$TEST4ZDB_BATCHAPP_JCL""(BUILD)";

printf "\n\n\nBash execution was successful: DB2 sample data sets were successfully deployed to the mainframe.\n";
printf "Execute the db2 test case, explore how it works and use it to build your own test cases.\n\n";
#MAIN END
#SCRIPT END
