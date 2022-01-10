// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import BlurBird from "bluebird";
import { runJob } from "./Job";
import Bluebird from "bluebird";
import { compileTask } from "./Job/JobTemplates";

BlurBird.config({
  cancellation: true,
});

(async () => {
  const jobList = [
    ...compileTask("develop", "dev", "0.0.4", "android"),
  ];
  const job = Bluebird.each(jobList, async (job) => {
    console.log(`Processing Job ${job.type}`);
    await runJob(job);
  });
  await job;

  console.log("Previous task has been done!");
  await BlurBird.delay(20000);

  const jobList2 = [...compileTask("develop", "dev", "0.0.4", "ios")];
  const job2 = Bluebird.each(jobList2, async (job) => {
    console.log(`Processing Job ${job.type}`);
    await runJob(job);
  });
  await job2;
  await BlurBird.delay(20000);
  console.log("All Done!");
})();
