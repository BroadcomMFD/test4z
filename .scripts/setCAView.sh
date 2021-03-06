#!/bin/bash
set -e

printf "\nPlease enter CA View specific information when the command prompt asks\n"
npx zowe config set profiles.lpar1.profiles.caview.properties.host
npx zowe config set profiles.lpar1.profiles.caview.properties.port
printf "\nEnter your mainframe username and password. To secure your credentials, the information you enter will be blank\n"
npx zowe config set --secure profiles.lpar1.profiles.caview.properties.user
npx zowe config set --secure profiles.lpar1.profiles.caview.properties.password
printf "\nCA View information collected successfully\n\n"