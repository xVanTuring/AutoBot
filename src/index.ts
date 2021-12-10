// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import BlurBird from "bluebird";
import { JobType, makeJob, runJob } from "./Job";
import Bluebird from "bluebird";
import { androidDevHotUpdateTask } from "./Job/JobTemplates";

BlurBird.config({
  cancellation: true,
});

(async () => {
  const jobList = [
    // makeJob(JobType.GIT_RESET_LOCAL, false, []),
    // makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.2.3"]),
    ...androidDevHotUpdateTask,
  ];
  const job = Bluebird.each(jobList, async (job) => {
    await runJob(job);
  });
  await job;
})();
