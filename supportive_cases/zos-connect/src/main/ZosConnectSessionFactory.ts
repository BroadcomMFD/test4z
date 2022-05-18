import {Session,ISession} from "@zowe/imperative";
import {SessionFactory}  from "@broadcom/test4z";

export class ZosconnectSessionFactory{
       public static async getSession(): Promise <ISession> { 
            const _hostname = ""
            const _protocol = ""
            const _port = ""
            const _basePath = ""
            const _rejectUnauthorized = ""
                
            const iSession : ISession = {
                hostname: "ca31.lvn.broadcom.net",
                protocol: "http" ,
                port: 17403
                };
            return iSession;
        }    
}