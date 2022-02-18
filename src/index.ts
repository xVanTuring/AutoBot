// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import BlurBird from "bluebird";
import { runJob } from "./Job";
import Bluebird from "bluebird";
import { compileTask, uploadTask } from "./Job/JobTemplates";

BlurBird.config({
  cancellation: true,
});

(async () => {
  const job = Bluebird.each(compileTask("develop", "prod", "1.2.0", "android"), async (job) => {
    console.log(`Processing Job ${job.type}`);
    await runJob(job);
  });
  await job;

  console.log("Previous task has been done!");
  await BlurBird.delay(5000);

  const job2 = Bluebird.each(compileTask("develop", "prod", "1.2.0", "ios"), async (job) => {
    console.log(`Processing Job ${job.type}`);
    await runJob(job);
  });
  await job2;
  await BlurBird.delay(5000);

  // const job3 = BlurBird.each(uploadTask(), async (job) => {
  //   console.log(`Processing Job ${job.type}`);
  //   await runJob(job)
  // })
  // await job3;
  // await BlurBird.delay(5000);

  console.log("All Done!");
})();
