/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for z/OS Connect. 
*/

import { Test4zService, Filter, Operators, Types, FilterBuilder } from "@broadcom/test4z";
import { RestClient, Session} from "@zowe/imperative";
import { ZosconnectSessionFactory } from "../main/ZosConnectSessionFactory";

let mainDataset = "APM.QATT.U31C72DR.EXMPLAPP.EXMPCAT";
let copybook = "RAFDU01.SLICK.COBCOPY(EXMPCAT)";

describe("z/OS Connect test case", function () {
    test("z/OS Connect test and data validation", async function () {
        const filters: InstanceType<typeof Filter>[] = [
            new FilterBuilder()
                .Fieldname("WS-ITEM-DESCRIPTION")
                .Operator(Operators.LIKE)
                .Value(["Pens"])
                .Type(Types.CHARACTER)
                .build()];

        // get the original records before the changes        
        const searchBefore = await Test4zService.search(mainDataset,copybook,filters);
        expect(searchBefore).toBeSuccessfulResult();
        const recordBefore = searchBefore.data.Record[0]["WS-CATALOG-ITEM-LIST"]["WS-CATALOG-ITEM"]["WS-IN-STOCK"];
        console.log("Content of the WS-IN-STOCK field before the order: " + JSON.stringify(recordBefore));
        
        // call z/OS Connect to trigger the API to place order within cics   
        let session : Session = new Session(await ZosconnectSessionFactory.getSession());
        let requestBody = {DFH0XCMNOperation : {ca_order_request: {ca_item_ref_number: 10, ca_quantity_req: 1}}};
        let headers = [{"Content-Type":"application/json"},{"Content-Length":JSON.stringify(requestBody).length}];
        let output = await RestClient.postExpectJSON(session,"catalogManager/orders",headers,requestBody);
        console.log(JSON.stringify(output));


        // get the changed records to validate 
        const searchAfter = await Test4zService.search(mainDataset,copybook,filters);
        expect(searchAfter).toBeSuccessfulResult();
        const recordAfter = searchAfter.data.Record[0]["WS-CATALOG-ITEM-LIST"]["WS-CATALOG-ITEM"]["WS-IN-STOCK"];
        console.log("Content of the WS-IN-STOCK field after the order: " + JSON.stringify(recordAfter));  
        expect(recordAfter).toBeLessThan(recordBefore);
        
        
        
       

    
       
    });

});
