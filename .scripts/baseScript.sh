#!/bin/bash
set -e
#***********************************
#Bash file for Automation methods.
#***********************************
upload(){
  dataset=${hlq}.${1}
  path=${2}
  type=${3}
  replace=${4}

  printf "Removing the already existing dataset\n"

  tempPath="$tempDirectoryName"/"$path"

  deleteDataset "$dataset"
#--Dataset creation START
  if [ "$type" == 'PDS' ]
  then
    createPDS "$dataset"
  fi

  if [ "$type" == 'DS' ]
  then
   createDS "$dataset"
  fi
#--Dataset creation END

#--Text Replacement (if needed) and Upload START
  if [ "$replace" == 'Y' ]
  then
    rm -rf "$tempPath"
    cp -R "$path" "$tempPath"

    if [ "$type" == 'PDS' ]
    then
      for file in "$tempPath"/*
      do
         replaceDynamicVariable "$file"
         replaceJobName "$file" "${file##*/} "
      done
      find "$tempPath" -name '*-e' -exec rm {} \;
      uploadToPDS "$tempPath" "$dataset"
    fi
    if [ "$type" == 'DS' ]
    then
      replaceDynamicVariable "$tempPath"
      rm -rf "$tempPath"-e
      uploadToDS "$tempPath" "$dataset"
    fi
  fi
#--Text Replacement (if needed) and Upload END

#--Upload (without text replacement) START
  if [ "$replace" == 'N' ]
  then
    if [ "$type" == 'PDS' ]
    then
      uploadToPDS "$path" "$dataset"
    fi
    if [ "$type" == 'DS' ]
    then
      uploadToDS "$path" "$dataset"
    fi
  fi
#--Upload END
}

createPDS(){
  dataset=${1}
  if npx zowe zos-files create data-set-partitioned "$dataset" --storage-class "$storageClass"; then
      printf "\nCreating PDS dataset is succeeded for: %s \n" "$dataset"
  else
      errorMessage "$dataset" "Creating PDS dataset is failed for: "
  fi
}
createDS(){
  dataset=${1}
  if npx zowe zos-files create data-set-sequential "$dataset" --storage-class "$storageClass"; then
    printf "\nCreating dataset is succeeded for: %s \n" "$dataset"
  else
    errorMessage "$dataset" "Creating dataset is failed for: "
  fi
}
deleteDataset(){
 dataset=${1}
 datasetCheck=$(npx zowe zos-files list data-set "$dataset")
 if [ ! -z "$datasetCheck" ]; then
    npx zowe zos-files delete data-set "$dataset" -f || true
 fi
}
replaceDynamicVariable(){
    _path=${1}
    orig=$'\n'; replace=$'\\\n';
    if [ ! -z "$jobCardPlaceHolder" ]; then sed -i -e "s@${jobCardPlaceHolder}@${jobcard//$orig/$replace}@g" "$_path"
    fi
    if [ ! -z "$hlqPlaceHolder" ]; then sed -i -e "s/${hlqPlaceHolder}/${hlq}/g" "$_path"
    fi
     if [ ! -z "$sqlidPlaceHolder" ]; then sed -i -e "s/${sqlidPlaceHolder}/${sqlid}/g" "$_path"
    fi
    if [ ! -z "$stoPlaceHolder" ]; then sed -i -e "s/${stoPlaceHolder}/${db2StorageGroup}/g" "$_path"
    fi
    if [ ! -z "$db2SubsystemPlaceHolder" ]; then sed -i -e "s/${db2SubsystemPlaceHolder}/${db2Subsystem}/g" "$_path"
    fi
    if [ ! -z "$db2DatabaseNamePlaceHolder" ]; then sed -i -e "s/${db2DatabaseNamePlaceHolder}/${db2DatabaseName}/g" "$_path"
    fi
    if [ ! -z "$db2TableNamePlaceHolder" ]; then sed -i -e "s/${db2TableNamePlaceHolder}/${db2TableName}/g" "$_path"
    fi
    if [ ! -z "$db2TableSpacePlaceHolder" ]; then sed -i -e "s/${db2TableSpacePlaceHolder}/${tableSpace}/g" "$_path"
    fi
}
replaceJobName(){
    _path=${1}
    _fileName=${2}
    sed -i -e "1,1 s@\/\/[a-zA-Z]\+[[:space:]]@//${_fileName}@" "$_path"
}
uploadToDS(){
  _path=${1}
  _dataset=${2}

  if npx zowe zos-files upload file-to-data-set "$_path" "$_dataset"; then
      printf "\nUpload dataset %s is succeeded\n" "$_dataset"
  else
      errorMessage "$_dataset" "Dataset upload failed for: "
  fi
}
uploadToPDS(){
  _path=${1}
  _dataset=${2}
  if npx zowe zos-files upload dir-to-pds "$_path" "$_dataset"; then
      printf "\nUpload members from %s to the PDS dataset %s is succeeded\n" "$_path" "$_dataset"
  else
      errorMessage "$_dataset" "PDS upload failed for: "
  fi
}
DSNValidation(){
    dataset=${hlq}.${1}
    datasetLength=`expr "$dataset" : '.*'`
    # Verify that the dataset length is less or equal to 42
    if [ ! $datasetLength -le 44 ]; then
        errorMessage "$dataset" "The dataset name contains more than 44 characters."
    fi

    # Verify that each qualifier's length is less or equal to 8
    # Parse dataset
    IFS='.'
    read -a qualifiers <<< "${dataset}"
    # Verify each qualifer that its length is between 1 and 8
    incorrectQualifierFormatMessage="The dataset name has a qualifier of invalid length. The correct format is a non-empty string of less than nine characters."
    for qualifier in "${qualifiers[@]}";
    do
        # Verification
        if [ -z "$qualifier" ]; then
            errorMessage "$dataset" "$incorrectQualifierFormatMessage"
        fi
        qualifierLength=`expr "$qualifier" : '.*'`
        if [ ! $qualifierLength -le 8 -o ! $qualifierLength -ge 1 ]; then
            errorMessage "$dataset" "$incorrectQualifierFormatMessage"
        fi
    done
    IFS=' '
}
function errorMessage(){
    dataset=${1}
    errorMessage=${2}
    printf "\n";
    printf "\n********************************ERROR********************************"
    printf "\n%s %s" "$errorMessage" "$dataset";
    printf "\nBash script exited with error...";
    printf "\n********************************ERROR********************************"
    printf "\n";
    removeDirectory "$tempDirectoryName";
    exit 1;
}
function createDirectory(){
    path=${1}
    rm -rf "$path"
    mkdir "$path"
}
function removeDirectory() {
    path=${1}
    rm -rf "$path"
}
function copyFile(){
    path=${1}
    rm -rf "$tempDirectoryName"/"$path"
    cp -R "$path" "$tempDirectoryName"/"$path"
}
create(){
  dataset=${hlq}.${1}
  type=${2}

  deleteDataset "$dataset"

  if [ "$type" == 'DS' ]
    then
      createDS "$dataset"
  fi
  if [ "$type" == 'PDS' ]
    then
      createPDS "$dataset"
  fi
}
createteLibrary(){
    dataset=${hlq}.${1}
    deleteDataset "$dataset"
    npx zowe zos-files create data-set-partitioned "$dataset" --storage-class "$storageClass" --size 20CYL --secondary-space 20 --block-size 23200 --record-format U --record-length 0 --data-set-type library
}
createDatabase(){
  dataset=${hlq}.${1}
  echo "Db2 database is being created by submiting the JCL ${dataset}, please wait"
  jobsubmit=$(npx zowe jobs submit ds "$dataset" --wfo)
  if [[ $jobsubmit == *"CC 0000"* ]]; then
    printf "\nDB2 table %s.%s created successfully\n" "$sqlid" "$db2TableName"
  else
    errorMessage "Db2 dataset creation failed, check:$jobsubmit" "$dataset"
  fi
}
compileCobol(){
  dataset=${hlq}.${1}
  echo "Cobol application is being compiled by submiting the JCL ${dataset}, please wait"
  jobsubmit=$(npx zowe jobs submit ds "$dataset" --wfo)
  if [[ $jobsubmit == *"CC 0000"* ]]; then
    printf "\nCOBOL application compiled successfully"
  else
    errorMessage "COBOL application compilation failed, check:$jobsubmit" "$dataset"
  fi
}
compileDB2Cobol(){
  dataset=${hlq}.${1}
  echo "Cobol application is being compiled by submiting the JCL ${dataset}, please wait"
  jobsubmit=$(npx zowe jobs submit ds "$dataset" --wfo)
  if [[ $jobsubmit =~ "CC 0000" ||  $jobsubmit =~ "CC 0004" ]];then
    printf "\nCOBOL application compiled successfully"
  else
    errorMessage "COBOL application compilation failed, check:$jobsubmit" "$dataset"
  fi
}
