// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import BlurBird from "bluebird";
import { runJob } from "./Job";
import Bluebird from "bluebird";
import { androidDevHotUpdateTask } from "./Job/JobTemplates";

BlurBird.config({
  cancellation: true,
});

(async () => {
  const jobList = androidDevHotUpdateTask;
  const job = Bluebird.each(jobList, async (job) => {
    await runJob(job);
  });
  await job;
})();
