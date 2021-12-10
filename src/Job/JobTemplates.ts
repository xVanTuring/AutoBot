import { JobType, makeJob } from ".";

export const androidDevHotUpdateTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["android"]),
  makeJob(JobType.PACK_GEN_ANDROID_HOT_UPDATE, false, []),
  makeJob(JobType.PACK_HOT_UPDATE, false, ["android"]),
];
export const androidDevCompileTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["android"]),
  makeJob(JobType.PACK_GEN_ANDROID_HOT_UPDATE, false, []),
  makeJob(JobType.PACK_COMPILE_BUNDLE, false, ["android", "test"]),
];

export const androidProdHotUpdateTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["prod", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["android"]),
  makeJob(JobType.PACK_GEN_ANDROID_HOT_UPDATE, false, []),
  makeJob(JobType.PACK_HOT_UPDATE, false, ["android"]),
];
export const androidProdCompileTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["prod", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["android"]),
  makeJob(JobType.PACK_GEN_ANDROID_HOT_UPDATE, false, []),
  makeJob(JobType.BUILD_PROJECT, false, ["android"]),
  makeJob(JobType.PACK_COMPILE_BUNDLE, false, ["android", "prod"]),
];
