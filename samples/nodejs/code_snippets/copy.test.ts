/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md
   Example test suite for Test4z copy feature
*/
import { Test4zService, SessionFactory, Profiles, CopyFilter, Filter, FilterBuilder, Operators, Types } from "@broadcom/test4z";
import { Delete, IZosFilesResponse } from "@zowe/zos-files-for-zowe-sdk";
import { Session } from "@zowe/imperative";

//Testing variables, the datasets
let mainDataset = "TEST4Z.BATCHAPP.DATA(CUSTIN)";
let copyDataset = "TEST4Z.BATCHAPP.DATA(CUSTINC)";
let copybook = "TEST4Z.BATCHAPP.COPY(CUSTREC)";
const filter: InstanceType<typeof Filter>[] = [
    new FilterBuilder()
        .Fieldname("ACTUAL-CHECKS")
        .Operator(Operators.LESSOREQUAL)
        .Value(["3"])
        .Type(Types.NUMBER)
        .build()
];
let copyFilter: InstanceType<typeof CopyFilter>;

describe("COPY-TEST - Batchapp validation", function () {
    beforeAll(async () => {
        //Retrieve HLQ from config property
        const HLQ: any = await Test4zService.getProfileProp("test4z", "hlq");
        mainDataset = HLQ+"."+mainDataset;
        copyDataset = HLQ+"."+copyDataset;
        copybook = HLQ+"."+copybook;
        //Generate the copy filter
        copyFilter = new CopyFilter(copybook, filter);
    });

    test("COPY001 - Copy snippet", async function () {
        //Create a subset of data from the mainDataset using the copy feature with the given filter
        const copyResult = await Test4zService.copy(mainDataset, copyDataset);
        expect(copyResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });

    test("COPY002 - Copy snippet (with record filtering)", async function () {
        //Create a subset of data from the mainDataset using the copy feature with the given filter
        const copyResult = await Test4zService.copy(mainDataset, copyDataset, 0, 0, copyFilter);
        expect(copyResult).toBeSuccessfulResult(); //Verify the API Request was successful
    });

    afterAll(async() => {
        //Cleanup - removing the temporary dataset
        const session: Session = await SessionFactory.getSession(Profiles.zosmf);
        const deleteResult: IZosFilesResponse = await Delete.dataSet(session, copyDataset);
        expect(deleteResult.success).toBe(true);
    })
});
