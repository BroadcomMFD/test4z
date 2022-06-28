import sys, os
import configparser
config = configparser.ConfigParser()
config.read('../../../config.cfg')


print("\nPlease enter Test4z specific information when the command prompt asks")
host = input("Host Url (starts with https:// or http://): ")
config.set('TEST4Z','host_url', host)
port = input("Port: ")
config.set('TEST4Z','port', port)
hlq = input("HLQ: ")
config.set('TEST4Z','hlq', hlq)
user_name = input("Username: ")
config.set('TEST4Z','user', user_name)
password = input("Password: ")
config.set('TEST4Z','password', password)

with open("../../../config.cfg.new", "w") as fh:
    config.write(fh)
os.remove("../../../config.cfg")
os.rename("../../../config.cfg.new", "../../../config.cfg")

print("\nTest4z information collected successfully")
