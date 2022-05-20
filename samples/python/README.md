# Test4z Python Samples

This repository contains the Test4z Update Sample in Python. The tests are written using the [Pytest Framework](https://docs.pytest.org/).

## Note
Before continuing, make sure you completed the following installations:

* [/samples/README.md](/samples/README.md)

## Installing
You must install Python and pip.
1. Download Python 3 from https://www.python.org/downloads

2. **For Windows users,** make sure to have the path variable for Python in the system settings. Try the following command to check (result should be Python 3.x.x):

        python --version

   If the command is not recognised, follow [this](https://www.educative.io/edpresso/how-to-add-python-to-path-variable-in-windows) url to see the guide.

3. Restart the command prompt.

4. Make sure the terminal directory is /samples/python

5. Make sure you have pip installed by executing the following command:

        pip --version
    If it's not installed, install pip from https://pip.pypa.io/en/stable/installation, or from a reliable source.       

6. Execute the following command to install the dependencies:

        python -m pip install -r requirements.txt
   On macOS use the python3 command instead of python as the default may be an earlier version.

7. **For Windows users,** make sure to have the path variable for Pytest in the system settings. Try the following command to check:

        pytest --version

   If the command is not recognised, follow [this](https://www.educative.io/edpresso/how-to-add-python-to-path-variable-in-windows) url to see the guide.

      
# Configuring

1. Submit the following command to configure Test4z:

        cd src/main/.scripts/ && python set_test4z.py && cd ../../..
        
 2. Submit the following command to configure z/OSMF:

        cd src/main/.scripts/ && python set_zosmf.py && cd ../../..

# Run Test4z Python Samples

1. Navigate to the test directory /test4z/samples/python/src/test/update:

        cd src/test/update/ 
        
2. Check the service status by executing the following command:

        pytest diagnostic_check.py 

2. Run the test using the following command:

        pytest test_update_sample.py 
