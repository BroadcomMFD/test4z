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
npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.user "MOCK"
npx zowe config set --secure profiles.lpar1.profiles.test4z.properties.password "MOCK"
printf "\n\nTest4z configuration in zowe.config.json was successful"
printf -- "\n-----------------------------------"
printf "\nZ/OSMF Mock Service Information\n"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.host "localhost"
printf "\nHost      : localhost"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.port 8844
printf "\nPort      : 8844"
npx zowe config set profiles.lpar1.profiles.zosmf.properties.protocol "https"
printf "\nProtocol  : https"
npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.user "MOCK"
npx zowe config set --secure profiles.lpar1.profiles.zosmf.properties.password "MOCK"
printf "\n\nZ/OSMF configuration in zowe.config.json was successful\n\n\n"
npx ts-node ./mock/src/app.ts
