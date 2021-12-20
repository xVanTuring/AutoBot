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
    ...compileTask("develop", "prod", "1.1.3", "1.0.9", "android"),
  ];
  const job = Bluebird.each(jobList, async (job) => {
    console.log(`Processing Job ${job.type}`);
    await runJob(job);
  });
  await job;
})();
