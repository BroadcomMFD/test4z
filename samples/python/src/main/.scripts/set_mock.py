import sys, os
import configparser
config = configparser.ConfigParser()
config.read('../../../config.cfg')

print("\nTest4z Mock Service Information")
config.set('TEST4Z','host_url', "https://localhost")
print("Host     : https://localhost")
config.set('TEST4Z','port', "8844")
print("Port     : 8844")
config.set('TEST4Z','hlq', "MOCK")
print("HLQ      : MOCK")
config.set('TEST4Z','base_path', "/api/v1")
print("Base Path: /api/v1")
config.set('TEST4Z','ssl_verification', "false")
print("SSL Verf : false")
print("--------------------------------")
print("Z/OSMF Mock Service Information")
config.set('ZOSMF','host_url', "localhost:8844")
print("Host     : https://localhost")
print("Port     : 8844")
config.set('ZOSMF','ssl_verification', "false")
print("SSL Verf : false")
config.set('ZOSMF','user', "MOCK")
config.set('ZOSMF','password', "MOCK")

with open("../../../config.cfg.new", "w") as fh:
    config.write(fh)
os.rename("../../../config.cfg", "../../../config.cfg~")
os.rename("../../../config.cfg.new", "../../../config.cfg")
os.remove("../../../config.cfg~")

print("\n\nConfiguration completed")
