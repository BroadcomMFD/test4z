set -e

printf "\nTest4z Mock Service Information"
npx zowe config set profiles.lpar1.profiles.test4z.properties.host "localhost"
printf "\nHost      : localhost"
npx zowe config set profiles.lpar1.profiles.test4z.properties.port 8844
printf "\nPort      : 8844"
npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq "MOCK"
printf "\nHLQ       : MOCK"
npx zowe config set profiles.lpar1.profiles.test4z.properties.protocol "https"
printf "\nProtocol  : https"
printf "\n\nTest4z configuration was successful"
printf -- "\n-----------------------------------"
printf "\nZ/OSMF Mock Service Information\n"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.host "localhost"
printf "\nHost      : localhost"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.port 8844
printf "\nPort      : 8844"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.protocol "https"
printf "\nProtocol  : https"
printf "\n\nZ/OSMF configuration was successful\n\n"
printf "The mock server has started\n"
npx ts-node ../samples/mock/src/app.ts