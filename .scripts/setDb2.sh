#!/bin/bash
set -e

printf "\nPlease enter DB2 specific information when the command prompt asks\n"
npx zowe config set profiles.lpar1.profiles.db2.properties.host
npx zowe config set profiles.lpar1.profiles.db2.properties.port
npx zowe config set profiles.lpar1.profiles.db2.properties.database
npx zowe config set profiles.lpar1.profiles.db2.properties.hlq
npx zowe config set profiles.lpar1.profiles.db2.properties.sqlid
printf "\nEnter your mainframe username and password. To secure your credentials, the information you enter will be blank\n"
npx zowe config set --secure profiles.lpar1.profiles.db2.properties.user
npx zowe config set --secure profiles.lpar1.profiles.db2.properties.password
printf "\nDB2 information collected successfully\n\n"
