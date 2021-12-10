import {
  buildProject,
  setDevEnv,
  setProdEnv,
  useLocalSdk,
  useModoSdk,
} from "../actions/CocosBuild";
import {
  applyPatch,
  checkout,
  pull,
  resetLocal,
  fetchAll,
} from "../actions/GitOps";
import {
  generateAndroidHotUpdate,
  generateIosHotUpdate,
  packHotUpdateArtifact,
  packCompileBundle,
} from "../actions/PackOps";
import { getProjectPath } from "../config/ProjectPath";

export enum JobType {
  GIT_FETCHALL = "GIT_FETCHALL",
  GIT_PULL = "GIT_PULL",
  GIT_CHECKOUT = "GIT_CHECKOUT",
  GIT_RESET_LOCAL = "GIT_RESET_LOCAL",
  GIT_APPLY_PATCH = "GIT_APPLY_PATCH",

  BUILD_SET_DEV_ENV = "BUILD_SET_DEV_ENV",
  BUILD_SET_PROD_ENV = "BUILD_SET_PROD_ENV",
  BUILD_USE_LOCAL_SDK = "BUILD_USE_LOCAL_SDK",
  BUILD_USE_MODO_SDK = "BUILD_USE_MODO_SDK",
  BUILD_PROJECT = "BUILD_PROJECT",

  PACK_GEN_ANDROID_HOT_UPDATE = "PACK_GEN_ANDROID_HOT_UPDATE",
  PACK_GEN_IOS_HOT_UPDATE = "PACK_GEN_IOS_HOT_UPDATE",
  PACK_HOT_UPDATE = "PACK_HOT_UPDATE",
  PACK_COMPILE_BUNDLE = "PACK_COMPILE_BUNDLE",
}
export interface Job {
  type: JobType;
  cancellable: boolean;
  params: Array<string | number | boolean>;
}
// export type CancellableJob = Job<true>;

export function makeJob(
  type: JobType,
  cancellable: boolean,
  params: Array<string | number | boolean>
): Job {
  return {
    type,
    cancellable,
    params,
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
const JobDict: Record<JobType, Function> = {
  GIT_FETCHALL: fetchAll,
  GIT_PULL: pull,
  GIT_CHECKOUT: checkout,
  GIT_RESET_LOCAL: resetLocal,
  GIT_APPLY_PATCH: applyPatch,

  BUILD_SET_DEV_ENV: setDevEnv,
  BUILD_SET_PROD_ENV: setProdEnv,
  BUILD_USE_LOCAL_SDK: useLocalSdk,
  BUILD_USE_MODO_SDK: useModoSdk,
  BUILD_PROJECT: buildProject,

  PACK_GEN_ANDROID_HOT_UPDATE: generateAndroidHotUpdate,
  PACK_GEN_IOS_HOT_UPDATE: generateIosHotUpdate,
  PACK_HOT_UPDATE: packHotUpdateArtifact,
  PACK_COMPILE_BUNDLE: packCompileBundle,
};
export function runJob(job: Job) {
  const repoPath = getProjectPath();
  const executor = JobDict[job.type];
  const _arguments = [repoPath, ...job.params];
  return executor.call(null, ..._arguments);
}
