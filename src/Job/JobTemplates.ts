import { JobType, makeJob } from ".";

export const androidHotUpdateTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["android"]),
  makeJob(JobType.PACK_GEN_HOT_UPDATE, false, ["android"]),
  makeJob(JobType.PACK_HOT_UPDATE, false, ["android"]),
];

export const compileTask = (
  branch: string,
  env: string,
  version: string,
  platform: string
) => [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, [branch]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, [env, version]),
  makeJob(JobType.BUILD_PROJECT, false, [platform]),
  makeJob(JobType.PACK_GEN_HOT_UPDATE, false, [platform]),
  makeJob(JobType.PACK_HOT_UPDATE, false, [platform]),
  makeJob(JobType.BUILD_PROJECT, false, [platform]),
  makeJob(JobType.PACK_COMPILE_BUNDLE, false, [platform, env]),
];

export const patchCompileTask = (
  branch: string,
  env: string,
  version: string,
  appVersion:string,
  platform: string
) => [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, [branch]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, [env, version, appVersion]),
  makeJob(JobType.BUILD_PROJECT, false, [platform]),
  makeJob(JobType.PACK_GEN_HOT_UPDATE, false, [platform]),
  makeJob(JobType.PACK_HOT_UPDATE, false, [platform]),
  makeJob(JobType.PACK_COMPILE_BUNDLE, false, [platform, env]),
];

export const iosHotUpdateTask = [
  makeJob(JobType.GIT_RESET_LOCAL, false, []),
  makeJob(JobType.GIT_CHECKOUT, false, ["develop"]),
  makeJob(JobType.GIT_PULL, false, []),
  makeJob(JobType.BUILD_SET_ENV_VERSION, false, ["dev", "1.1.3"]),
  makeJob(JobType.BUILD_PROJECT, false, ["ios"]),
  makeJob(JobType.PACK_GEN_HOT_UPDATE, false, ["ios"]),
  makeJob(JobType.PACK_HOT_UPDATE, false, ["ios"]),
];
