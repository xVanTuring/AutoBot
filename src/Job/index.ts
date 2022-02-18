import {
  buildProject,
  setEnvVersion,
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
  packHotUpdateArtifact,
  packCompileBundle,
  generateHotUpdate,
  packRemoteAssets,
} from "../actions/PackOps";
import { copyRemoteAssetsToUpload, moveHotUpdateAssetsToUpload, unzipRemoteAssetsArtifact, unzipServerHotUpdateArtifact, uploadHotUpdateArtifact, uploadRemoteAssetsArtifact } from "../actions/Upload";
import { getProjectPath } from "../config/ProjectPath";

export enum JobType {
  GIT_FETCHALL = "GIT_FETCHALL",
  GIT_PULL = "GIT_PULL",
  GIT_CHECKOUT = "GIT_CHECKOUT",
  GIT_RESET_LOCAL = "GIT_RESET_LOCAL",
  GIT_APPLY_PATCH = "GIT_APPLY_PATCH",

  BUILD_USE_LOCAL_SDK = "BUILD_USE_LOCAL_SDK",
  BUILD_USE_MODO_SDK = "BUILD_USE_MODO_SDK",
  BUILD_SET_ENV_VERSION = "BUILD_SET_ENV_VERSION",
  BUILD_PROJECT = "BUILD_PROJECT",

  PACK_GEN_HOT_UPDATE = "PACK_GEN_HOT_UPDATE",
  PACK_HOT_UPDATE = "PACK_HOT_UPDATE",
  PACK_COMPILE_BUNDLE = "PACK_COMPILE_BUNDLE",
  PACK_REMOTE_ASSETS = "PACK_REMOTE_ASSETS",

  UPLOAD_REMOTE_ASSETS = "UPLOAD_REMOTE_ASSETS",
  UPLOAD_HOTUPDATE_ARTIFACT = "UPLOAD_HOTUPDATE_ARTIFACT",
  UPLOAD_UNZIP_HOT_UPDATE = "UPLOAD_UNZIP_HOT_UPDATE",
  UPLOAD_UNZIP_REMOTE_ASSETS = "UPLOAD_UNZIP_REMOTE_ASSETS",

  UPLOAD_MOVE_HOTUPDATE = "UPLOAD_MOVE_HOTUPDATE",
  UPLOAD_COPY_REMOTE = "UPLOAD_COPY_REMOTE"
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

  BUILD_SET_ENV_VERSION: setEnvVersion,
  BUILD_USE_LOCAL_SDK: useLocalSdk,
  BUILD_USE_MODO_SDK: useModoSdk,
  BUILD_PROJECT: buildProject,

  PACK_GEN_HOT_UPDATE: generateHotUpdate,
  PACK_HOT_UPDATE: packHotUpdateArtifact,
  PACK_COMPILE_BUNDLE: packCompileBundle,
  PACK_REMOTE_ASSETS: packRemoteAssets,

  UPLOAD_REMOTE_ASSETS: uploadRemoteAssetsArtifact,
  UPLOAD_HOTUPDATE_ARTIFACT: uploadHotUpdateArtifact,
  UPLOAD_UNZIP_HOT_UPDATE: unzipServerHotUpdateArtifact,
  UPLOAD_UNZIP_REMOTE_ASSETS: unzipRemoteAssetsArtifact,

  UPLOAD_MOVE_HOTUPDATE: moveHotUpdateAssetsToUpload,
  UPLOAD_COPY_REMOTE: copyRemoteAssetsToUpload
};

export function runJob(job: Job) {
  const repoPath = getProjectPath();
  const executor = JobDict[job.type];
  const _arguments = [repoPath, ...job.params];
  return executor.call(null, ..._arguments);
}
