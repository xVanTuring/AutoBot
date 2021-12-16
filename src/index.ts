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
  const jobList = [...compileTask("develop", "dev", "0.0.1", "ios")];
  const job = Bluebird.each(jobList, async (job) => {
    console.log(`Processing Job ${job.type}`);
    await runJob(job);
  });
  await job;
})();
