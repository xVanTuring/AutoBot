import { JobType, makeJob } from ".";

export const androidHotUpdateTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["android"]),
  makeJob(JobType.PACK_GEN_ANDROID_HOT_UPDATE, false, []),
  makeJob(JobType.PACK_HOT_UPDATE, false, ["android"]),
];
export const androidCompileTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["android"]),
  makeJob(JobType.PACK_GEN_ANDROID_HOT_UPDATE, false, []),
  makeJob(JobType.PACK_COMPILE_BUNDLE, false, ["android", "dev"]),
];

export const iosHotUpdateTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["ios"]),
  makeJob(JobType.PACK_GEN_ANDROID_HOT_UPDATE, false, []),
  makeJob(JobType.PACK_HOT_UPDATE, false, ["ios"]),
];
export const iosTestCompileTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["test", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["ios"]),
  makeJob(JobType.PACK_GEN_ANDROID_HOT_UPDATE, false, []),
  makeJob(JobType.PACK_COMPILE_BUNDLE, false, ["ios", "test"]),
];
