import sys, os
import configparser
config = configparser.ConfigParser()
config.read('../../../config.cfg')


print("\nPlease enter Z/OSMF specific information when the command prompt asks")
host = input("Host Url (ex: system.com:port) : ")
config.set('ZOSMF','host_url', host)
user_name = input("Username: ")
config.set('ZOSMF','user', user_name)
password = input("Password: ")
config.set('ZOSMF','password', password)

with open("../../../config.cfg.new", "w") as fh:
    config.write(fh)
os.remove("../../../config.cfg")
os.rename("../../../config.cfg.new", "../../../config.cfg")

print("\nZ/OSMF information collected successfully")
