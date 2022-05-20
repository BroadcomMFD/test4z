import {
  Repositories,
  IRepository,
  Reports,
  IReport,
  ViewRestClient,
} from "@broadcom/caview-for-zowe-cli";
import { IResult } from "../main/services/IResult";
import { Profiles, SessionFactory, Test4zService } from "@broadcom/test4z";
import { Session } from "@zowe/imperative";
import { IJob, SubmitJobs, GetJobs, IJobFile } from "@zowe/cli";

const JCLDSName = "TEST4Z.BATCHAPP.CAVIEW(T4ZVIEW)";

test.only("Submit a job & retrieve the spool content for SORTOUT DD through ZOSMF", async function () {
  let zOSMFSession: Session = await SessionFactory.getSession(Profiles.zosmf);
  const HLQ: any = await Test4zService.getProfileProp(Profiles.zosmf, "hlq");
  const job: IJob = await SubmitJobs.submitJobNotify(
    zOSMFSession,
    HLQ + "." + JCLDSName
  );
  expect(job.retcode).toMatch("CC 0000" || "CC 0004");
  let spoolContent = "";
  const jobLogs: IJobFile[] = await GetJobs.getSpoolFilesForJob(
    zOSMFSession,
    job
  );
  for (const jobLog of jobLogs) {
    if (jobLog.ddname === "SORTOUT") {
      spoolContent = await GetJobs.getSpoolContent(zOSMFSession, jobLog);
    }
  }
  expect(spoolContent).toContain("ALL RECORDS ARE SORTED");
});

test("Retrieve the spool content from CA View/ Web Viewer", async function () {
  let session: Session = await SessionFactory.getSessionByName("caview");
  let repository: Repositories = new Repositories(session);
  let repositoryList: IRepository[] = await repository.list();
  expect(repositoryList.length).toBeGreaterThan(0);
  let repositoryID: number = repositoryList[0].id;

  let reports: Reports = new Reports(session, repositoryID);
  let report: IReport[] = await reports.listReports();
  expect(report.length).toBeGreaterThan(0);
  let reportHandleID: string = report[19].handle;

  let responsetxt: IResult = (await ViewRestClient.getExpectJSON(
    session,
    "/v1/view/rptdata/" + repositoryID + "/" + reportHandleID
  )) as IResult;
  let responsestring = "";
  for (let reportData of responsetxt.result["Report Data"]) {
    responsestring += reportData.data + "\n";
  }
  expect(responsestring).toContain("ALL RECORDS ARE SORTED");
});
