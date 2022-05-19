/* Copyright (c) 2022 Broadcom.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED
   FOR DETAILED INFORMATION ABOUT THIS TEST SUITE AND THE USE CASE, PLEASE CHECK THE readme.md

   Example test suite for z/OS Connect. 
*/

import { Test4zService, Filter, Operators, Types, FilterBuilder, SessionFactory } from "@broadcom/test4z";
import { RestClient, Session} from "@zowe/imperative";


let mainDataset = "HLQ.EXMPLAPP.EXMPCAT";
let copybook = "HLQ.COBCOPY(EXMPCAT)";

describe("z/OS Connect test case", function () {
    test("z/OS Connect test and data validation", async function () {
        const filters: InstanceType<typeof Filter>[] = [
            new FilterBuilder()
                .Fieldname("WS-ITEM-DESCRIPTION")
                .Operator(Operators.LIKE)
                .Value(["Pens"])
                .Type(Types.CHARACTER)
                .build()];

        // get the original records before the order placement        
        const searchBefore = await Test4zService.search(mainDataset,copybook,filters);
        expect(searchBefore).toBeSuccessfulResult();
        const recordBefore = searchBefore.data.Record[0]["WS-CATALOG-ITEM-LIST"]["WS-CATALOG-ITEM"]["WS-IN-STOCK"];
        expect(searchBefore).not.toBeNull();


        // call z/OS Connect to trigger the API to place order within CICS 
        let zosconnectSession : Session = await SessionFactory.getSessionByName("zosconnect"); 
        let requestBody = {DFH0XCMNOperation : {ca_order_request: {ca_item_ref_number: 20, ca_quantity_req: 1}}};
        let headers = [{"Content-Type":"application/json"},{"Content-Length":JSON.stringify(requestBody).length}];
        let output : any = await RestClient.postExpectJSON(zosconnectSession,"catalogManager/orders",headers,requestBody);
        expect (output.DFH0XCMNOperationResponse.ca_response_message).toContain("ORDER SUCCESSFULLY PLACED");


        // get the changed records after the order  
        const searchAfter = await Test4zService.search(mainDataset,copybook,filters);
        expect(searchAfter).toBeSuccessfulResult();
        const recordAfter = searchAfter.data.Record[0]["WS-CATALOG-ITEM-LIST"]["WS-CATALOG-ITEM"]["WS-IN-STOCK"]; 
        expect(recordAfter).toBeLessThan(recordBefore);
        
        
        
       

    
       
    });

});
