import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import { Test4zService } from "@broadcom/test4z";
import { parseRequest } from "./parser";
import * as https from 'https';
import * as fs from "fs"
const jsonParser = bodyParser.json();
const key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
const options = { key: key, cert: cert };
const app: Express = express();
const server = https.createServer(options, app);

(async () => {
    const basePath: any = await Test4zService.getProfileProp("test4z", "basePath");
    const port: any = await Test4zService.getProfileProp("test4z", "port");

    app.get(basePath + '/*', jsonParser, (req: Request, res: Response) => {
        const response = parseRequest(req.url.replace(basePath, ""), "")
        res.send(JSON.parse(response));
    });

    app.post(basePath + '/*', jsonParser, (req: Request, res: Response) => {
        const response = parseRequest(req.url.replace(basePath, ""), JSON.stringify(req.body))
        res.send(JSON.parse(response));
    });

    app.put("/*", jsonParser, (req: Request, res: Response) => {
        res.status(201);
        const response = parseRequest("jobSubmit", JSON.stringify(req.body))
        res.send(JSON.parse(response));

    });

    app.get("/*", jsonParser, (req: Request, res: Response) => {
        res.status(200);
        const response = parseRequest("jobOutput", JSON.stringify(req.body))
        res.send(JSON.parse(response));
    });

    app.delete("/*", jsonParser, (req: Request, res: Response) => {
        res.status(200);
        const response = parseRequest("deleteDataset", "")
        res.send(JSON.parse(response));
    });

    server.listen(port, () => {
        console.log(`⚡️Mock server is running at https://localhost:` + port);
    });
})();
