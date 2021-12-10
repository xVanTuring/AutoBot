// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import BlurBird from "bluebird";
import { runJob } from "./Job";
import Bluebird from "bluebird";
import { androidHotUpdateTask } from "./Job/JobTemplates";

BlurBird.config({
  cancellation: true,
});

(async () => {
  const jobList = [
    // makeJob(JobType.GIT_RESET_LOCAL, false, []),
    // makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.2.3"]),
    ...androidHotUpdateTask,
  ];
  const job = Bluebird.each(jobList, async (job) => {
    await runJob(job);
  });
  await job;
})();
