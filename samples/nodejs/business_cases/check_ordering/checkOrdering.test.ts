/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
*/
import { Test4zService, SessionFactory, Profiles, Filter, FilterBuilder, Operators, QueryOperators, UpdateCriteria, Types, UpdateModel } from "@broadcom/test4z";
import { Delete, IZosFilesResponse } from "@zowe/zos-files-for-zowe-sdk";
import { Session } from "@zowe/imperative";
import { TestHelpers } from "../../TestHelpers";

//Testing variables, replace [HLQ] with the proper values
let batchAppJCLDataset = "TEST4Z.BATCHAPP.JCL(CUSTSEQ)";
let mainDataset = "TEST4Z.BATCHAPP.DATA(CUSTIN)";
let copyDataset = "TEST4Z.BATCHAPP.DATA(CUSTINK)";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";

//Filter creation for the search request
const searchFilters: InstanceType<typeof Filter>[] = [
    new FilterBuilder()
        .Fieldname("ACTUAL-CHECKS")
        .Operator(Operators.LESSOREQUAL)
        .Value(["3"])
        .Type(Types.NUMBER)
        .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
        .Fieldname("TOTAL-CHECKS")
        .Operator(Operators.EQUAL)
        .Value(["30"])
        .Type(Types.NUMBER)
        .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
        .Fieldname("PRODUCT-TYPE")
        .Operator(Operators.EQUAL)
        .Value(["S,C"])
        .Type(Types.CHARACTER)
        .QueryOperator(QueryOperators.OR)
        .build(),
    new FilterBuilder()
        .Fieldname("ACTUAL-CHECKS")
        .Operator(Operators.LESSOREQUAL)
        .Value(["5"])
        .Type(Types.NUMBER)
        .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
        .Fieldname("TOTAL-CHECKS")
        .Operator(Operators.EQUAL)
        .Value(["50"])
        .Type(Types.NUMBER)
        .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
        .Fieldname("PRODUCT-TYPE")
        .Operator(Operators.EQUAL)
        .Value(["S,C"])
        .Type(Types.CHARACTER)
        .QueryOperator(QueryOperators.OR)
        .build(),
    new FilterBuilder()
        .Fieldname("ACTUAL-CHECKS")
        .Operator(Operators.LESSOREQUAL)
        .Value(["8"])
        .Type(Types.NUMBER)
        .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
        .Fieldname("TOTAL-CHECKS")
        .Operator(Operators.EQUAL)
        .Value(["80"])
        .Type(Types.NUMBER)
        .QueryOperator(QueryOperators.AND)
        .build(),
    new FilterBuilder()
        .Fieldname("PRODUCT-TYPE")
        .Operator(Operators.EQUAL)
        .Value(["S,C"])
        .Type(Types.CHARACTER)
        .build(),
];

//Update input creation
const updateCriteria = new UpdateCriteria( "PRODUCT-TYPE", Operators.LIKE, Types.CHARACTER, "B","C");
const updateFilter: InstanceType<typeof Filter> = new FilterBuilder().Fieldname("ACCOUNT-NUMBER").Operator(Operators.EQUAL).Value(["123456000068"]).Type(Types.CHARACTER)
    .build();
var updateModel: InstanceType<typeof UpdateModel>;

describe("Check Ordering Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("test4z", "hlq");
        mainDataset = HLQ+"."+mainDataset;
        copyDataset = HLQ+"."+copyDataset;
        batchAppJCLDataset = HLQ+"."+batchAppJCLDataset;
        copybook = HLQ+"."+copybook;
        updateModel = new UpdateModel(
            mainDataset,
            copybook,
            [
                updateCriteria
            ],
            updateFilter
        )
    });
    beforeEach(async () => {
        //Since the BATCH app will be updating the original data set, we want to make a copy of the data set before we modify it.
        //After the test, the data set copy will be used to revert the original data set back to its initial state.
        const result = await Test4zService.copy(mainDataset, copyDataset );
        expect(result).toBeSuccessfulResult(); //Verify the API Request was successful
    });

    test("TEST001 - Test using copy, job submit, search, update and roll-back-data", async function () {
        //Execute Batch Application to modify the main data set
        const job = await Test4zService.submitJobViaZOSMF(batchAppJCLDataset);
        expect(job).toBeSuccessful(); //Verify BatchApp JCL executed successfully

        //Pick some customers using the given inputs
        const searchResult = await Test4zService.search(mainDataset, copybook, searchFilters);
        expect(searchResult).toBeSuccessfulResult(); //Verify the API Request was successful
        const records = searchResult.data;
        //Verify the number of the records changed after the batch application
        expect(records.Record.length).toBe(24);
        const todaysDate = new Date().toISOString().slice(0, 10).replace(/[-]/g, ""); //Get today's date in YYYYMMDD format
        expect(TestHelpers.getNotificationDates(records)).toBeNotificationDatesEqualTo(todaysDate); //Verify all the notification dates were updated today for the selected records

        //Roll back the changes by replacing the main data set with the copy data set
        const backupResult = await Test4zService.rollbackDataSet(copyDataset, mainDataset);
        expect(backupResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Update a particular record in the dataset, as the inputs defined above
        const updateResult = await Test4zService.update(updateModel);
        expect(updateResult).toBeSuccessfulResult(); //Verify the API Request was successful
        expect(updateResult.data.recordsChanged).toBe(1);//Verify number of the records updated

        //Execute Batch Application to modify the main data set
        const job2 = await Test4zService.submitJobViaZOSMF(batchAppJCLDataset);
        expect(job2).toBeSuccessful(); //Verify the job submission was successful

        //Pick the same customers using the same inputs as used above,
        //to verify notification date values were updated
        const searchResult2 = await Test4zService.search(mainDataset, copybook, [updateFilter]);
        expect(searchResult2).toBeSuccessfulResult(); //Verify the API Request was successful
        const records2 = searchResult2.data;
        //Verify the number of the updated records changed after the batch application
        expect(records2.Record.length).toBe(1);
        expect(TestHelpers.getNotificationDates(records2)).toBeNotificationDatesEqualTo(todaysDate);
    });

    afterEach(async () => {
        //Since the BATCH app updated the original data set,
        //rolling back changes by replacing the main data set with the copy data set
        const backupResult = await Test4zService.rollbackDataSet(copyDataset, mainDataset);
        expect(backupResult).toBeSuccessfulResult(); //Verify the API Request was successful

        //Cleanup - removing the temporary dataset
        const session: Session = await SessionFactory.getSession(Profiles.zosmf);
        const deleteResult: IZosFilesResponse = await Delete.dataSet(session, copyDataset);
        expect(deleteResult.success).toBe(true);
    });
});
