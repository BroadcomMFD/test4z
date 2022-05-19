#!/bin/bash
set -e

printf "\nPlease enter z/OS Connect information when the command prompt asks\n"
npx zowe config set profiles.lpar1.profiles.zosconnect.properties.host
npx zowe config set profiles.lpar1.profiles.zosconnect.properties.port
printf "\nEnter your mainframe username and password. To secure your credentials, the information you enter will be blank\n"
printf "\nIn case of no credentials you can leave these empty\n"
npx zowe config set --secure profiles.lpar1.profiles.zosconnect.properties.user
npx zowe config set --secure profiles.lpar1.profiles.zosconnect.properties.password
printf "\nz/OS Connect information collected successfully\n\n"