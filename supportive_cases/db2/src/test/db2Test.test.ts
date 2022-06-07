/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for DB2 use case
*/
import { Test4zService } from "@broadcom/test4z";
import { Db2Service} from "../main/services/Db2Service";

let tableName = "TEST4ZTB";
let batchAppJCLDataset = "TEST4ZDB.BATCHAPP.JCL(CUSTDB)"

describe("DB2-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Test configuration
        const HLQ: any = await Db2Service.getProfileProp("hlq");
        const SQLID: any = await Db2Service.getProfileProp("sqlid");
        tableName = SQLID + "." + tableName;
        batchAppJCLDataset = HLQ + "." + batchAppJCLDataset;

        //Insertion of the test records to the DB2 database
        const testDataGeneration = await Db2Service.generateDb2TestRecords(tableName);
        expect(testDataGeneration.success).toBe(true);
    });

    test("DB2001 - Testing the cobol batch application which modifies the db2 table", async function () {
        //Execute Batch Application to modify the records in the DB2 table.
        const job = await Test4zService.submitJobViaZOSMF(batchAppJCLDataset);
        expect(String(job)).toMatch(/CC 0000|CC 0004/); //Verify BatchApp JCL executed successfully

        const today = new Date().toISOString().slice(0, 10); //Get today's date in YYYY-MM-DD SQL format
        const recordsQuery = await Db2Service.executeSQLQuery("SELECT * FROM " + tableName + " WHERE NOTIFICATION_DATE='" + today + "'");
        expect(recordsQuery.success).toBe(true);
        expect(recordsQuery.data[0].length).toBe(3);
    });

    afterAll(async () => {
        //Removing the test records from the DB2 dataset
        const testDataRemoval : any = Db2Service.removeDb2TestRecords(tableName);
        expect(testDataRemoval.success).toBe(true);
    });
});
