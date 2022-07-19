# Testing Best Practices
The Test4z project includes some sample test scripts that demonstrate the abilities of the Test4z Service. Use the sample tests as a reference, or as an interactive documentation.
Use the following best practices when you write your test cases.

## Self-Cleaning Tests
A self-cleaning test returns the test environment and the variables to their original state after each execution. This type of test does not leave data behind and removes the objects that were created during execution. Self-cleaning is a good test case characteristic. A self-cleaning test suite also includes repeatability and accuracy characteristics, to allow the test to run multiple times and to return the expected results.


All the test samples that are provided with Test4z implement the self-cleaning concept. The sample test cases use the setup and teardown abilities of the Jest framework to run as follows:
1. The test case creates a temporary backup data set in the beforeEach block.
2. The test case executes the application and performs data changes.
3. The test case uses the backup data set to roll back to the original state of all the data sets into the `afterEach` block.
>**Note** Test4z does not delete the temporary backup data sets. You can delete the temporary backup data sets at the end of the test case using Zowe CLI. For more information about the Zowe CLI data set delete command, see the [Zowe documentation](https://docs.zowe.org/).
Self-cleaning test cases enable test automation, because all the data preparations are managed in the test cases themselves.

## Isolated Tests
Isolated tests are test cases that do not share resources for execution, hence they do not interfere with each other. Isolated test cases can run in parallel and independently of each other.
>**Warning** The sample test cases that are provided with Test4z are meant to illustrate the Test4z capabilities and do not guarantee the isolation of the test. When you design your own isolated test cases, verify that they do not share resources.
You can achieve proper isolation by creating a different set of resources for each test. For example, you can use different JCLs for the changes in a certain data set.

Each of your tests must create a copy of the data set, must note the name of the copy, and must use the copy as an input for the JCL that manipulates data. Also the JCLs must be isolated. You must provide different JCLs for each test case. Perform the following steps to provide different JCLs for each test case:
1. Select a production JCL as a template.
2. Copy the content of the JCL to your test.
3. Overwrite the corresponding DSNs and get them submitted through the internal reader.
If you follow the sequence, the production JCL is not altered and you have an isolated test case.

## Small Tests
You may prefer to automate your test cases, or draft extensive test cases with complex implementations, but it is not the best practice to write lengthy and complex code. Small test cases have the following advantages:
- Easy to understand. The smaller and simpler the test case, the higher the probability that a person would understand it.
- Easy detection and fixation of the code. It is easier to identify problems with smaller test cases, so it takes less effort to identify and fix the problematic area.
- Easy maintenance of the code. As the teams grow, small test cases are easier for a team to maintain.

## Few Assertions
A single test case may have multiple assertions. To achieve a specific purpose, you can group the assertions that are dependent on one another. This way, you have only one action and afterwards you can inspect the results of that action using multiple asserts. The following example shows a test case with multiple scenarios.
        test("SEARCH001 - Test using snapshot, search, job submit and roll-back-data - basic", async function () {

        ….
        Scenario 1 //Execute Batch Application to modify the main data set
                const job = await Test4zService.submitJobUsingDataset(batchAppJCLDataset);
                expect(job).toBeSuccessful();

        Scenario 2 //Pick the same customers using the same inputs as used above, to verify notification date values were updated
                const searchResult2 = await Test4zService.search(mainDataset, copybook , basicFilters);
                expect(searchResult2).toBeSuccessfulResult(); //Verify the API Request was successful
                const records = searchResult2.data;
                expect(records).toBeHaveTestData(); //Verify the API Result's Data contains records to test.
                expect(records.Record.length).toBe(13); //Verify number of the records
                const todaysDate = new Date().toISOString().slice(0, 10).replace(/[-]/g, ""); //Get today's date in YYYYMMDD format
                expect(TestHelpers.getNotificationDates(records2)).toBeNotificationDatesEqualTo(todaysDate); //Verify all the notification dates were updated.
        ….Scenario ‘n’
            });
When the test in the previous example fails, the cause may reside in one of the assertions of scenario 1, scenario 2, or scenario ‘n’. If the test suite has many assertions with complicated scenarios, it would be difficult to identify the exact reason for the failure. With a single assertion, the test passes or fails for a single reason, hence it is easy to identify and communicate the success or failure of a piece of code.

The test samples that are provided with Test4z may include a few multiple assertions in a test and single assertions in each test. The `searchSample` test case contains multiple assertions. The multiple assertions are arranged in such an order to act and assert according to the purpose. The `concurrentIndependentJobs` test set from the cascade functionality has multiple tests with a single assertion.

As a best practice, you should have a single assertion in a test, or you should use fewer multiple assert scenarios in a single test. The more assertions that you have in a single test, the harder it is to identify the problem when the test fails.
